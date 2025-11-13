# ✅ Railway Deployment Checklist

## 📋 **Before You Start**

```
□ GitHub account created
□ Code pushed to GitHub repository
□ Railway account created (railway.app)
```

---

## 🔧 **Code Preparation**

```
□ Update backend/prisma/schema.prisma:
  Change: provider = "sqlite"
  To:     provider = "postgresql"

□ Commit and push changes to GitHub

□ Verify package.json scripts:
  Backend: "build": "tsc"
  Backend: "start": "node dist/index.js"
  Frontend: "build": "next build"
  Frontend: "start": "next start"
```

---

## 🚀 **Railway Deployment**

### **Backend Deployment**

```
□ Create new Railway project
□ Deploy from GitHub repo
□ Select your repository
□ Add PostgreSQL database
□ Add environment variables:
  □ NODE_ENV=production
  □ PORT=5000
  □ JWT_SECRET=your-secret
  □ STRIPE_SECRET_KEY=your-key
  □ SMTP_USER=your-email
  □ SMTP_PASSWORD=your-password
  □ JAZZCASH credentials (if ready)
□ Deploy backend
□ Copy backend URL: ___________________________
```

### **Frontend Deployment**

```
□ Add new service to same project
□ Deploy from GitHub repo (same repo)
□ Add environment variables:
  □ NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
  □ NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-key
□ Deploy frontend
□ Copy frontend URL: ___________________________
```

### **Final Updates**

```
□ Update backend FRONTEND_URL with actual frontend URL
□ Redeploy backend
□ Update JazzCash return URL (if using JazzCash)
```

---

## ✅ **Testing**

```
□ Visit frontend URL
□ Test login/register
□ Test browsing products
□ Test add to cart
□ Test checkout
□ Test payment (if configured)
□ Test admin dashboard
□ Check backend health: https://your-backend.railway.app/health
```

---

## 📝 **Post-Deployment**

```
□ Save your URLs:
  Frontend: ___________________________
  Backend:  ___________________________

□ Update .env.production files locally
□ Test all features thoroughly
□ Monitor Railway dashboard for errors
□ Check usage/credits
```

---

## 🎯 **Optional**

```
□ Add custom domain
□ Set up monitoring/alerts
□ Configure auto-scaling
□ Set up backup strategy
```

---

## 🆘 **If Something Goes Wrong**

```
□ Check Railway deploy logs
□ Verify all environment variables
□ Check database connection
□ Review CORS settings
□ Test API endpoints directly
□ Check Railway status page
```

---

## 💡 **Quick Links**

- Railway Dashboard: https://railway.app/dashboard
- Railway Docs: https://docs.railway.app/
- Your Backend: ___________________________
- Your Frontend: ___________________________

---

**Deployment Date:** _______________  
**Status:** □ In Progress  □ Complete  □ Issues

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________
