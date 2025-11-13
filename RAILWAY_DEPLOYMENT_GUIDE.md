# 🚂 Railway Deployment Guide - Complete Setup

## 📋 **What You'll Deploy**

- **Backend:** Node.js API (Port 5000)
- **Frontend:** Next.js App (Port 3000)
- **Database:** PostgreSQL (Railway provides free tier)

---

## 🚀 **Step-by-Step Deployment**

### **STEP 1: Prepare Your Code**

#### 1.1 Update Backend for Production

Open `backend/src/index.ts` and update the port configuration:

```typescript
const PORT = process.env.PORT || 5000;
```

Make sure CORS allows Railway domains. Update CORS config:

```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'http://localhost:3000',
    /\.railway\.app$/,  // Allow all Railway domains
  ],
  credentials: true,
}));
```

#### 1.2 Update Database Configuration

Open `backend/prisma/schema.prisma` and change to PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"  // Change from sqlite
  url      = env("DATABASE_URL")
}
```

#### 1.3 Add Build Script to Backend

Your `backend/package.json` already has the right scripts! ✅

---

### **STEP 2: Create Railway Account**

1. Go to **https://railway.app/**
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (recommended)
4. Verify your email

---

### **STEP 3: Deploy Backend**

#### 3.1 Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Connect your GitHub account
4. Select your repository
5. Choose **"backend"** folder

#### 3.2 Configure Backend Service

1. Railway will auto-detect Node.js
2. Click on your service
3. Go to **"Settings"** tab

**Build Settings:**
- **Build Command:** `npm install && npx prisma generate && npm run build`
- **Start Command:** `npx prisma migrate deploy && node dist/index.js`
- **Root Directory:** `backend`

#### 3.3 Add PostgreSQL Database

1. Click **"New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway will automatically create `DATABASE_URL` variable
3. Your backend will automatically connect to it

#### 3.4 Add Environment Variables

Click **"Variables"** tab and add:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# JazzCash
JAZZCASH_MERCHANT_ID=your_merchant_id
JAZZCASH_PASSWORD=your_password
JAZZCASH_INTEGRITY_SALT=your_salt
JAZZCASH_RETURN_URL=https://your-frontend.railway.app/payment/jazzcash/callback

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Frontend URL (will update after frontend deployment)
FRONTEND_URL=https://your-frontend.railway.app
```

#### 3.5 Deploy Backend

1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Copy your backend URL: `https://your-backend.railway.app`

---

### **STEP 4: Deploy Frontend**

#### 4.1 Create Frontend Service

1. In same project, click **"New"** → **"GitHub Repo"**
2. Select same repository
3. Choose **"frontend"** folder

#### 4.2 Configure Frontend Service

**Build Settings:**
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Root Directory:** `frontend`

#### 4.3 Add Frontend Environment Variables

Click **"Variables"** tab and add:

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

#### 4.4 Deploy Frontend

1. Click **"Deploy"**
2. Wait for build (3-5 minutes)
3. Copy your frontend URL: `https://your-frontend.railway.app`

---

### **STEP 5: Update Backend with Frontend URL**

1. Go back to **Backend service**
2. Click **"Variables"**
3. Update `FRONTEND_URL` with your actual frontend URL
4. Update `JAZZCASH_RETURN_URL` with your actual frontend URL
5. Click **"Redeploy"**

---

### **STEP 6: Run Database Migrations**

#### Option 1: Using Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run npx prisma migrate deploy
```

#### Option 2: Using Railway Dashboard

1. Go to Backend service
2. Click **"Settings"** → **"Deploy Logs"**
3. Migrations should run automatically on deploy

---

### **STEP 7: Seed Database (Optional)**

1. Go to Backend service
2. Click **"Settings"** → **"Deploy"**
3. Add one-time command: `npm run seed`
4. Or use Railway CLI: `railway run npm run seed`

---

## 🔧 **Configuration Files**

### **Backend railway.json** (Create this file)

Create `backend/railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npx prisma generate && npm run build"
  },
  "deploy": {
    "startCommand": "npx prisma migrate deploy && node dist/index.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### **Frontend railway.json** (Create this file)

Create `frontend/railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 📝 **Update Your Code for Railway**

### **1. Update Backend CORS**

Edit `backend/src/index.ts`:

```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'http://localhost:3000',
    /\.railway\.app$/,  // Allow Railway domains
  ],
  credentials: true,
}));
```

### **2. Update Prisma Schema**

Edit `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from sqlite
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Rest of your models stay the same
```

### **3. Update Frontend API URL**

Edit `frontend/src/lib/api.ts`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
```

---

## ✅ **Verification Checklist**

After deployment, test these:

```
□ Backend health check: https://your-backend.railway.app/health
□ Frontend loads: https://your-frontend.railway.app
□ Login works
□ Products page loads
□ Add to cart works
□ Checkout works
□ Payment integration works
□ Admin dashboard accessible
```

---

## 🐛 **Troubleshooting**

### **Issue: Build Failed**

**Solution:**
1. Check deploy logs in Railway dashboard
2. Verify all dependencies in package.json
3. Make sure build commands are correct

### **Issue: Database Connection Error**

**Solution:**
1. Verify PostgreSQL is added to project
2. Check DATABASE_URL is set automatically
3. Run migrations: `railway run npx prisma migrate deploy`

### **Issue: CORS Error**

**Solution:**
1. Add Railway domain to CORS whitelist
2. Update FRONTEND_URL in backend variables
3. Redeploy backend

### **Issue: Environment Variables Not Working**

**Solution:**
1. Check variables are set in Railway dashboard
2. Restart service after adding variables
3. Use NEXT_PUBLIC_ prefix for frontend variables

---

## 💰 **Railway Pricing**

**Free Tier:**
- $5 credit per month
- Enough for small projects
- Automatic sleep after inactivity

**Hobby Plan ($5/month):**
- $5 credit + $5 usage
- No sleep
- Better for production

**Pro Plan ($20/month):**
- $20 credit + usage
- Priority support
- Team features

---

## 🚀 **Quick Commands**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs

# Run command
railway run npm run seed

# Open dashboard
railway open
```

---

## 📊 **Your Deployment URLs**

After deployment, you'll have:

```
Backend:  https://your-backend-name.railway.app
Frontend: https://your-frontend-name.railway.app
Database: Managed by Railway (internal)
```

---

## 🎯 **Next Steps After Deployment**

1. **Test Everything:**
   - Login/Register
   - Browse products
   - Add to cart
   - Checkout
   - Payment

2. **Set Up Custom Domain (Optional):**
   - Go to Frontend service
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Update DNS records

3. **Monitor Your App:**
   - Check logs regularly
   - Monitor usage
   - Set up alerts

4. **Update JazzCash:**
   - Register your Railway URL with JazzCash
   - Update return URL in their dashboard

---

## 🎉 **You're Done!**

Your e-commerce platform is now live on Railway! 🚀

**Share your URLs:**
- Frontend: https://your-frontend.railway.app
- Backend API: https://your-backend.railway.app/api

---

**Need Help?**
- Railway Docs: https://docs.railway.app/
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app/

**Last Updated:** November 11, 2025
