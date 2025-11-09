# Quick Setup Guide

## Prerequisites

Before running the application, you need:

1. **MongoDB** - Choose one option:
   - **Option A (Recommended)**: MongoDB Atlas (Cloud - Free)
     - Go to https://www.mongodb.com/cloud/atlas
     - Create free account and cluster
     - Get connection string
     - Update `backend/.env` with your connection string
   
   - **Option B**: Local MongoDB
     - Download from https://www.mongodb.com/try/download/community
     - Install and start MongoDB service
     - Connection string already set in `backend/.env`

2. **Node.js** - Already installed ✅

## Running the Application

### Method 1: Using Batch File (Easiest)

Simply double-click `start-dev.bat` in the project root.

This will open two command windows:
- Backend Server (Port 5000)
- Frontend Server (Port 3000)

### Method 2: Manual Start

Open two separate command prompts:

**Terminal 1 - Backend:**
```cmd
cd backend
node C:\Users\RC\Downloads\node-v24.11.0-win-x64\node-v24.11.0-win-x64\node_modules\npm\bin\npm-cli.js run dev
```

**Terminal 2 - Frontend:**
```cmd
cd frontend
node C:\Users\RC\Downloads\node-v24.11.0-win-x64\node-v24.11.0-win-x64\node_modules\npm\bin\npm-cli.js run dev
```

## First Time Setup

1. **Setup MongoDB** (see Prerequisites above)

2. **Generate Prisma Client:**
```cmd
cd backend
node C:\Users\RC\Downloads\node-v24.11.0-win-x64\node-v24.11.0-win-x64\node_modules\npm\bin\npm-cli.js run prisma:generate
```

3. **Seed Database with Sample Products:**
```cmd
cd backend
node C:\Users\RC\Downloads\node-v24.11.0-win-x64\node-v24.11.0-win-x64\node_modules\npm\bin\npm-cli.js run seed
```

This creates:
- Admin user: `admin@shopai.com` / `admin123`
- 6 sample products

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## Features Available

✅ User registration and login
✅ Product browsing with search and filters
✅ Shopping cart
✅ Order management
✅ Admin dashboard (login as admin)
✅ Dark Calibri theme with 3D animations

## Next Steps

After the servers are running:

1. Visit http://localhost:3000
2. Create an account or login
3. Browse products
4. Add items to cart
5. Place orders

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running (if using local)
- Check your connection string in `backend/.env`

**Port Already in Use:**
- Close any applications using ports 3000 or 5000
- Or change ports in `.env` files

**PowerShell Execution Policy Error:**
- Use the batch file (`start-dev.bat`) instead
- Or run commands in CMD (not PowerShell)

## Environment Variables

Make sure these files exist with proper values:

**backend/.env:**
```
DATABASE_URL=mongodb://localhost:27017/ai_ecommerce
JWT_SECRET=your-secret-key
PORT=5000
```

**frontend/.env:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## What's Next?

The platform is ready for:
- Step 5: AI Features (OpenAI chatbot & recommendations)
- Step 6: Stripe Payment Integration
- Step 7: Admin Dashboard
- Step 8: Email Notifications
