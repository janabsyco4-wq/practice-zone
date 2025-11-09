$ngrokPath = "C:\Users\RC\Downloads\node-v24.11.0-win-x64\node-v24.11.0-win-x64"
$env:PATH = "$ngrokPath;$env:PATH"
& "$ngrokPath\ngrok" http 5000
