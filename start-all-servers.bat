@echo off
setlocal enabledelayedexpansion
color 0A
title ShopAI - Starting All Servers

echo.
echo ========================================
echo    ShopAI E-Commerce Platform
echo    Starting All Servers...
echo ========================================
echo.

REM Kill any existing processes on ports 3000 and 5000
echo [1/6] Cleaning up existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
timeout /t 2 >nul
echo    Done!
echo.

REM Start Backend Server
echo [2/6] Starting Backend Server (Port 5000)...
cd backend
start "ShopAI Backend" cmd /k "npm start"
cd ..
timeout /t 3 >nul
echo    Backend server started!
echo.

REM Start Cloudflare Tunnel and capture URL
echo [3/6] Starting Cloudflare Tunnel...
start "Cloudflare Tunnel" cmd /k "cloudflared.exe tunnel --url http://localhost:5000"
echo    Waiting for tunnel to establish...
timeout /t 10 >nul

REM Extract tunnel URL from cloudflared output
echo    Extracting tunnel URL...
set TUNNEL_URL=
for /f "tokens=*" %%i in ('powershell -Command "Get-Content 'cloudflared.log' -Tail 50 2>$null | Select-String -Pattern 'https://.*\.trycloudflare\.com' | Select-Object -First 1 | ForEach-Object { $_.Matches.Value }"') do set TUNNEL_URL=%%i

REM If log file doesn't exist, wait and try to get URL from process
if "!TUNNEL_URL!"=="" (
    echo    Waiting for tunnel URL...
    timeout /t 5 >nul
    REM Try alternative method - check for tunnel URL in recent output
    for /f "tokens=*" %%i in ('powershell -Command "$processes = Get-Process | Where-Object {$_.ProcessName -eq 'cloudflared'}; if ($processes) { Start-Sleep -Seconds 3; 'Tunnel starting...' }"') do echo %%i
    set TUNNEL_URL=https://tunnel-url-will-be-shown-in-cloudflare-window.trycloudflare.com
    echo    Note: Check the Cloudflare Tunnel window for the actual URL
)

echo    Tunnel URL: !TUNNEL_URL!
echo.

REM Update Frontend Environment Variable
echo [4/6] Updating Frontend Environment...
if not "!TUNNEL_URL!"=="" (
    echo NEXT_PUBLIC_API_URL=!TUNNEL_URL!/api> frontend\.env.production
    echo NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SOjybFsAUb4gKn6SYm9xmCiVHgXyvhnIz5VrMEK02X772dYOQoh3UHIlNXtf9vT5UBzS19GfW9qXr9VZtY01Y4h006hoQfgFc>> frontend\.env.production
    echo    Frontend environment updated!
) else (
    echo    Warning: Could not auto-detect tunnel URL
    echo    Please update frontend\.env.production manually
)
echo.

REM Start Frontend Dev Server
echo [5/6] Starting Frontend Dev Server (Port 3000)...
cd frontend
start "ShopAI Frontend" cmd /k "npm run dev"
cd ..
timeout /t 5 >nul
echo    Frontend server started!
echo.

REM Display Summary
echo [6/6] All Servers Started!
echo.
echo ========================================
echo    Server Status
echo ========================================
echo.
echo  Backend:    http://localhost:5000
echo  Frontend:   http://localhost:3000
echo  Tunnel:     !TUNNEL_URL!
echo.
echo ========================================
echo    Login Credentials
echo ========================================
echo.
echo  Admin:  admin@example.com / admin123
echo  User:   user@example.com / user123
echo.
echo ========================================
echo    Quick Actions
echo ========================================
echo.
echo  1. Open Frontend:  start http://localhost:3000
echo  2. Open Backend:   start http://localhost:5000/api/products
echo  3. Deploy to Vercel: cd frontend ^&^& vercel --prod
echo.
echo ========================================
echo.
echo Press any key to open the frontend...
pause >nul
start http://localhost:3000
echo.
echo All servers are running!
echo Close this window to keep servers running.
echo.
pause
