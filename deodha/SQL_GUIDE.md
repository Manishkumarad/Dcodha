# SQL Queries Guide for DEODHA Project

## Understanding Your Database Setup

### What `database.js` Does:
- **Lines 31-128**: Creates tables (users, products, cart, orders, etc.) - runs automatically on first startup
- **Lines 130-155**: Inserts seed data (sample products) - only runs if tables are empty
- **This file runs automatically** - you don't need to manually execute these queries

### Your Database Connection:
```
Database: deodha_db
Host: localhost
Port: 3306
Username: root
Password: 1234
```

---

## How to Write SQL Queries Directly in MySQL

### Step 1: Connect to MySQL

**Option A: MySQL Workbench (Recommended)**
1. Open MySQL Workbench
2. Click "New Connection"
3. Enter:
   - Connection Name: `DEODHA Local`
   - Hostname: `localhost`
   - Port: `3306`
   - Username: `root`
   - Password: `1234`
4. Click "Test Connection" then "OK"
5. Double-click the connection to connect
6. Select `deodha_db` from the schema list

**Option B: Command Line**
```bash
mysql -u root -p1234 deodha_db
```

---

## Step 2: Write Your SQL Queries

Once connected, you can write ANY SQL query. Here are practical examples:

### 📦 PRODUCT QUERIES

**View All Products:**
```sql
SELECT * FROM products;
```

**View Products with Categories:**
```sql
SELECT p.id, p.name, p.price, c.name as category
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;
```

**Add a New Product:**
```sql
INSERT INTO products (category_id, name, slug, description, price, sale_price, stock, sizes, images, is_featured)
VALUES (
  1,  -- category_id (1=Essentials, 2=Outerwear, 3=Bottoms, 4=Accessories, 5=Footwear)
  'Premium Black Hoodie',  -- name
  'premium-black-hoodie',  -- slug (must be unique, lowercase, no spaces)
  'Comfortable black hoodie with premium quality',  -- description
  2490.00,  -- price
  1990.00,  -- sale_price (or NULL)
  30,  -- stock
  '["S","M","L","XL","XXL"]',  -- sizes (JSON format)
  '[]',  -- images (JSON format, empty for now)
  1  -- is_featured (1=true, 0=false)
);
```

**Update Product Price:**
```sql
UPDATE products 
SET price = 1790, sale_price = 1490 
WHERE slug = 'classic-white-tee';
```

**Update Product Stock:**
```sql
UPDATE products 
SET stock = 100 
WHERE id = 1;
```

**Delete a Product:**
```sql
DELETE FROM products WHERE slug = 'test-product';
```

**Mark Product as Featured:**
```sql
UPDATE products 
SET is_featured = 1 
WHERE slug = 'urban-sneakers';
```

---

### 👥 USER QUERIES

**View All Users:**
```sql
SELECT id, name, email, role, created_at FROM users;
```

**Create Admin User:**
```sql
-- First, you need to hash the password. Use bcrypt or register through the app.
-- Or use this (password: admin123 - NOT SECURE, change immediately!)
INSERT INTO users (name, email, password, role)
VALUES ('Admin User', 'admin@deodha.com', '$2a$10$hashedpasswordhere', 'admin');
```

**Update User Role:**
```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'user@example.com';
```

---

### 🛒 CART QUERIES

**View All Cart Items:**
```sql
SELECT c.*, p.name as product_name, u.name as user_name
FROM cart c
JOIN products p ON c.product_id = p.id
JOIN users u ON c.user_id = u.id;
```

**View Cart for Specific User:**
```sql
SELECT c.*, p.name, p.price
FROM cart c
JOIN products p ON c.product_id = p.id
WHERE c.user_id = 1;
```

---

### 📦 ORDER QUERIES

**View All Orders:**
```sql
SELECT o.*, u.name as customer_name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC;
```

**View Order Details with Items:**
```sql
SELECT 
  o.id as order_id,
  o.total,
  o.order_status,
  o.payment_status,
  oi.product_id,
  p.name as product_name,
  oi.quantity,
  oi.price
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.id = 1;
```

**Update Order Status:**
```sql
UPDATE orders 
SET order_status = 'shipped' 
WHERE id = 1;
```

