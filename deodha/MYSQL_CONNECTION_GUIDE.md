# How to Connect to MySQL for DEODHA Project

## Method 1: MySQL Workbench (Recommended - Visual Interface)

### Step 1: Install MySQL Workbench
- Download from: https://dev.mysql.com/downloads/workbench/
- Install it on your computer

### Step 2: Open MySQL Workbench
- Launch MySQL Workbench application

### Step 3: Create New Connection
1. Click the **"+"** button next to "MySQL Connections" (or click "Database" → "Manage Connections")
2. Fill in the connection details:

```
Connection Name: DEODHA Local
Hostname: localhost
Port: 3306
Username: root
Password: 1234
Default Schema: deodha_db
```

3. Click **"Test Connection"** button
4. If successful, click **"OK"** to save

### Step 4: Connect
1. Double-click on **"DEODHA Local"** connection
2. Enter password if prompted: `1234`
3. You're now connected!

### Step 5: Select Database
1. In the left sidebar, find **"SCHEMAS"**
2. Click the arrow next to **"deodha_db"** to expand
3. You'll see all your tables: `users`, `products`, `cart`, `orders`, etc.

### Step 6: Write SQL Queries
1. Click **"File" → "New Query Tab"** (or press `Ctrl+T`)
2. Type your SQL query, for example:
   ```sql
   SELECT * FROM products;
   ```
3. Click the **Execute** button (⚡ lightning bolt icon) or press `Ctrl+Enter`
4. Results will appear below!

---

## Method 2: Command Line (Terminal/CMD)

### Windows (Command Prompt):
```bash
cd C:\Program Files\MySQL\MySQL Server 8.0\bin
mysql.exe -u root -p1234 deodha_db
```

### Windows (PowerShell):
```powershell
mysql -u root -p1234 deodha_db
```

### If MySQL is in PATH:
```bash
mysql -u root -p1234 deodha_db
```

**Note:** If it asks for password, type: `1234`

---

## Method 3: VS Code Extension

### Step 1: Install Extension
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "MySQL" by Jun Han
4. Click Install

### Step 2: Connect
1. Press `Ctrl+Shift+P` (Command Palette)
2. Type "MySQL: Connect"
3. Enter connection details:
   - Host: `localhost`
   - Port: `3306`
   - User: `root`
   - Password: `1234`
   - Database: `deodha_db`

### Step 3: Use
- Right-click on database → "New Query"
- Write SQL and execute

---

## Method 4: phpMyAdmin (Web Interface)

If you have XAMPP/WAMP installed:

1. Open browser: `http://localhost/phpmyadmin`
2. Login:
   - Username: `root`
   - Password: `1234` (or leave empty)
3. Select `deodha_db` from left sidebar
4. Click "SQL" tab to write queries

---

## Quick Test Connection

Once connected, try this query to verify:

```sql
-- View all products
SELECT * FROM products;

-- Count products
SELECT COUNT(*) as total_products FROM products;

-- View all tables
SHOW TABLES;
```

---

## Troubleshooting

### ❌ "Can't connect to MySQL server"
**Solution:**
- Make sure MySQL service is running
- Windows: Open Services → Find "MySQL80" → Start it
- Or restart MySQL from MySQL Workbench → Server Status

### ❌ "Access denied for user 'root'"
**Solution:**
- Check password in `.env` file
- Try: `mysql -u root -p` (then enter password when prompted)

### ❌ "Unknown database 'deodha_db'"
**Solution:**
- Start your Node.js server first: `npm start`
- The database is created automatically on first run
- Or create manually: `CREATE DATABASE deodha_db;`

### ❌ "Port 3306 is already in use"
**Solution:**
- Another MySQL instance might be running
- Check if XAMPP/WAMP MySQL is running and stop it
- Or change port in `.env` file

---

## Your Connection Details Summary

```
┌─────────────────────────────────────┐
│  MySQL Connection Details            │
├─────────────────────────────────────┤
│  Host:     localhost                │
│  Port:     3306                     │
│  Username: root                     │
│  Password: 1234                     │
│  Database: deodha_db                │
└─────────────────────────────────────┘
```

---

## First Query to Try

Once connected, run this to see your data:

```sql
-- See all products
SELECT id, name, price, stock FROM products;

-- See all users
SELECT id, name, email, role FROM users;

-- See all orders
SELECT id, total, order_status, created_at FROM orders;
```

---

## Need Help?

If you're still having trouble:
1. Make sure MySQL is installed and running
2. Check your `.env` file for correct credentials
3. Try restarting MySQL service
4. Verify port 3306 is not blocked by firewall

Happy querying! 🚀
