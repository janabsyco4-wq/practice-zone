# LocalTunnel Setup - Free Solution ✅

## What's Running

### Backend (Local)
- Running on: `http://localhost:5000`
- Exposed via LocalTunnel: `https://tricky-insects-sit.loca.lt`

### Frontend (Vercel)
- Production URL: `https://ecommerce-5pqnq0to7-shehrooz-hafeezs-projects.vercel.app`
- Connected to LocalTunnel backend

## How to Start Everything

### 1. Start Backend
```powershell
cd backend
npm start
```

### 2. Start LocalTunnel
```powershell
lt --port 5000
```

**Note:** The LocalTunnel URL changes each time you restart it. When it changes, you need to:
1. Update `frontend/.env.production` with the new URL
2. Update `backend/src/index.ts` CORS origins
3. Restart backend
4. Redeploy frontend: `cd frontend && vercel --prod`

## Important Notes

### LocalTunnel First-Time Visit
When someone visits your LocalTunnel URL for the first time, they'll see a page asking to click "Continue". This is normal and only happens once per session.

### Keep Tunnel Running
Keep the LocalTunnel terminal window open. If you close it, the tunnel stops.

## Alternative: Use Subdomain (Optional)
For a consistent URL that doesn't change:
```powershell
lt --port 5000 --subdomain my-ecommerce-backend
```
Note: Subdomain feature may require LocalTunnel account.

## Testing
Visit your frontend: https://ecommerce-5pqnq0to7-shehrooz-hafeezs-projects.vercel.app

The site should now work without ngrok warning pages!
