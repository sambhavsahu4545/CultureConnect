# Quick Fix for "Failed to Fetch" Error

## Immediate Steps:

1. **Restart the Backend Server:**
   ```powershell
   # Stop current server (Ctrl+C in the terminal)
   # Then restart:
   cd server
   npm run dev
   ```

2. **Restart the Frontend Server:**
   ```powershell
   # Stop current server (Ctrl+C in the terminal)
   # Then restart:
   npm run dev
   ```

3. **Clear Browser Cache:**
   - Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or clear browser cache manually

4. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for any error messages
   - Check Network tab to see if requests are being made

5. **Verify Backend is Running:**
   - Visit: http://localhost:5000/api/health
   - Should see: `{"success":true,"message":"Server is running",...}`

6. **Test Registration Directly:**
   - Visit: http://localhost:5173
   - Navigate to: Sign Up page
   - Fill in the form
   - Check browser console for detailed error messages

## If Still Not Working:

1. **Check if ports are correct:**
   - Backend: Port 5000
   - Frontend: Port 5173
   - MongoDB: Port 27017

2. **Verify .env files exist:**
   - `server/.env` - Should contain `MONGODB_URI` and `PORT=5000`
   - `.env` (root) - Should contain `VITE_API_URL=http://localhost:5000/api`

3. **Test API directly:**
   ```powershell
   # Test registration
   $body = @{
       name = "Test User"
       email = "test@test.com"
       mobile = "1234567890"
       password = "test123"
   } | ConvertTo-Json
   
   Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
   ```

## Debug Page:

I've created a test page. To access it, temporarily add this to your navigation or visit:
- Add `case 'api-test': return <ApiTestPage />;` to App.jsx
- Or modify the URL to test the connection

The test page will show you exactly what's failing.

