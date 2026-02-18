const express  = require('express');
const router   = express.Router();
const crypto   = require('crypto');
const { getPool } = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// ─── HELPER: initialise Razorpay lazily ─────────────────────────────
function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay keys not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env');
  }
  const Razorpay = require('razorpay');
  return new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

// ─── PLACE ORDER (COD) ──────────────────────────────────────────────
router.post('/cod', authMiddleware, async (req, res) => {
  try {
    const { address_id } = req.body;
    const db = await getPool();

    // fetch cart
    const [cartItems] = await db.query(`
      SELECT c.product_id, c.size, c.quantity, p.price, p.sale_price, p.stock
      FROM cart c JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `, [req.user.id]);

    if (!cartItems.length) return res.status(400).json({ error: 'Cart is empty' });

    // validate stock & calculate total
    let total = 0;
    for (const item of cartItems) {
      if (item.stock < item.quantity) return res.status(400).json({ error: `Insufficient stock for product ${item.product_id}` });
      total += (item.sale_price || item.price) * item.quantity;
    }

    // create order
    const [orderRes] = await db.query(
      'INSERT INTO orders (user_id, address_id, total, payment_method, payment_status, order_status) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, address_id || null, total.toFixed(2), 'cod', 'pending', 'pending']
    );
    const orderId = orderRes.insertId;

    // insert order items & reduce stock
    for (const item of cartItems) {
      await db.query(
        'INSERT INTO order_items (order_id, product_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.product_id, item.size, item.quantity, item.sale_price || item.price]
      );
      await db.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
    }

    // clear cart
    await db.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);

    res.status(201).json({ message: 'Order placed successfully', orderId, total: total.toFixed(2) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── CREATE RAZORPAY ORDER (for Card / GPay / PhonePe / UPI) ────────
router.post('/razorpay/create', authMiddleware, async (req, res) => {
  try {
    const { address_id } = req.body;
    const db = await getPool();

    const [cartItems] = await db.query(`
      SELECT c.product_id, c.size, c.quantity, p.price, p.sale_price, p.stock
      FROM cart c JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `, [req.user.id]);

    if (!cartItems.length) return res.status(400).json({ error: 'Cart is empty' });

    let total = 0;
    for (const item of cartItems) {
      if (item.stock < item.quantity) return res.status(400).json({ error: 'Insufficient stock' });
      total += (item.sale_price || item.price) * item.quantity;
    }

    // create pending order in DB first
    const [orderRes] = await db.query(
      'INSERT INTO orders (user_id, address_id, total, payment_method, payment_status, order_status) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, address_id || null, total.toFixed(2), 'razorpay', 'pending', 'pending']
    );
    const orderId = orderRes.insertId;

    // store cart snapshot in order_items (before clearing)
    for (const item of cartItems) {
      await db.query(
        'INSERT INTO order_items (order_id, product_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.product_id, item.size, item.quantity, item.sale_price || item.price]
      );
    }

    // create Razorpay order (amount in paise)
    let razorpay;
    try {
      razorpay = getRazorpay();
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    const rpOrder = await razorpay.order.create({
      amount:   Math.round(total * 100),
      currency: 'INR',
      receipt:  `deodha_${orderId}`,
      notes:    { order_id: orderId.toString() }
    });

    // store razorpay order id
    await db.query('UPDATE orders SET razorpay_order_id = ? WHERE id = ?', [rpOrder.id, orderId]);

    res.json({
      razorpayOrderId: rpOrder.id,
      amount:          rpOrder.amount,
      currency:        rpOrder.currency,
      key:             process.env.RAZORPAY_KEY_ID,
      orderId          // our internal order id
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── VERIFY RAZORPAY PAYMENT ────────────────────────────────────────
router.post('/razorpay/verify', authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(400).json({ error: 'Razorpay keys not configured' });
    }

    // verify signature
    const expectedSig = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSig !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    const db = await getPool();

    // update order
    await db.query(`
      UPDATE orders SET
        payment_status      = 'paid',
        order_status        = 'processing',
        razorpay_payment_id = ?,
        razorpay_signature  = ?
      WHERE id = ?
    `, [razorpay_payment_id, razorpay_signature, orderId]);

    // reduce stock
    const [items] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
    for (const item of items) {
      await db.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
    }

    // clear cart
    await db.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);

    res.json({ message: 'Payment successful', orderId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── GET USER ORDERS ────────────────────────────────────────────────
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const db = await getPool();
    const [orders] = await db.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    // attach items to each order
    const result = [];
    for (const order of orders) {
      const [items] = await db.query(`
        SELECT oi.*, p.name as product_name, p.slug as product_slug
        FROM order_items oi JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `, [order.id]);
      result.push({ ...order, items });
    }

    res.json({ orders: result });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── GET SINGLE ORDER ───────────────────────────────────────────────
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const db = await getPool();
    const [orders] = await db.query(
      'SELECT * FROM orders WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (!orders.length) return res.status(404).json({ error: 'Order not found' });

    const [items] = await db.query(`
      SELECT oi.*, p.name as product_name, p.slug as product_slug
      FROM order_items oi JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [orders[0].id]);

    res.json({ order: { ...orders[0], items } });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── ADMIN: GET ALL ORDERS ──────────────────────────────────────────
router.get('/admin/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const db = await getPool();
    const { status, page = 1, limit = 20 } = req.query;

    let where  = [];
    let params = [];
    if (status) { where.push('o.order_status = ?'); params.push(status); }

    const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';
    const offset = (parseInt(page) - 1) * parseInt(limit);
    params.push(parseInt(limit), offset);

    const [orders] = await db.query(`
      SELECT o.*, u.name as customer_name, u.email as customer_email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ${whereClause}
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?
    `, params);

    res.json({ orders });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── ADMIN: UPDATE ORDER STATUS ─────────────────────────────────────
router.put('/admin/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { order_status } = req.body;
    const db = await getPool();
    await db.query('UPDATE orders SET order_status = ? WHERE id = ?', [order_status, req.params.id]);
    res.json({ message: 'Order status updated' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
