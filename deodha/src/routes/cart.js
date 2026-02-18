const express  = require('express');
const router   = express.Router();
const { getPool } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

// ─── GET CART ───────────────────────────────────────────────────────
router.get('/', authMiddleware, async (req, res) => {
  try {
    const db = await getPool();
    const [items] = await db.query(`
      SELECT c.id, c.product_id, c.size, c.quantity,
             p.name, p.price, p.sale_price, p.images, p.slug
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `, [req.user.id]);

    const parsed = items.map(i => ({
      ...i,
      images: typeof i.images === 'string' ? JSON.parse(i.images) : i.images,
      effectivePrice: i.sale_price || i.price
    }));

    const total = parsed.reduce((sum, i) => sum + (i.effectivePrice * i.quantity), 0);
    res.json({ cart: parsed, total: total.toFixed(2), itemCount: parsed.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── ADD TO CART ────────────────────────────────────────────────────
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { product_id, size, quantity = 1 } = req.body;
    if (!product_id || !size)
      return res.status(400).json({ error: 'Product ID and size are required' });

    const db = await getPool();

    // check product exists & has stock
    const [prod] = await db.query('SELECT * FROM products WHERE id = ?', [product_id]);
    if (!prod.length) return res.status(404).json({ error: 'Product not found' });
    if (prod[0].stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });

    // upsert: if already in cart, increase qty; else insert
    const [exist] = await db.query(
      'SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ? AND size = ?',
      [req.user.id, product_id, size]
    );

    if (exist.length) {
      await db.query(
        'UPDATE cart SET quantity = quantity + ? WHERE id = ?',
        [quantity, exist[0].id]
      );
    } else {
      await db.query(
        'INSERT INTO cart (user_id, product_id, size, quantity) VALUES (?, ?, ?, ?)',
        [req.user.id, product_id, size, quantity]
      );
    }

    res.status(201).json({ message: 'Added to cart' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── UPDATE QUANTITY ────────────────────────────────────────────────
router.put('/:cartId', authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1)
      return res.status(400).json({ error: 'Quantity must be >= 1' });

    const db = await getPool();
    await db.query(
      'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?',
      [quantity, req.params.cartId, req.user.id]
    );
    res.json({ message: 'Cart updated' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── REMOVE ITEM ────────────────────────────────────────────────────
router.delete('/:cartId', authMiddleware, async (req, res) => {
  try {
    const db = await getPool();
    await db.query('DELETE FROM cart WHERE id = ? AND user_id = ?', [req.params.cartId, req.user.id]);
    res.json({ message: 'Item removed' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── CLEAR CART ─────────────────────────────────────────────────────
router.delete('/', authMiddleware, async (req, res) => {
  try {
    const db = await getPool();
    await db.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);
    res.json({ message: 'Cart cleared' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
