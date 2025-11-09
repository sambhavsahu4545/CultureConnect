# How to Fix "Failed to Fetch" Error

## Step 1: Restart Backend Server

1. **Stop the current backend server:**
   - Go to the terminal where backend is running
   - Press `Ctrl+C` to stop it

2. **Start the backend server again:**
   ```powershell
   cd server
   npm run dev
   ```

3. **Wait for these messages:**
   - ✅ MongoDB Connected: localhost
   - ✅ Database: culture-connect
   - Server running in development mode on port 5000

## Step 2: Restart Frontend Server

1. **Stop the current frontend server:**
   - Go to the terminal where frontend is running
   - Press `Ctrl+C` to stop it

2. **Start the frontend server again:**
   ```powershell
   npm run dev
   ```

3. **Wait for Vite to start:**
   - Should show: `Local: http://localhost:5173/`

## Step 3: Clear Browser Cache

- Press `Ctrl+Shift+R` (Windows) to hard refresh
- Or open DevTools (F12) → Network tab → Check "Disable cache"

## Step 4: Test the Connection

1. Open browser console (F12)
2. Go to the Sign Up page
3. Fill in the form and submit
4. Check the console for:
   - API Request logs
   - Any error messages
   - Network tab to see the request/response

## Step 5: Verify Backend is Working

Visit these URLs in your browser:
1. http://localhost:5000/api/health
   - Should show: `{"success":true,"message":"Server is running",...}`

2. http://localhost:5000/api/test/mongodb
   - Should show: `{"success":true,"message":"MongoDB is connected successfully!",...}`

## Common Issues:

### Issue 1: Backend not running
**Solution:** Make sure backend server is running on port 5000

### Issue 2: CORS error
**Solution:** Backend now allows all localhost origins. Restart the backend server.

### Issue 3: Wrong API URL
**Solution:** Check `.env` file contains: `VITE_API_URL=http://localhost:5000/api`

### Issue 4: Port conflict
**Solution:** Make sure nothing else is using port 5000 or 5173

## Still Not Working?

1. Check browser console (F12) for specific error messages
2. Check Network tab to see if requests are being made
3. Verify both servers are running in separate terminals
4. Try accessing the API test page by adding `?page=api-test` to the URL (if implemented)

