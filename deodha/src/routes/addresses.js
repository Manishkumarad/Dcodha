const express  = require('express');
const router   = express.Router();
const { getPool } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

// ─── GET ALL ADDRESSES ──────────────────────────────────────────────
router.get('/', authMiddleware, async (req, res) => {
  try {
    const db = await getPool();
    const [addresses] = await db.query(
      'SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC',
      [req.user.id]
    );
    res.json({ addresses });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── ADD ADDRESS ────────────────────────────────────────────────────
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, street, city, state, pincode, phone, is_default } = req.body;
    if (!street || !city || !state || !pincode)
      return res.status(400).json({ error: 'Street, city, state and pincode are required' });

    const db = await getPool();

    // if marking as default, unset others
    if (is_default) {
      await db.query('UPDATE addresses SET is_default = 0 WHERE user_id = ?', [req.user.id]);
    }

    const [result] = await db.query(
      'INSERT INTO addresses (user_id, name, street, city, state, pincode, phone, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, name || null, street, city, state, pincode, phone || null, is_default ? 1 : 0]
    );

    res.status(201).json({ message: 'Address added', id: result.insertId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── UPDATE ADDRESS ─────────────────────────────────────────────────
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, street, city, state, pincode, phone, is_default } = req.body;
    const db = await getPool();

    if (is_default) {
      await db.query('UPDATE addresses SET is_default = 0 WHERE user_id = ?', [req.user.id]);
    }

    await db.query(`
      UPDATE addresses SET
        name    = COALESCE(?, name),
        street  = COALESCE(?, street),
        city    = COALESCE(?, city),
        state   = COALESCE(?, state),
        pincode = COALESCE(?, pincode),
        phone   = COALESCE(?, phone),
        is_default = COALESCE(?, is_default)
      WHERE id = ? AND user_id = ?
    `, [name||null, street||null, city||null, state||null, pincode||null, phone||null,
        is_default!==undefined?(is_default?1:0):null, req.params.id, req.user.id]);

    res.json({ message: 'Address updated' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── DELETE ADDRESS ─────────────────────────────────────────────────
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const db = await getPool();
    await db.query('DELETE FROM addresses WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ message: 'Address deleted' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
