@echo off
color 0A
title ShopAI - Development Servers

echo.
echo ========================================
echo    ShopAI E-Commerce Platform
echo    Starting Development Servers...
echo ========================================
echo.

REM Clean up ports
echo [1/4] Cleaning up ports...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
timeout /t 2 >nul
echo    Done!
echo.

REM Start Backend
echo [2/4] Starting Backend Server...
cd backend
start "Backend - Port 5000" cmd /k "color 0B && echo Backend Server && echo =============== && npm start"
cd ..
timeout /t 3 >nul
echo    Backend started on http://localhost:5000
echo.

REM Start Cloudflare Tunnel
echo [3/4] Starting Cloudflare Tunnel...
start "Cloudflare Tunnel" cmd /k "color 0E && echo Cloudflare Tunnel && echo =============== && cloudflared.exe tunnel --url http://localhost:5000"
timeout /t 8 >nul
echo    Tunnel started! Check the Cloudflare window for the URL
echo.

REM Start Frontend
echo [4/4] Starting Frontend Server...
cd frontend
start "Frontend - Port 3000" cmd /k "color 0D && echo Frontend Server && echo =============== && npm run dev"
cd ..
timeout /t 5 >nul
echo    Frontend started on http://localhost:3000
echo.

echo ========================================
echo    All Servers Running!
echo ========================================
echo.
echo  Backend:    http://localhost:5000
echo  Frontend:   http://localhost:3000
echo  Tunnel:     Check Cloudflare Tunnel window
echo.
echo  Login:      admin@example.com / admin123
echo.
echo ========================================
echo.
echo Opening frontend in 3 seconds...
timeout /t 3 >nul
start http://localhost:3000
echo.
echo Servers are running in separate windows.
echo Close this window anytime.
echo.
pause
