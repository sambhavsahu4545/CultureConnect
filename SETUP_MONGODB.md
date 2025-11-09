# 🎯 Quick Setup - MongoDB Atlas Connection

## Your MongoDB Atlas Details

**Connection String Template:**
```
mongodb+srv://sambhavsahu5_db_user:<db_password>@cultureconnect1.pusdh1i.mongodb.net/
```

**Cluster:** cultureconnect1.pusdh1i.mongodb.net  
**Username:** sambhavsahu5_db_user

---

## ✅ What to Do Next:

### Step 1: Get Your Database Password

1. Go to MongoDB Atlas dashboard
2. Click "Database Access" (left sidebar)
3. Find your user: `sambhavsahu5_db_user`
4. If you forgot the password, click "Edit" → "Edit Password" → Set a new password
5. **Copy/Remember this password!**

### Step 2: Complete Your Connection String

Replace `<db_password>` with your actual password:

```
mongodb+srv://sambhavsahu5_db_user:YOUR_ACTUAL_PASSWORD@cultureconnect1.pusdh1i.mongodb.net/culture-connect?retryWrites=true&w=majority
```

**Example (if your password was "MyPassword123"):**
```
mongodb+srv://sambhavsahu5_db_user:MyPassword123@cultureconnect1.pusdh1i.mongodb.net/culture-connect?retryWrites=true&w=majority
```

⚠️ **Important:** 
- Replace `YOUR_ACTUAL_PASSWORD` with your real password
- The database name `culture-connect` will be created automatically
- Make sure there are no spaces in the connection string

### Step 3: Configure IP Whitelist

1. Go to MongoDB Atlas dashboard
2. Click "Network Access" (left sidebar)
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (or add `0.0.0.0/0`)
5. Click "Confirm"

This allows your app to connect from anywhere (needed for deployment).

### Step 4: Create .env File

1. Go to the `server` folder
2. Create a new file named `.env`
3. Add this content (replace `YOUR_PASSWORD` and `YOUR_JWT_SECRET`):

```env
NODE_ENV=development
PORT=5000
HOST=localhost

# MongoDB Connection - Replace YOUR_PASSWORD with your actual password
MONGODB_URI=mongodb+srv://sambhavsahu5_db_user:YOUR_PASSWORD@cultureconnect1.pusdh1i.mongodb.net/culture-connect?retryWrites=true&w=majority

# JWT Secret (use the one generated for you)
JWT_SECRET=89876629a65e975e1ad8e1250c6d02e69d97dcb5ec047d08742f92a97076f46a

# CORS - Allow localhost for development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Step 5: Test the Connection

1. Open terminal in the root directory
2. Run:

```bash
node test-mongodb.js
```

3. You should see:
   ```
   ✅ SUCCESS: MongoDB Connected!
   ✅ Database: culture-connect
   ```

### Step 6: Start Your Servers

1. **Start Backend:**
```bash
cd server
npm install
npm run dev
```

2. **Start Frontend (in another terminal):**
```bash
npm run dev
```

3. **Test:**
   - Open http://localhost:5173
   - Try registering a new account
   - Check MongoDB Atlas → Browse Collections → You should see `users` collection

---

## 🔒 Security Notes

1. **Never share your password** - Keep it secret!
2. **Never commit `.env` file** - It's already in `.gitignore`
3. **Use strong passwords** - For database users
4. **Restrict IPs in production** - Don't use `0.0.0.0/0` forever

---

## 🚀 Ready for Deployment?

Once your local connection works:

1. Use the **same connection string** when deploying to Railway/Render
2. Add it as an environment variable: `MONGODB_URI`
3. Keep your JWT secret the same or generate a new one for production

---

## ❓ Troubleshooting

### "Authentication failed"
- Check your password is correct
- Make sure no special characters need URL encoding
- Try resetting password in MongoDB Atlas

### "IP not whitelisted"
- Go to Network Access in MongoDB Atlas
- Add `0.0.0.0/0` for testing

### "Connection timeout"
- Check internet connection
- Verify connection string format
- Make sure cluster is not paused

---

## 📝 Quick Reference

**Your Connection String:**
```
mongodb+srv://sambhavsahu5_db_user:PASSWORD@cultureconnect1.pusdh1i.mongodb.net/culture-connect?retryWrites=true&w=majority
```

**Your JWT Secret:**
```
89876629a65e975e1ad8e1250c6d02e69d97dcb5ec047d08742f92a97076f46a
```

**Database Name:** `culture-connect` (will be created automatically)

---

## ✅ Checklist

- [ ] Got database password from MongoDB Atlas
- [ ] Completed connection string with password
- [ ] Added IP to whitelist (0.0.0.0/0)
- [ ] Created `.env` file in `server` folder
- [ ] Tested connection with `test-mongodb.js`
- [ ] Started backend server successfully
- [ ] Started frontend server successfully
- [ ] Tested user registration
- [ ] Verified data in MongoDB Atlas

---

**Once all checkboxes are done, you're ready to deploy!** 🎉

Follow `DEPLOYMENT_QUICKSTART.md` for deployment steps.

