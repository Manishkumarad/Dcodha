const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const dotenv   = require('dotenv');
const { initDatabase } = require('./src/config/database');

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── MIDDLEWARE ──────────────────────────────────────────────────────
app.use(cors());                          // allow all origins (tighten in prod)
app.use(express.json());                  // parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// ─── STATIC FILES ───────────────────────────────────────────────────
// Serve the frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

// ─── API ROUTES ─────────────────────────────────────────────────────
app.use('/api/auth',      require('./src/routes/auth'));
app.use('/api/products',  require('./src/routes/products'));
app.use('/api/cart',      require('./src/routes/cart'));
app.use('/api/addresses', require('./src/routes/addresses'));
app.use('/api/orders',    require('./src/routes/orders'));

// ─── HEALTH CHECK ───────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// ─── CATCH-ALL: serve index.html for any non-API route (SPA routing) ─
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── START ──────────────────────────────────────────────────────────
(async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`\n🚀  DEODHA server running on http://localhost:${PORT}\n`);
    });
  } catch (e) {
    console.error('❌ Failed to initialise database:', e);
    process.exit(1);
  }
})();
