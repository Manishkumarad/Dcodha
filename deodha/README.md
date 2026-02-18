# DEODHA — Full Stack E-Commerce Platform

A production-ready clothing brand e-commerce website with user auth, product management, shopping cart, and multi-payment checkout.

---

## 📁 Project Structure

```
deodha/
├── server.js                   ← Main Express server
├── package.json
├── .env                        ← Environment variables (DB, JWT, Razorpay)
├── public/
│   └── index.html              ← Full frontend SPA
└── src/
    ├── config/
    │   └── database.js         ← MySQL connection + auto table creation + seed data
    ├── middleware/
    │   └── auth.js             ← JWT auth & admin middleware
    └── routes/
        ├── auth.js             ← Register, Login, Profile
        ├── products.js         ← Products & Categories (CRUD + filters)
        ├── cart.js             ← Add / Update / Remove / Clear cart
        ├── addresses.js        ← User shipping addresses CRUD
        └── orders.js           ← COD orders + Razorpay create/verify + order history
```

---

## ⚡ Setup & Run (Step by Step)

### Step 1 — Install Node.js
Make sure you have **Node.js** installed (v18+). Download from https://nodejs.org

### Step 2 — Make sure MySQL is running
- Open **MySQL Workbench** or your MySQL service and ensure it's running on `localhost:3306`
- Login credentials should be `root` / `1234`
- The app will **automatically create** the `deodha_db` database and all tables on first run.

### Step 3 — Download & open the project folder
Extract the `deodha` folder and open a terminal inside it.

### Step 4 — Install dependencies
```bash
npm install
```

### Step 5 — Start the server
```bash
npm run dev
```
You should see:
```
✅ Database & tables ready.
🚀  DEODHA server running on http://localhost:5000
```

### Step 6 — Open in browser
Go to: **http://localhost:5000**

The app is fully working! Products are pre-seeded automatically.

---

## 💳 Adding Razorpay (for Card / Google Pay / PhonePe / UPI)

1. Sign up at **https://razorpay.com** (free)
2. Go to **Settings → Keys** and copy your **Key ID** and **Key Secret**
3. Open `.env` and replace:
```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```
4. Restart the server with `npm run dev`

**Note:** Until you add real Razorpay keys, the "Card / Google Pay / PhonePe" payment option will show an error. **Cash on Delivery works without any setup.**

---

## 🚀 Deploying to Production (Railway — Recommended)

1. Push your project to a **GitHub repo**
2. Go to **https://railway.app** → New Project → Deploy from GitHub
3. Add these environment variables in Railway:
   - All variables from your `.env` file
   - Change `DB_HOST` to your Railway MySQL host
   - Set `PORT=5000`
4. Railway auto-deploys on every push

---

## 🛡️ API Endpoints Reference

| Method | Endpoint                     | Auth | Description                        |
|--------|------------------------------|------|------------------------------------|
| POST   | /api/auth/register           | No   | Create account                     |
| POST   | /api/auth/login              | No   | Login → returns JWT token          |
| GET    | /api/auth/profile            | Yes  | Get current user profile           |
| GET    | /api/products                | No   | List products (filter/search/page) |
| GET    | /api/products/:slug          | No   | Single product by slug             |
| GET    | /api/products/categories     | No   | All categories                     |
| GET    | /api/cart                    | Yes  | Get user's cart                    |
| POST   | /api/cart                    | Yes  | Add item to cart                   |
| PUT    | /api/cart/:id                | Yes  | Update cart item quantity          |
| DELETE | /api/cart/:id                | Yes  | Remove cart item                   |
| GET    | /api/addresses               | Yes  | Get user addresses                 |
| POST   | /api/addresses               | Yes  | Add address                        |
| POST   | /api/orders/cod              | Yes  | Place COD order                    |
| POST   | /api/orders/razorpay/create  | Yes  | Create Razorpay order              |
| POST   | /api/orders/razorpay/verify  | Yes  | Verify Razorpay payment            |
| GET    | /api/orders/my               | Yes  | User's order history               |

---

## 📝 What's Included

- ✅ Full user authentication (Register / Login / JWT)
- ✅ Product listing with category filters & search
- ✅ Product detail page with size selection
- ✅ Shopping cart (add, update qty, remove)
- ✅ Checkout with delivery address management
- ✅ Cash on Delivery payment
- ✅ Razorpay integration (Card, Google Pay, PhonePe, UPI, Debit Card)
- ✅ Order history with status tracking
- ✅ Auto database setup with seed data (10 products, 5 categories)
- ✅ Admin-ready API endpoints for product & order management
- ✅ Fully responsive design
- ✅ Production-grade code structure
