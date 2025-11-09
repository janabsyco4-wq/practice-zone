@echo off
echo Restarting servers...
echo.

echo Stopping any running Node processes...
taskkill /F /IM node.exe 2>nul

timeout /t 2 /nobreak > nul

echo Starting Backend Server (Port 5000)...
start "Backend Server" cmd /k "cd backend && node C:\Users\RC\Downloads\node-v24.11.0-win-x64\node-v24.11.0-win-x64\node_modules\npm\bin\npm-cli.js run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server (Port 3000)...
start "Frontend Server" cmd /k "cd frontend && node C:\Users\RC\Downloads\node-v24.11.0-win-x64\node-v24.11.0-win-x64\node_modules\npm\bin\npm-cli.js run dev"

echo.
echo ========================================
echo Servers restarted!
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit...
pause > nul
