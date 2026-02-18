const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

let pool;

async function getPool() {
  if (!pool) {
    // First connect WITHOUT selecting a DB so we can create it
    const bootstrap = await mysql.createConnection(config);
    await bootstrap.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await bootstrap.end();

    // Now create the pool targeting our DB
    pool = mysql.createPool({ ...config, database: process.env.DB_NAME });
  }
  return pool;
}

// ─── CREATE ALL TABLES ──────────────────────────────────────────────
async function initDatabase() {
  const db = await getPool();

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(120) NOT NULL,
      email       VARCHAR(180) NOT NULL UNIQUE,
      password    VARCHAR(255) NOT NULL,
      phone       VARCHAR(20),
      role        ENUM('user','admin') DEFAULT 'user',
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS addresses (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      user_id     INT NOT NULL,
      name        VARCHAR(120),
      street      TEXT NOT NULL,
      city        VARCHAR(100) NOT NULL,
      state       VARCHAR(100) NOT NULL,
      pincode     VARCHAR(10) NOT NULL,
      phone       VARCHAR(20),
      is_default  TINYINT(1) DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(100) NOT NULL,
      slug        VARCHAR(100) NOT NULL UNIQUE,
      description TEXT,
      image       VARCHAR(300)
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      category_id INT,
      name        VARCHAR(200) NOT NULL,
      slug        VARCHAR(200) NOT NULL UNIQUE,
      description TEXT,
      price       DECIMAL(10,2) NOT NULL,
      sale_price  DECIMAL(10,2),
      stock       INT DEFAULT 0,
      sizes       JSON,
      images      JSON,
      is_featured TINYINT(1) DEFAULT 0,
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS cart (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      user_id     INT NOT NULL,
      product_id  INT NOT NULL,
      size        VARCHAR(10),
      quantity    INT DEFAULT 1,
      FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      UNIQUE KEY uq_cart (user_id, product_id, size)
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id              INT AUTO_INCREMENT PRIMARY KEY,
      user_id         INT NOT NULL,
      address_id      INT,
      total           DECIMAL(10,2) NOT NULL,
      payment_method  ENUM('cod','razorpay') NOT NULL,
      payment_status  ENUM('pending','paid','failed') DEFAULT 'pending',
      order_status    ENUM('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
      razorpay_order_id  VARCHAR(100),
      razorpay_payment_id VARCHAR(100),
      razorpay_signature  VARCHAR(300),
      created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
      FOREIGN KEY (address_id) REFERENCES addresses(id) ON DELETE SET NULL
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      order_id    INT NOT NULL,
      product_id  INT NOT NULL,
      size        VARCHAR(10),
      quantity    INT NOT NULL,
      price       DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // ─── Seed categories & sample products ─────────────────────────
  const [cats] = await db.query('SELECT COUNT(*) as c FROM categories');
  if (cats[0].c === 0) {
    await db.query(`
      INSERT INTO categories (name, slug, description) VALUES
      ('Essentials','essentials','Core everyday wardrobe pieces'),
      ('Outerwear','outerwear','Jackets, coats & layers'),
      ('Bottoms','bottoms','Trousers, joggers & shorts'),
      ('Accessories','accessories','Caps, bags & more'),
      ('Footwear','footwear','Shoes & sneakers')
    `);

    await db.query(`
      INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured) VALUES
      (1,'Classic White Tee','classic-white-tee','Premium cotton oversized tee in clean white. Relaxed fit.',1290,990,50,'["S","M","L","XL","XXL"]','[]',1),
      (1,'Noir Crew Neck','noir-crew-neck','Essential black crew neck in heavyweight cotton.',1490,1190,40,'["S","M","L","XL"]','[]',0),
      (2,'The Noir Oversized Jacket','noir-oversized-jacket','Structured silhouette in deep charcoal wool blend. Oversized cut with dropped shoulders.',4990,null,25,'["S","M","L","XL","XXL"]','[]',1),
      (2,'Olive Utility Jacket','olive-utility-jacket','Military-inspired utility jacket in washed olive. Relaxed fit.',3490,2990,30,'["S","M","L","XL"]','[]',0),
      (3,'Charcoal Relaxed Joggers','charcoal-joggers','Ultra-soft joggers in deep charcoal. Tapered cut.',1890,1490,45,'["S","M","L","XL","XXL"]','[]',1),
      (3,'Black Wide Trousers','black-wide-trousers','Wide-leg trousers in structured black fabric.',2290,null,35,'["S","M","L","XL"]','[]',0),
      (4,'Minimal Cap','minimal-cap','Clean black structured cap with subtle logo.',590,null,60,'["One Size"]','[]',0),
      (4,'Canvas Tote','canvas-tote','Heavyweight cotton tote. Minimal branding.',890,690,50,'["One Size"]','[]',1),
      (5,'Urban Sneakers','urban-sneakers','Clean white leather sneakers. Minimal design.',3290,null,20,'["40","41","42","43","44"]','[]',1),
      (5,'Black Boots','black-boots','Sleek ankle boots in matte black leather.',4290,3690,15,'["40","41","42","43","44"]','[]',0)
    `);
  }

  console.log('✅ Database & tables ready.');
}

module.exports = { getPool, initDatabase };
