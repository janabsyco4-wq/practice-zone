# 🚂 Railway Deployment - Quick Start (5 Minutes)

## ⚡ **Super Fast Deployment**

### **Step 1: Sign Up (1 minute)**
1. Go to **https://railway.app/**
2. Click **"Start a New Project"**
3. Sign up with **GitHub**

---

### **Step 2: Deploy Backend (2 minutes)**

1. Click **"New Project"** → **"Deploy from GitHub repo"**
2. Select your repository
3. Railway auto-detects Node.js ✅
4. Add **PostgreSQL database**: Click **"New"** → **"Database"** → **"PostgreSQL"**
5. Add environment variables (click "Variables"):

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-secret-key-here
STRIPE_SECRET_KEY=your-stripe-key
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FRONTEND_URL=https://your-frontend.railway.app
```

6. Click **"Deploy"** ✅
7. **Copy your backend URL**: `https://xxxxx.railway.app`

---

### **Step 3: Deploy Frontend (2 minutes)**

1. In same project, click **"New"** → **"GitHub Repo"**
2. Select same repository (Railway will detect it's Next.js)
3. Add environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
```

4. Click **"Deploy"** ✅
5. **Copy your frontend URL**: `https://xxxxx.railway.app`

---

### **Step 4: Update Backend URL**

1. Go back to **Backend service**
2. Update `FRONTEND_URL` variable with your actual frontend URL
3. Click **"Redeploy"**

---

## ✅ **Done! Test Your Site**

Visit: `https://your-frontend.railway.app`

---

## 🔧 **Important: Update Prisma for PostgreSQL**

Before deploying, change `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

Then commit and push to GitHub.

---

## 📝 **Environment Variables Needed**

### **Backend:**
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=<auto-set-by-railway>
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=24h
STRIPE_SECRET_KEY=sk_test_your_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FRONTEND_URL=https://your-frontend.railway.app
JAZZCASH_MERCHANT_ID=your_merchant_id
JAZZCASH_PASSWORD=your_password
JAZZCASH_INTEGRITY_SALT=your_salt
```

### **Frontend:**
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_key
```

---

## 🐛 **Quick Fixes**

### **Build Failed?**
- Check deploy logs in Railway dashboard
- Make sure `package.json` has correct scripts
- Verify all dependencies are listed

### **Database Error?**
- PostgreSQL should auto-connect
- Check `DATABASE_URL` is set
- Run migrations: `railway run npx prisma migrate deploy`

### **CORS Error?**
- Update `FRONTEND_URL` in backend variables
- Add Railway domain to CORS whitelist in `backend/src/index.ts`

---

## 💰 **Cost**

**Free Tier:** $5 credit/month (enough for testing)  
**Hobby:** $5/month (recommended for production)

---

## 🎯 **That's It!**

Your e-commerce site is now live on Railway! 🚀

**Full Guide:** See `RAILWAY_DEPLOYMENT_GUIDE.md` for detailed instructions.
