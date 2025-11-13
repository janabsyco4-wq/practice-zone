@echo off
color 0A
title ShopAI - Production Deployment

echo.
echo ========================================
echo    ShopAI E-Commerce Platform
echo    Production Deployment
echo ========================================
echo.

REM Check if servers are running
echo [1/5] Checking local servers...
netstat -aon | find ":5000" | find "LISTENING" >nul
if errorlevel 1 (
    echo    Warning: Backend not running on port 5000
    echo    Starting backend...
    cd backend
    start "Backend" cmd /k "npm start"
    cd ..
    timeout /t 5 >nul
) else (
    echo    Backend is running
)
echo.

REM Check Cloudflare Tunnel
echo [2/5] Checking Cloudflare Tunnel...
tasklist | find "cloudflared.exe" >nul
if errorlevel 1 (
    echo    Warning: Cloudflare Tunnel not running
    echo    Starting tunnel...
    start "Cloudflare Tunnel" cmd /k "cloudflared.exe tunnel --url http://localhost:5000"
    timeout /t 10 >nul
) else (
    echo    Cloudflare Tunnel is running
)
echo.

REM Get Tunnel URL
echo [3/5] Getting Cloudflare Tunnel URL...
echo    Please check the Cloudflare Tunnel window for the URL
echo    Example: https://something-something.trycloudflare.com
echo.
set /p TUNNEL_URL="    Enter the tunnel URL (or press Enter to skip): "
echo.

REM Update Frontend Environment
if not "!TUNNEL_URL!"=="" (
    echo [4/5] Updating frontend environment...
    echo NEXT_PUBLIC_API_URL=!TUNNEL_URL!/api> frontend\.env.production
    echo NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SOjybFsAUb4gKn6SYm9xmCiVHgXyvhnIz5VrMEK02X772dYOQoh3UHIlNXtf9vT5UBzS19GfW9qXr9VZtY01Y4h006hoQfgFc>> frontend\.env.production
    echo    Environment updated!
    echo.
    
    REM Update Vercel Environment Variable
    echo    Updating Vercel environment variable...
    cd frontend
    echo !TUNNEL_URL!/api | vercel env rm NEXT_PUBLIC_API_URL production
    echo !TUNNEL_URL!/api | vercel env add NEXT_PUBLIC_API_URL production
    cd ..
    echo.
)

REM Deploy to Vercel
echo [5/5] Deploying to Vercel...
cd frontend
echo    Building and deploying...
vercel --prod --yes
cd ..
echo.

echo ========================================
echo    Deployment Complete!
echo ========================================
echo.
if not "!TUNNEL_URL!"=="" (
    echo  Backend Tunnel: !TUNNEL_URL!
)
echo  Check Vercel output above for production URL
echo.
echo ========================================
echo.
pause
