@echo off
echo ========================================
echo Starting Backend with ngrok Tunnel
echo ========================================
echo.
echo Step 1: Starting Backend Server...
start cmd /k "cd backend && npm start"
timeout /t 5 /nobreak >nul
echo.
echo Step 2: Starting ngrok Tunnel...
echo.
echo IMPORTANT: Copy the ngrok URL (https://xxxx.ngrok-free.app)
echo           and update it in Vercel environment variables!
echo.
ngrok http 5000
