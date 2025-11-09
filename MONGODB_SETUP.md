# 🔧 MongoDB Atlas Setup Guide

## Your Connection String

You have: `mongodb+srv://sambhavsahu5_db_user:<db_password>@cultureconnect1.pusdh1i.mongodb.net/`

---

## Step 1: Complete Your Connection String

### What you need to do:

1. **Replace `<db_password>`** with your actual database password
   - This is the password you set when creating the database user in MongoDB Atlas
   - If you forgot it, you'll need to reset it in MongoDB Atlas

2. **Add database name** at the end
   - Add `?retryWrites=true&w=majority` for connection options
   - Or just add your database name like `culture-connect`

### Final connection string format:

```
mongodb+srv://sambhavsahu5_db_user:YOUR_PASSWORD@cultureconnect1.pusdh1i.mongodb.net/culture-connect?retryWrites=true&w=majority
```

**Replace `YOUR_PASSWORD` with your actual password!**

---

## Step 2: Configure IP Whitelist in MongoDB Atlas

1. Go to MongoDB Atlas dashboard
2. Click on "Network Access" (left sidebar)
3. Click "Add IP Address"
4. For development/testing, add:
   - `0.0.0.0/0` (allows all IPs - less secure but easier)
   - OR add your specific IP address
5. Click "Confirm"

⚠️ **Important:** For production, use specific IPs instead of `0.0.0.0/0`

---

## Step 3: Test Connection Locally

### Option A: Test with the test script

1. Create a `.env` file in the `server` folder:

```bash
cd server
```

2. Create `.env` file with your connection string:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://sambhavsahu5_db_user:YOUR_PASSWORD@cultureconnect1.pusdh1i.mongodb.net/culture-connect?retryWrites=true&w=majority
JWT_SECRET=your_temporary_secret_for_testing
ALLOWED_ORIGINS=http://localhost:5173
```

3. Test the connection:

```bash
# From the root directory
node test-mongodb.js
```

You should see: `✅ SUCCESS: MongoDB Connected!`

### Option B: Test by starting the server

1. Make sure your `.env` file is set up (see above)
2. Start the backend server:

```bash
cd server
npm install
npm run dev
```

3. Look for this message:
   ```
   ✅ MongoDB Connected: cultureconnect1.pusdh1i.mongodb.net
   ✅ Database: culture-connect
   ```

---

## Step 4: Generate JWT Secret

You need a secure JWT secret for authentication. Run this command:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

This will output something like:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

Copy this and use it as your `JWT_SECRET` in the `.env` file.

---

## Step 5: Complete .env File

Your `server/.env` file should look like this:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
HOST=localhost

# Database - Replace YOUR_PASSWORD with your actual password
MONGODB_URI=mongodb+srv://sambhavsahu5_db_user:YOUR_PASSWORD@cultureconnect1.pusdh1i.mongodb.net/culture-connect?retryWrites=true&w=majority

# JWT Secret - Use the one you generated
JWT_SECRET=your_generated_jwt_secret_here

# CORS - Allow localhost for development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## Step 6: Test Everything Works

1. Start the backend:

```bash
cd server
npm run dev
```

2. In another terminal, start the frontend:

```bash
npm run dev
```

3. Open http://localhost:5173
4. Try to register a new account
5. Check if data is saved in MongoDB Atlas

---

## Step 7: Verify in MongoDB Atlas

1. Go to MongoDB Atlas dashboard
2. Click "Browse Collections"
3. You should see your database `culture-connect`
4. After registering a user, you should see a `users` collection
5. Click on it to see your registered users

---

## Common Issues

### Issue 1: "Authentication failed"
**Solution:** 
- Check if your password is correct
- Make sure there are no special characters that need URL encoding
- Try resetting the database user password in MongoDB Atlas

### Issue 2: "IP not whitelisted"
**Solution:**
- Go to Network Access in MongoDB Atlas
- Add your IP address or `0.0.0.0/0` for testing

### Issue 3: "Connection timeout"
**Solution:**
- Check your internet connection
- Verify the connection string is correct
- Make sure MongoDB Atlas cluster is running (not paused)

### Issue 4: "Database name not found"
**Solution:**
- MongoDB Atlas creates the database automatically when you first write to it
- Just make sure the database name in the connection string is what you want (e.g., `culture-connect`)

---

## Next Steps

Once your MongoDB connection is working locally:

1. ✅ Test registration and login
2. ✅ Verify data is being saved
3. ✅ Proceed to deployment (Railway/Render for backend)
4. ✅ Use the same connection string in production

---

## Security Notes

⚠️ **Important for Production:**
- Never commit `.env` files to Git
- Use strong passwords for database users
- Restrict IP whitelist in MongoDB Atlas
- Use environment variables in deployment platforms
- Rotate JWT secrets regularly

---

## Ready for Deployment?

Once your local MongoDB connection works, you're ready to deploy!

Follow the `DEPLOYMENT_QUICKSTART.md` guide and use the same connection string when setting up your backend on Railway/Render.

Good luck! 🚀

