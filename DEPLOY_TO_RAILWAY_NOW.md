# 🚂 Deploy to Railway RIGHT NOW!

## 🎯 **What You Need (5 Minutes Total)**

1. GitHub account ✅
2. Railway account (free) - Sign up at **railway.app**
3. Your code on GitHub

---

## ⚡ **FASTEST WAY - Follow These Steps**

### **1. Update Prisma Schema (30 seconds)**

Open `backend/prisma/schema.prisma` and change line 6:

**FROM:**
```prisma
provider = "sqlite"
```

**TO:**
```prisma
provider = "postgresql"
```

Save and commit to GitHub.

---

### **2. Go to Railway (1 minute)**

1. Visit: **https://railway.app/**
2. Click **"Start a New Project"**
3. Sign up with **GitHub**
4. Authorize Railway to access your repos

---

### **3. Deploy Backend (2 minutes)**

1. Click **"Deploy from GitHub repo"**
2. Select your e-commerce repository
3. Railway detects Node.js automatically ✅
4. Click **"Add variables"** and paste:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=my-super-secret-jwt-key-2024
JWT_EXPIRES_IN=24h
STRIPE_SECRET_KEY=sk_test_51SOjybFsAUb4gKn6Y1AazcMrT6LD5xxZYQUns2MDh7Y0FphJ6E3lq7VpkaSptjfAaN9cLD9m9lB0mhyV0m6INzVp00U37UCMDU
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=shehroozking3@gmail.com
SMTP_PASSWORD=wvxw dkiu qnsk gysg
FRONTEND_URL=https://temp-url.railway.app
```

5. Click **"New"** → **"Database"** → **"Add PostgreSQL"**
6. Click **"Deploy"**
7. **COPY YOUR BACKEND URL** (looks like: `https://xxxxx.railway.app`)

---

### **4. Deploy Frontend (2 minutes)**

1. In same project, click **"New"** → **"GitHub Repo"**
2. Select same repository
3. Railway detects Next.js automatically ✅
4. Click **"Add variables"** and paste (replace with YOUR backend URL):

```env
NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL.railway.app/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_51SOjybFsAUb4gKn6Y1AazcMrT6LD5xxZYQUns2MDh7Y0FphJ6E3lq7VpkaSptjfAaN9cLD9m9lB0mhyV0m6INzVp00U37UCMDU
```

5. Click **"Deploy"**
6. **COPY YOUR FRONTEND URL** (looks like: `https://xxxxx.railway.app`)

---

### **5. Update Backend with Frontend URL (30 seconds)**

1. Go back to **Backend service**
2. Click **"Variables"**
3. Update `FRONTEND_URL` with your actual frontend URL
4. Click **"Redeploy"**

---

## 🎉 **DONE! Your Site is Live!**

Visit your frontend URL: `https://your-frontend.railway.app`

---

## 📝 **Your Deployment Info**

Fill this out:

```
Backend URL:  https://________________________________.railway.app
Frontend URL: https://________________________________.railway.app
Database:     PostgreSQL (managed by Railway)
Deployed:     _______________
```

---

## ✅ **Quick Test**

1. Visit your frontend URL
2. Try to register/login
3. Browse products
4. Add to cart
5. Go to checkout

If everything works → **SUCCESS!** 🎉

---

## 🐛 **If Something Doesn't Work**

### **Build Failed?**
- Check Railway deploy logs
- Make sure you changed `sqlite` to `postgresql` in schema.prisma
- Verify code is pushed to GitHub

### **Frontend Can't Connect to Backend?**
- Check `NEXT_PUBLIC_API_URL` has correct backend URL
- Make sure backend is deployed and running
- Check backend health: `https://your-backend.railway.app/health`

### **Database Error?**
- Make sure PostgreSQL database is added
- Check `DATABASE_URL` is automatically set
- Wait 1-2 minutes for database to initialize

### **CORS Error?**
- Update `FRONTEND_URL` in backend variables
- Redeploy backend
- Clear browser cache

---

## 💰 **Cost**

**Free Tier:** $5 credit per month  
**Good for:** Testing and small projects  
**Upgrade:** $5/month for hobby plan (recommended for production)

---

## 📚 **More Help**

- **Detailed Guide:** `RAILWAY_DEPLOYMENT_GUIDE.md`
- **Quick Start:** `RAILWAY_QUICK_START.md`
- **Checklist:** `RAILWAY_CHECKLIST.md`
- **Railway Docs:** https://docs.railway.app/

---

## 🚀 **Next Steps**

After deployment works:

1. **Test everything thoroughly**
2. **Add custom domain** (optional)
3. **Set up JazzCash** with production credentials
4. **Monitor your app** in Railway dashboard
5. **Share your live URL!** 🎉

---

## 🎯 **Quick Summary**

```
1. Change sqlite → postgresql in schema.prisma
2. Push to GitHub
3. Sign up at railway.app
4. Deploy backend (add PostgreSQL)
5. Deploy frontend
6. Update backend FRONTEND_URL
7. Test your live site!
```

**Total Time:** 5-10 minutes  
**Cost:** Free (with $5 credit)  
**Result:** Live e-commerce website! 🚀

---

**Ready? Let's go!** 👉 **https://railway.app/**
