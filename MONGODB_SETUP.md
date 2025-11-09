# MongoDB Atlas Setup Guide (5 Minutes)

## Step 1: Create Free Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google
3. No credit card required!

## Step 2: Create Free Cluster

1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select any cloud provider (AWS/Google/Azure)
4. Choose a region close to you
5. Cluster Name: Keep default or name it "ShopAI"
6. Click **"Create"** (takes 3-5 minutes)

## Step 3: Create Database User

1. You'll see a "Security Quickstart" popup
2. Choose **"Username and Password"**
3. Create a username (e.g., `shopai`)
4. Create a password (save this!)
5. Click **"Create User"**

## Step 4: Add Your IP Address

1. Still in the popup, scroll down to "Where would you like to connect from?"
2. Choose **"My Local Environment"**
3. Click **"Add My Current IP Address"**
4. Or click **"Allow Access from Anywhere"** (easier for development)
5. Click **"Finish and Close"**

## Step 5: Get Connection String

1. Click **"Connect"** button on your cluster
2. Choose **"Drivers"**
3. Select: **Node.js** and version **5.5 or later**
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://shopai:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your .env File

1. Open `backend/.env` file
2. Replace the DATABASE_URL line with your connection string
3. Replace `<password>` with your actual password
4. Add the database name before the `?`:
   ```
   DATABASE_URL=mongodb+srv://shopai:yourpassword@cluster0.xxxxx.mongodb.net/ai_ecommerce?retryWrites=true&w=majority
   ```

## Step 7: Seed the Database

Run this command in the backend folder:
```cmd
node C:\Users\RC\Downloads\node-v24.11.0-win-x64\node-v24.11.0-win-x64\node_modules\npm\bin\npm-cli.js run seed
```

This will create:
- ✅ Admin user: `admin@shopai.com` / `admin123`
- ✅ 6 sample products

## Step 8: Restart Backend Server

Close the backend terminal and run `start-dev.bat` again.

## Verify It Works

1. Go to http://localhost:3000/products
2. You should see 6 products!
3. Try creating an account and shopping

---

## Troubleshooting

**"No record found for Query" error:**
- Make sure you replaced `<password>` with your actual password
- Check that you added `/ai_ecommerce` before the `?` in the connection string

**"Authentication failed" error:**
- Double-check your username and password
- Make sure there are no spaces in the connection string

**Still not working?**
- Go to MongoDB Atlas → Network Access
- Make sure "0.0.0.0/0" is in the IP Access List (allows all IPs)

---

## Quick Example

Your final DATABASE_URL should look like:
```
DATABASE_URL=mongodb+srv://shopai:MyPassword123@cluster0.abc123.mongodb.net/ai_ecommerce?retryWrites=true&w=majority
```

Replace:
- `shopai` → your username
- `MyPassword123` → your password
- `cluster0.abc123` → your cluster address
