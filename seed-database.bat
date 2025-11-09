@echo off
echo Seeding database with sample products...
cd backend
node C:\Users\RC\Downloads\node-v24.11.0-win-x64\node-v24.11.0-win-x64\node_modules\npm\bin\npm-cli.js run seed
echo.
echo Done! Press any key to exit...
pause > nul
