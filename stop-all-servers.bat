@echo off
color 0C
title ShopAI - Stopping All Servers

echo.
echo ========================================
echo    ShopAI E-Commerce Platform
echo    Stopping All Servers...
echo ========================================
echo.

echo [1/4] Stopping Frontend (Port 3000)...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo    Stopped process %%a
)
echo    Done!
echo.

echo [2/4] Stopping Backend (Port 5000)...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo    Stopped process %%a
)
echo    Done!
echo.

echo [3/4] Stopping Cloudflare Tunnel...
taskkill /F /IM cloudflared.exe >nul 2>&1
if errorlevel 1 (
    echo    No Cloudflare process found
) else (
    echo    Cloudflare Tunnel stopped
)
echo.

echo [4/4] Stopping Node processes...
taskkill /F /IM node.exe >nul 2>&1
if errorlevel 1 (
    echo    No Node processes found
) else (
    echo    Node processes stopped
)
echo.

echo ========================================
echo    All Servers Stopped!
echo ========================================
echo.
pause
