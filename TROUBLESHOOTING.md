# Troubleshooting Guide - "Failed to Fetch" Error

## Common Causes and Solutions

### 1. Backend Server Not Running
**Symptoms:** "Failed to fetch" or "Cannot connect to server" error

**Solution:**
```powershell
# Check if backend is running
Invoke-RestMethod -Uri "http://localhost:5000/api/health"

# If not running, start it:
cd server
npm run dev
```

### 2. CORS Issues
**Symptoms:** CORS error in browser console

**Solution:**
- The server now allows multiple origins: `http://localhost:5173`, `http://127.0.0.1:5173`
- Make sure you're accessing the frontend from one of these URLs
- Restart the backend server after CORS changes

### 3. Wrong API URL
**Symptoms:** Network error or 404

**Solution:**
- Check `.env` file in root directory contains:
  ```
  VITE_API_URL=http://localhost:5000/api
  ```
- Restart the frontend server after changing `.env`

### 4. Port Already in Use
**Symptoms:** Server won't start or connection refused

**Solution:**
```powershell
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process if needed, or change port in server/.env
```

### 5. MongoDB Not Running
**Symptoms:** Backend starts but can't connect to database

**Solution:**
- For local MongoDB: Start MongoDB service
  ```powershell
  net start MongoDB
  ```
- For MongoDB Atlas: Check connection string in `server/.env`

## Quick Test

Run this to test everything:
```powershell
# Test backend
Invoke-RestMethod -Uri "http://localhost:5000/api/health"

# Test MongoDB
Invoke-RestMethod -Uri "http://localhost:5000/api/test/mongodb"

# Test registration endpoint
$testData = @{
    name = "Test"
    email = "test@test.com"
    mobile = "1234567890"
    password = "test123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $testData -ContentType "application/json"
```

## Browser Console Checks

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for:
   - API request URLs
   - CORS errors
   - Network errors
   - Any error messages

4. Go to Network tab:
   - Check if requests to `/api/auth/register` are being made
   - Check the status code (should be 200 or 201)
   - Check the response

## Restart Everything

If nothing works, restart both servers:

1. Stop all Node processes
2. Start backend: `cd server && npm run dev`
3. Start frontend: `npm run dev`
4. Clear browser cache and reload