**View Orders by Status:**
```sql
SELECT * FROM orders 
WHERE order_status = 'pending';
```

---

### 📍 ADDRESS QUERIES

**View All Addresses:**
```sql
SELECT a.*, u.name as user_name, u.email
FROM addresses a
JOIN users u ON a.user_id = u.id;
```

---

### 📊 USEFUL QUERIES

**Count Products by Category:**
```sql
SELECT c.name, COUNT(p.id) as product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.id, c.name;
```

**View Low Stock Products:**
```sql
SELECT name, stock 
FROM products 
WHERE stock < 20 
ORDER BY stock ASC;
```

**View Featured Products:**
```sql
SELECT * FROM products 
WHERE is_featured = 1;
```

**Total Sales:**
```sql
SELECT SUM(total) as total_sales, COUNT(*) as order_count
FROM orders
WHERE payment_status = 'paid';
```

---

## Step 3: See Changes in Your App

1. **Run your SQL query** in MySQL Workbench/Command Line
2. **Refresh your browser** at `http://localhost:5000`
3. **Changes appear immediately!**

### Example Workflow:

1. In MySQL, run:
   ```sql
   INSERT INTO products (category_id, name, slug, description, price, stock, sizes, images)
   VALUES (1, 'New Test Product', 'new-test-product', 'Testing direct SQL', 999, 10, '["M","L"]', '[]');
   ```

2. Refresh your app at `http://localhost:5000`
3. Go to "Shop" page
4. You'll see "New Test Product" in the product list!

---

## Important Notes

### ✅ DO:
- Use `SELECT` to view data
- Use `UPDATE` to modify existing data
- Use `INSERT` to add new data
- Use `DELETE` carefully (test first!)
- Always use `WHERE` clause with UPDATE/DELETE

### ⚠️ DON'T:
- Don't modify table structure (ALTER TABLE) unless you know what you're doing
- Don't delete foreign key records without checking dependencies
- Don't change IDs manually (they're auto-increment)
- Don't forget to use transactions for multiple related changes

### 🔒 Data Types Reference:

**Products Table:**
- `sizes`: JSON format - `'["S","M","L"]'`
- `images`: JSON format - `'[]'` or `'["url1","url2"]'`
- `price`, `sale_price`: DECIMAL(10,2) - numbers like `1290.00`
- `is_featured`: TINYINT(1) - `1` for true, `0` for false
- `slug`: Must be unique, lowercase, no spaces (use hyphens)

**Orders Table:**
- `order_status`: ENUM - `'pending'`, `'processing'`, `'shipped'`, `'delivered'`, `'cancelled'`
- `payment_status`: ENUM - `'pending'`, `'paid'`, `'failed'`
- `payment_method`: ENUM - `'cod'`, `'razorpay'`

---

## Quick Test

Try this to verify everything works:

```sql
-- 1. View current products
SELECT id, name, price FROM products LIMIT 5;

-- 2. Add a test product
INSERT INTO products (category_id, name, slug, description, price, stock, sizes, images)
VALUES (1, 'SQL Test Product', 'sql-test-product', 'Created via direct SQL!', 1499, 25, '["S","M","L"]', '[]');

-- 3. Verify it was added
SELECT * FROM products WHERE slug = 'sql-test-product';

-- 4. Refresh your app - you should see it!
```

---

## Troubleshooting

**Can't connect to MySQL?**
- Make sure MySQL service is running
- Check credentials in `.env` file
- Verify port 3306 is not blocked

**Changes not showing in app?**
- Make sure you're querying the correct database (`deodha_db`)
- Refresh your browser (Ctrl+F5)
- Check browser console for errors (F12)

**Getting errors?**
- Check foreign key constraints (can't delete user if they have orders)
- Verify data types match (JSON fields need proper format)
- Check for duplicate slugs/emails (must be unique)

---

## Need Help?

If you want to:
- Add a new product → Use INSERT INTO products
- Update prices → Use UPDATE products SET price = ...
- View orders → Use SELECT * FROM orders
- Change order status → Use UPDATE orders SET order_status = ...

All changes made directly in MySQL will be visible in your app immediately!
