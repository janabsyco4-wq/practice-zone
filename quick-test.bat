@echo off
color 0B
title ShopAI - Quick Test

echo.
echo ========================================
echo    ShopAI - Quick System Test
echo ========================================
echo.

echo [1/5] Testing Backend API...
curl -s http://localhost:5000/api/products >nul 2>&1
if errorlevel 1 (
    echo    ❌ Backend not responding
    echo    Run: start-dev.bat
) else (
    echo    ✅ Backend is working
)
echo.

echo [2/5] Testing Frontend...
curl -s http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo    ❌ Frontend not responding
    echo    Run: start-dev.bat
) else (
    echo    ✅ Frontend is working
)
echo.

echo [3/5] Testing Database...
cd backend
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.product.count().then(count => console.log('   ✅ Database working -', count, 'products')).catch(() => console.log('   ❌ Database error')).finally(() => prisma.$disconnect());"
cd ..
echo.

echo [4/5] Testing Email Configuration...
cd backend
node -e "require('dotenv').config(); console.log(process.env.SMTP_USER ? '   ✅ Email configured' : '   ❌ Email not configured');"
cd ..
echo.

echo [5/5] Checking Cloudflare Tunnel...
tasklist | find "cloudflared.exe" >nul
if errorlevel 1 (
    echo    ❌ Cloudflare Tunnel not running
    echo    Run: start-dev.bat
) else (
    echo    ✅ Cloudflare Tunnel is running
)
echo.

echo ========================================
echo    Test Complete!
echo ========================================
echo.
echo Quick Actions:
echo  1. Start servers:  start-dev.bat
echo  2. Deploy:         deploy-production.bat
echo  3. Stop servers:   stop-all-servers.bat
echo.
pause
