@echo off
title E-Commerce Platform - Production Startup
color 0A

echo.
echo ============================================================
echo          E-COMMERCE PLATFORM - PRODUCTION STARTUP
echo ============================================================
echo.
echo This will start all required services:
echo   1. Backend Server (Express + Prisma + MongoDB)
echo   2. Cloudflare Tunnel (Public Backend Access)
echo.
echo Frontend is already deployed on Vercel:
echo https://ecommerce-1txcymlqr-shehrooz-hafeezs-projects.vercel.app
echo.
echo Database: MongoDB Atlas (Cloud)
echo ============================================================
echo.

REM Check if cloudflared.exe exists
if not exist "cloudflared.exe" (
    echo [ERROR] cloudflared.exe not found!
    echo.
    echo Please download it from:
    echo https://github.com/cloudflare/cloudflared/releases
    echo.
    echo Download: cloudflared-windows-amd64.exe
    echo Rename to: cloudflared.exe
    echo Place in: %CD%
    echo.
    pause
    exit /b 1
)

echo [Step 1/2] Starting Backend Server...
echo ============================================================
start "Backend Server - Port 5000" cmd /k "cd backend && echo Starting Backend Server... && npm start"
echo Backend server starting on http://localhost:5000
timeout /t 5 /nobreak >nul

echo.
echo [Step 2/2] Starting Cloudflare Tunnel...
echo ============================================================
start "Cloudflare Tunnel - Public Access" cmd /k "echo Starting Cloudflare Tunnel... && cloudflared.exe tunnel --url http://localhost:5000"
echo Cloudflare Tunnel starting...
timeout /t 8 /nobreak >nul

echo.
echo ============================================================
echo                    STARTUP COMPLETE!
echo ============================================================
echo.
echo [BACKEND]
echo   Local:  http://localhost:5000
echo   Public: Check "Cloudflare Tunnel" window for URL
echo.
echo [FRONTEND]
echo   Production: https://ecommerce-1txcymlqr-shehrooz-hafeezs-projects.vercel.app
echo.
echo [DATABASE]
echo   MongoDB Atlas: Connected (Cloud)
echo.
echo ============================================================
echo.
echo IMPORTANT NOTES:
echo   - Keep both windows open (Backend + Tunnel)
echo   - Cloudflare Tunnel URL changes on each restart
echo   - Frontend is live on Vercel (no local needed)
echo   - Database is on MongoDB Atlas (cloud)
echo.
echo To update frontend: cd frontend ^&^& vercel --prod
echo To stop servers: Close both command windows
echo.
echo ============================================================
echo.
echo Opening production site in browser...
timeout /t 2 /nobreak >nul
start https://ecommerce-1txcymlqr-shehrooz-hafeezs-projects.vercel.app

echo.
echo Press any key to exit this window...
echo (Backend and Tunnel will keep running)
pause >nul
