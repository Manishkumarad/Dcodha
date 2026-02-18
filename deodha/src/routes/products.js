const express  = require('express');
const router   = express.Router();
const { getPool } = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// ─── GET ALL CATEGORIES ─────────────────────────────────────────────
router.get('/categories', async (req, res) => {
  try {
    const db = await getPool();
    const [cats] = await db.query('SELECT * FROM categories');
    res.json({ categories: cats });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── GET ALL PRODUCTS (with optional filters) ──────────────────────
router.get('/', async (req, res) => {
  try {
    const db   = await getPool();
    const { category, search, featured, sort, page = 1, limit = 12 } = req.query;

    let where  = [];
    let params = [];

    if (category) {
      where.push('c.slug = ?');
      params.push(category);
    }
    if (search) {
      where.push('(p.name LIKE ? OR p.description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }
    if (featured === 'true') {
      where.push('p.is_featured = 1');
    }

    const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';

    // count
    const [countRow] = await db.query(
      `SELECT COUNT(*) as total FROM products p LEFT JOIN categories c ON p.category_id = c.id ${whereClause}`,
      params
    );
    const total = countRow[0].total;

    // order
    let orderBy = 'p.created_at DESC';
    if (sort === 'price_asc')  orderBy = 'p.price ASC';
    if (sort === 'price_desc') orderBy = 'p.price DESC';
    if (sort === 'popular')    orderBy = 'p.is_featured DESC, p.created_at DESC';

    const offset = (parseInt(page) - 1) * parseInt(limit);
    params.push(parseInt(limit), offset);

    const [products] = await db.query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `, params);

    // parse JSON fields
    const parsed = products.map(p => ({
      ...p,
      sizes:  typeof p.sizes  === 'string' ? JSON.parse(p.sizes)  : p.sizes,
      images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images
    }));

    res.json({ products: parsed, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── GET SINGLE PRODUCT BY SLUG ─────────────────────────────────────
router.get('/:slug', async (req, res) => {
  try {
    const db = await getPool();
    const [rows] = await db.query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ?
    `, [req.params.slug]);

    if (!rows.length) return res.status(404).json({ error: 'Product not found' });

    const p = rows[0];
    p.sizes  = typeof p.sizes  === 'string' ? JSON.parse(p.sizes)  : p.sizes;
    p.images = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;

    res.json({ product: p });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── ADMIN: CREATE PRODUCT ──────────────────────────────────────────
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, category_id, description, price, sale_price, stock, sizes, images } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Name and price required' });

    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const db   = await getPool();

    await db.query(`
      INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [category_id||null, name, slug, description||null, price, sale_price||null, stock||0,
        JSON.stringify(sizes||[]), JSON.stringify(images||[])]);

    res.status(201).json({ message: 'Product created', slug });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── ADMIN: UPDATE PRODUCT ──────────────────────────────────────────
router.put('/:slug', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, sale_price, stock, sizes, images, is_featured } = req.body;
    const db = await getPool();

    await db.query(`
      UPDATE products SET
        name        = COALESCE(?, name),
        description = COALESCE(?, description),
        price       = COALESCE(?, price),
        sale_price  = ?,
        stock       = COALESCE(?, stock),
        sizes       = COALESCE(?, sizes),
        images      = COALESCE(?, images),
        is_featured = COALESCE(?, is_featured)
      WHERE slug = ?
    `, [name||null, description||null, price||null, sale_price!==undefined?sale_price:null,
        stock||null, sizes?JSON.stringify(sizes):null, images?JSON.stringify(images):null,
        is_featured!==undefined?is_featured:null, req.params.slug]);

    res.json({ message: 'Product updated' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── ADMIN: DELETE PRODUCT ──────────────────────────────────────────
router.delete('/:slug', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const db = await getPool();
    await db.query('DELETE FROM products WHERE slug = ?', [req.params.slug]);
    res.json({ message: 'Product deleted' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
