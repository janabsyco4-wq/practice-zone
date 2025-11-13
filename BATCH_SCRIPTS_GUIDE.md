# 🚀 ShopAI Batch Scripts Guide

Complete guide for running and deploying your ShopAI e-commerce platform.

---

## 📋 Available Scripts

### 1. `start-dev.bat` - Start Development Servers
**Use this for local development**

**What it does:**
- ✅ Cleans up ports 3000 and 5000
- ✅ Starts Backend server (Port 5000)
- ✅ Starts Cloudflare Tunnel (exposes backend publicly)
- ✅ Starts Frontend dev server (Port 3000)
- ✅ Opens frontend in browser automatically

**How to use:**
```bash
# Double-click the file or run:
start-dev.bat
```

**Result:**
- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- Tunnel: Check Cloudflare window for URL

---

### 2. `deploy-production.bat` - Deploy to Vercel
**Use this to deploy your frontend to production**

**What it does:**
- ✅ Checks if backend and tunnel are running
- ✅ Prompts for Cloudflare tunnel URL
- ✅ Updates frontend environment variables
- ✅ Updates Vercel environment variables
- ✅ Deploys to Vercel production

**How to use:**
```bash
# 1. Make sure backend and tunnel are running (use start-dev.bat)
# 2. Copy the tunnel URL from Cloudflare window
# 3. Run:
deploy-production.bat

# 4. Paste the tunnel URL when prompted
```

**Important:**
- Keep backend and Cloudflare tunnel running for production to work
- The tunnel URL changes each time you restart cloudflared

---

### 3. `stop-all-servers.bat` - Stop All Servers
**Use this to cleanly stop all running servers**

**What it does:**
- ✅ Stops Frontend (Port 3000)
- ✅ Stops Backend (Port 5000)
- ✅ Stops Cloudflare Tunnel
- ✅ Stops all Node processes

**How to use:**
```bash
stop-all-servers.bat
```

---

### 4. `start-all-servers.bat` - Advanced Auto-Start
**Experimental: Attempts to auto-detect tunnel URL**

**What it does:**
- Everything in start-dev.bat
- Attempts to auto-update frontend environment with tunnel URL

**Note:** May not always detect tunnel URL correctly. Use `start-dev.bat` + `deploy-production.bat` for more reliable workflow.

---

## 🔄 Recommended Workflow

### For Local Development:
```bash
1. Run: start-dev.bat
2. Wait for all servers to start
3. Frontend opens at http://localhost:3000
4. Start coding!
```

### For Production Deployment:
```bash
1. Run: start-dev.bat (if not already running)
2. Copy tunnel URL from Cloudflare window
   Example: https://something-words.trycloudflare.com
3. Run: deploy-production.bat
4. Paste the tunnel URL when prompted
5. Wait for Vercel deployment to complete
6. Access your production site!
```

### To Stop Everything:
```bash
1. Run: stop-all-servers.bat
2. All servers will be stopped cleanly
```

---

## 🔐 Login Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**User Account:**
- Email: `user@example.com`
- Password: `user123`

---

## 🌐 URLs

### Local Development:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Backend Health: http://localhost:5000/api/products

### Production:
- Frontend: Your Vercel URL (shown after deployment)
- Backend: Your Cloudflare Tunnel URL

---

## 🐛 Troubleshooting

### Port Already in Use:
```bash
# Run stop-all-servers.bat first, then start again
stop-all-servers.bat
start-dev.bat
```

### Cloudflare Tunnel Not Working:
```bash
# Make sure cloudflared.exe is in the root directory
# Download from: https://github.com/cloudflare/cloudflared/releases
```

### Frontend Can't Connect to Backend:
```bash
# 1. Check backend is running on port 5000
# 2. Check Cloudflare tunnel is running
# 3. Update frontend/.env.production with correct tunnel URL
# 4. Redeploy: deploy-production.bat
```

### Vercel Deployment Fails:
```bash
# Make sure you're logged in to Vercel:
cd frontend
vercel login
vercel --prod
```

---

## 📝 Manual Commands

If you prefer running commands manually:

### Start Backend:
```bash
cd backend
npm start
```

### Start Frontend:
```bash
cd frontend
npm run dev
```

### Start Cloudflare Tunnel:
```bash
cloudflared.exe tunnel --url http://localhost:5000
```

### Deploy to Vercel:
```bash
cd frontend
vercel --prod --yes
```

---

## 💡 Tips

1. **Keep Tunnel Running:** For production to work, keep the Cloudflare tunnel running on your computer
2. **Tunnel URL Changes:** Each time you restart cloudflared, you get a new URL - update Vercel accordingly
3. **Database:** Using SQLite (local file: backend/dev.db) - no separate database server needed
4. **Email:** Configured with Gmail SMTP - emails will be sent for orders
5. **Stripe:** Using test mode - use test card: 4242 4242 4242 4242

---

## 🎯 Quick Reference

| Action | Command |
|--------|---------|
| Start Development | `start-dev.bat` |
| Deploy Production | `deploy-production.bat` |
| Stop All Servers | `stop-all-servers.bat` |
| Test Email | `cd backend && node test-email.js` |
| View Database | `cd backend && node view-database.js` |

---

## 📧 Support

If you encounter issues:
1. Check the console output in each window
2. Verify all dependencies are installed (`npm install`)
3. Check that ports 3000 and 5000 are available
4. Ensure cloudflared.exe is in the root directory

---

**Happy Coding! 🚀**
