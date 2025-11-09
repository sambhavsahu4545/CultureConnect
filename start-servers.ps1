# PowerShell script to start both backend and frontend servers
# Run this script to launch the entire application

Write-Host "Starting Culture Connect Servers..." -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is accessible (optional check)
Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
try {
    $mongoTest = Invoke-RestMethod -Uri "http://localhost:5000/api/test/mongodb" -ErrorAction Stop
    if ($mongoTest.success) {
        Write-Host "✓ MongoDB is connected" -ForegroundColor Green
    } else {
        Write-Host "✗ MongoDB connection failed" -ForegroundColor Red
    }
} catch {
    Write-Host "⚠ Backend server may not be running yet" -ForegroundColor Yellow
}

Write-Host ""
# Start backend server in a new window
Write-Host "Starting Backend Server (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; npm run dev"

Start-Sleep -Seconds 3

# Start frontend server in a new window
Write-Host "Starting Frontend Server (Port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev"

Write-Host ""
Write-Host "✓ Servers are starting..." -ForegroundColor Green
Write-Host "  Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

