# PowerShell script to rename folder from "daddy" to "culture-connect"
# IMPORTANT: Close VS Code/Cursor and all terminals before running this script!
# Run this script from the parent directory (Desktop) or from within the project folder

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Folder Rename Script" -ForegroundColor Cyan
Write-Host "Renaming: daddy -> culture-connect" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$oldFolderName = "daddy"
$newFolderName = "culture-connect"
$currentDir = Get-Location
$currentDirName = Split-Path -Leaf $currentDir

# Determine if we're in the project folder or parent folder
if ($currentDirName -eq $oldFolderName) {
    # We're inside the "daddy" folder - need to go to parent
    Write-Host "Detected: Running from inside the project folder" -ForegroundColor Yellow
    $projectPath = $currentDir
    $parentPath = Split-Path -Parent $currentDir
    $oldPath = $projectPath
    $newPath = Join-Path $parentPath $newFolderName
    
    Write-Host "  Current location: $projectPath" -ForegroundColor White
    Write-Host "  Parent directory: $parentPath" -ForegroundColor White
    Write-Host ""
    Write-Host "Note: You need to run this from the parent directory or use File Explorer" -ForegroundColor Yellow
    Write-Host "  Parent directory: $parentPath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Alternative: Use File Explorer to rename the folder manually" -ForegroundColor Yellow
    exit 1
    
} else {
    # We're in the parent directory - check if "daddy" folder exists
    $oldPath = Join-Path $currentDir $oldFolderName
    $newPath = Join-Path $currentDir $newFolderName
    
    Write-Host "Current directory: $currentDir" -ForegroundColor White
    Write-Host "Looking for folder: $oldFolderName" -ForegroundColor White
    Write-Host ""
}

# Check if the old folder exists
if (-not (Test-Path $oldPath)) {
    Write-Host "Checking if folder is already renamed..." -ForegroundColor Yellow
    
    # Check if new folder already exists
    if (Test-Path $newPath) {
        Write-Host "✓ Folder is already named 'culture-connect'" -ForegroundColor Green
        Write-Host "  Location: $newPath" -ForegroundColor Green
        exit 0
    } else {
        Write-Host "Error: Could not find folder '$oldFolderName'" -ForegroundColor Red
        Write-Host "  Searched in: $currentDir" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please run this script from the Desktop directory:" -ForegroundColor Yellow
        Write-Host "  cd C:\Users\sambh\OneDrive\Desktop" -ForegroundColor Cyan
        Write-Host "  .\daddy\rename-folder.ps1" -ForegroundColor Cyan
        exit 1
    }
}

# Check if new folder name already exists
if (Test-Path $newPath) {
    Write-Host "Error: Folder '$newFolderName' already exists!" -ForegroundColor Red
    Write-Host "  Location: $newPath" -ForegroundColor Red
    Write-Host "  Please delete or rename the existing folder first" -ForegroundColor Yellow
    exit 1
}

# Confirm the operation
Write-Host "Current folder path: $oldPath" -ForegroundColor White
Write-Host "New folder path: $newPath" -ForegroundColor White
Write-Host ""
Write-Host "This will rename the folder from 'daddy' to 'culture-connect'" -ForegroundColor Yellow
Write-Host ""
$confirmation = Read-Host "Do you want to continue? (Y/N)"

if ($confirmation -ne "Y" -and $confirmation -ne "y") {
    Write-Host "Operation cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Renaming folder..." -ForegroundColor Cyan

try {
    # Rename the folder
    Rename-Item -Path $oldPath -NewName $newFolderName -ErrorAction Stop
    
    Write-Host ""
    Write-Host "✓ Folder renamed successfully!" -ForegroundColor Green
    Write-Host "  Old name: $oldFolderName" -ForegroundColor Gray
    Write-Host "  New name: $newFolderName" -ForegroundColor Gray
    Write-Host "  Location: $newPath" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Open VS Code/Cursor" -ForegroundColor White
    Write-Host "  2. Open the folder: $newPath" -ForegroundColor White
    Write-Host "  3. (Optional) Regenerate package-lock.json:" -ForegroundColor White
    Write-Host "     cd '$newPath'" -ForegroundColor Gray
    Write-Host "     Remove-Item package-lock.json" -ForegroundColor Gray
    Write-Host "     npm install" -ForegroundColor Gray
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "Error: Failed to rename folder" -ForegroundColor Red
    Write-Host "  Error message: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible reasons:" -ForegroundColor Yellow
    Write-Host "  - Folder is in use (close VS Code/Cursor and all terminals)" -ForegroundColor Yellow
    Write-Host "  - Insufficient permissions (run as Administrator)" -ForegroundColor Yellow
    Write-Host "  - Another process is using files in the folder" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

