# 🚀 Quick Deployment Guide

## Fastest Way to Deploy (15 minutes)

### 1. Set Up MongoDB Atlas (5 min)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create cluster (FREE tier)
4. Create database user
5. Get connection string
6. Add IP `0.0.0.0/0` to whitelist (for testing)

### 2. Deploy Backend to Railway (5 min)
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repo
5. Set root directory to `server`
6. Add environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=generate_random_32_char_string
   ```
7. Deploy!

**Backend URL:** `https://your-app.railway.app`

### 3. Deploy Frontend to Vercel (5 min)
1. Go to https://vercel.com
2. Sign up with GitHub
3. New Project → Import repo
4. Set root directory to `dynamic`
5. Add environment variable:
   ```
   VITE_API_URL=https://your-app.railway.app/api
   ```
6. Deploy!

**Frontend URL:** `https://your-app.vercel.app`

### 4. Update CORS (2 min)
1. Go back to Railway
2. Add environment variable:
   ```
   ALLOWED_ORIGINS=https://your-app.vercel.app
   ```
3. Redeploy backend

### ✅ Done! Your app is live!

---

## Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

---

## Test Your Deployment

1. Visit your frontend URL
2. Try registering a new account
3. Try logging in
4. Check if everything works!

---

## Troubleshooting

### Backend not working?
- Check Railway logs
- Verify MongoDB connection string
- Check environment variables

### Frontend can't connect to backend?
- Check CORS settings in backend
- Verify `VITE_API_URL` in Vercel
- Check browser console for errors

### MongoDB connection failed?
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Make sure database user has correct permissions

---

## Need Help?

Check the full deployment guide in `DEPLOYMENT_GUIDE.md`

