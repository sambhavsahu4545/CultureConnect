# Deployment Guide - Culture Connect

## 🚀 Deployment Readiness Checklist

### ✅ What's Ready:
- ✅ Backend API with security middleware
- ✅ Frontend React app with Vite
- ✅ MongoDB database integration
- ✅ Authentication system
- ✅ Environment variable support
- ✅ CORS configuration
- ✅ API rate limiting
- ✅ Security headers (Helmet)

### ⚠️ What Needs Configuration:
- ⚠️ Production environment variables
- ⚠️ MongoDB Atlas (cloud database)
- ⚠️ Build scripts
- ⚠️ CORS allowed origins
- ⚠️ API URL configuration

---

## 📍 Deployment Platforms

### Recommended Options:

#### **Option 1: Vercel (Frontend) + Railway/Render (Backend) - EASIEST** ⭐
- **Frontend**: Vercel (free, automatic deployments)
- **Backend**: Railway or Render (free tier available)
- **Database**: MongoDB Atlas (free tier)

#### **Option 2: Netlify (Frontend) + Heroku (Backend)**
- **Frontend**: Netlify (free)
- **Backend**: Heroku (paid, but reliable)
- **Database**: MongoDB Atlas

#### **Option 3: Full AWS Deployment**
- **Frontend**: AWS S3 + CloudFront
- **Backend**: AWS EC2 or Elastic Beanstalk
- **Database**: MongoDB Atlas or AWS DocumentDB

#### **Option 4: DigitalOcean**
- **Frontend + Backend**: DigitalOcean App Platform
- **Database**: MongoDB Atlas or DigitalOcean Managed MongoDB

---

## 🎯 Step-by-Step Deployment Guide

### Step 1: Set Up MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (FREE tier)
4. Create a database user
5. Get your connection string
6. Add your IP address to whitelist (or use `0.0.0.0/0` for all IPs - less secure)

**Connection string format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/culture-connect?retryWrites=true&w=majority
```

---

### Step 2: Deploy Backend (Railway/Render)

#### **Option A: Railway** (Recommended)

1. Go to [Railway](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_random_secret_key
   ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
   ```
6. Railway will automatically detect it's a Node.js app
7. Set root directory to `server`
8. Deploy!

**Railway will give you a URL like:** `https://your-app.railway.app`

#### **Option B: Render**

1. Go to [Render](https://render.com/)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: culture-connect-backend
   - **Root Directory**: server
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables (same as Railway)
7. Deploy!

**Render will give you a URL like:** `https://your-app.onrender.com`

---

### Step 3: Deploy Frontend (Vercel)

1. Go to [Vercel](https://vercel.com/)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `dynamic`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
7. Deploy!

**Vercel will give you a URL like:** `https://your-app.vercel.app`

---

### Step 4: Update CORS Settings

After deploying, update your backend environment variables:

```env
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://www.yourdomain.com
```

---

## 📝 Environment Variables

### Backend (.env in server folder)

```env
# Server Configuration
NODE_ENV=production
PORT=5000
HOST=0.0.0.0

# Database
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/culture-connect?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# CORS - Add your frontend URL here (comma-separated for multiple)
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://www.yourdomain.com

# Email (Optional - for OTP emails)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourdomain.com

# SMS (Optional - for OTP SMS via Twilio)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
```

### Frontend (in Vercel/Netlify dashboard)

```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

---

## 🔧 Build Scripts

### Frontend Build

```bash
cd dynamic
npm install
npm run build
```

This creates a `dist` folder with production-ready files.

### Backend Start

```bash
cd server
npm install
npm start
```

---

## 🧪 Testing Deployment

1. **Test Backend:**
   - Visit: `https://your-backend-url.railway.app/api/health`
   - Should return: `{ "success": true, "message": "Server is running" }`

2. **Test Frontend:**
   - Visit: `https://your-frontend.vercel.app`
   - Should load the app
   - Try logging in/registering

3. **Test API Connection:**
   - Open browser console on frontend
   - Check if API calls are working
   - Look for CORS errors

---

## 🐛 Common Issues

### Issue 1: CORS Errors
**Solution:** Make sure `ALLOWED_ORIGINS` in backend includes your frontend URL exactly (including https://)

### Issue 2: MongoDB Connection Failed
**Solution:** 
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check if database user has correct permissions

### Issue 3: Environment Variables Not Working
**Solution:**
- Restart the server after adding env vars
- Check variable names are correct
- In Vercel, make sure to redeploy after adding env vars

### Issue 4: Build Fails
**Solution:**
- Check Node.js version (should be 18+)
- Run `npm install` locally first to check for errors
- Check build logs in deployment platform

---

## 🚀 Quick Deploy Commands

### Local Testing (Production Build)

```bash
# Backend
cd server
npm install
NODE_ENV=production npm start

# Frontend
cd dynamic
npm install
npm run build
# Serve the dist folder with any static server
npx serve dist
```

---

## 📊 Monitoring & Maintenance

### Recommended Tools:
- **Uptime Monitoring**: UptimeRobot (free)
- **Error Tracking**: Sentry (free tier)
- **Analytics**: Google Analytics
- **Logs**: Check your deployment platform's logs

### Regular Tasks:
- Update dependencies monthly
- Monitor error logs
- Check MongoDB Atlas usage
- Backup database regularly

---

## 🔒 Security Checklist

- [ ] Use strong JWT_SECRET (random 32+ characters)
- [ ] Enable HTTPS (automatic on Vercel/Railway)
- [ ] Set proper CORS origins (don't use wildcard)
- [ ] Use MongoDB Atlas IP whitelist
- [ ] Enable rate limiting (already done)
- [ ] Keep dependencies updated
- [ ] Use environment variables (never commit secrets)

---

## 💰 Cost Estimation

### Free Tier:
- **Vercel**: Free (unlimited deployments)
- **Railway**: $5/month free credit
- **MongoDB Atlas**: Free (512MB storage)
- **Total**: ~$0-5/month

### Paid Tier (if needed):
- **Railway**: $5-20/month (based on usage)
- **MongoDB Atlas**: $9/month (M0 cluster)
- **Domain**: $10-15/year
- **Total**: ~$15-35/month

---

## 📞 Support

If you encounter issues:
1. Check deployment platform logs
2. Check browser console for errors
3. Verify environment variables
4. Test API endpoints with Postman
5. Check MongoDB Atlas connection

---

## 🎉 Next Steps After Deployment

1. Set up a custom domain
2. Configure SSL certificates (automatic on most platforms)
3. Set up monitoring
4. Create admin user
5. Test all features
6. Set up backups
7. Configure email/SMS for OTP (optional)

