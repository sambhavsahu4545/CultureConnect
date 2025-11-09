# 🚀 Deployment Checklist

Use this checklist to ensure your application is ready for deployment.

## 📋 Pre-Deployment Checklist

### ✅ 1. Environment Variables Setup

#### Backend (Railway/Render)
- [ ] **MONGODB_URI** - MongoDB Atlas connection string
- [ ] **JWT_SECRET** - Secure random 32+ character string (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] **NODE_ENV** - Set to `production`
- [ ] **ALLOWED_ORIGINS** - Your frontend URL(s), comma-separated
- [ ] **PORT** - Usually set automatically by platform (optional)
- [ ] **GOOGLE_MAPS_API_KEY** - Optional, for location services
- [ ] **SMTP_*** - Optional, for email OTP
- [ ] **TWILIO_*** - Optional, for SMS OTP

#### Frontend (Vercel)
- [ ] **VITE_API_URL** - Your backend API URL (e.g., `https://your-app.railway.app/api`)

### ✅ 2. MongoDB Atlas Setup

- [ ] Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create a free cluster
- [ ] Create a database user
- [ ] Get connection string
- [ ] Add IP `0.0.0.0/0` to network access (for cloud deployment)
- [ ] Test connection locally

### ✅ 3. Code Preparation

- [ ] All environment variables in `.env.example` files
- [ ] `.env` files are in `.gitignore`
- [ ] No hardcoded secrets or API keys in code
- [ ] All dependencies listed in `package.json`
- [ ] Build commands work locally
- [ ] No console errors in browser

### ✅ 4. Testing

- [ ] Test backend API locally
- [ ] Test frontend build locally (`npm run build` in dynamic folder)
- [ ] Test API endpoints with Postman/curl
- [ ] Test authentication flow
- [ ] Test booking functionality
- [ ] Test error handling

### ✅ 5. Security

- [ ] JWT_SECRET is strong and unique
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled
- [ ] Input validation is working
- [ ] Password requirements are enforced
- [ ] HTTPS is enabled (automatic on Vercel/Railway)

### ✅ 6. Documentation

- [ ] README is updated
- [ ] Deployment guide is reviewed
- [ ] Environment variables are documented
- [ ] API endpoints are documented

## 🚀 Deployment Steps

### Step 1: Deploy Backend (Railway)

1. [ ] Go to https://railway.app
2. [ ] Sign up with GitHub
3. [ ] Create new project
4. [ ] Deploy from GitHub repository
5. [ ] Set root directory to `server`
6. [ ] Add environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=your_connection_string`
   - `JWT_SECRET=your_secret`
   - `ALLOWED_ORIGINS=https://your-frontend.vercel.app`
7. [ ] Deploy and get backend URL

### Step 2: Deploy Frontend (Vercel)

1. [ ] Go to https://vercel.com
2. [ ] Sign up with GitHub
3. [ ] Import repository
4. [ ] Set root directory to `dynamic`
5. [ ] Add environment variable:
   - `VITE_API_URL=https://your-backend.railway.app/api`
6. [ ] Deploy and get frontend URL

### Step 3: Update CORS

1. [ ] Go back to Railway backend settings
2. [ ] Update `ALLOWED_ORIGINS` with your Vercel frontend URL
3. [ ] Redeploy backend

### Step 4: Test Deployment

1. [ ] Visit frontend URL
2. [ ] Test user registration
3. [ ] Test user login
4. [ ] Test API connectivity
5. [ ] Test all major features
6. [ ] Check browser console for errors
7. [ ] Check backend logs for errors

## 🔍 Post-Deployment Verification

### Backend Health Check
- [ ] Visit `https://your-backend.railway.app/api/health`
- [ ] Should return: `{ "success": true, "message": "Server is running" }`

### Frontend
- [ ] Frontend loads without errors
- [ ] API calls work correctly
- [ ] Authentication works
- [ ] No CORS errors in console

### Database
- [ ] MongoDB connection is active
- [ ] Users can be created
- [ ] Data persists correctly

## 🐛 Troubleshooting

### Backend Issues
- [ ] Check Railway logs for errors
- [ ] Verify MongoDB connection string
- [ ] Verify environment variables are set
- [ ] Check if port is configured correctly

### Frontend Issues
- [ ] Check Vercel build logs
- [ ] Verify `VITE_API_URL` is set correctly
- [ ] Check browser console for errors
- [ ] Verify CORS is configured in backend

### Database Issues
- [ ] Verify MongoDB Atlas IP whitelist
- [ ] Check database user permissions
- [ ] Verify connection string format
- [ ] Test connection from local machine

## 📝 Notes

- Keep your `.env` files secure and never commit them
- Update `ALLOWED_ORIGINS` when deploying to new domains
- Monitor your MongoDB Atlas usage (free tier has limits)
- Set up monitoring and alerts for production
- Regular backups of database (MongoDB Atlas has automatic backups)

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Frontend is accessible and loads correctly
- ✅ Backend API responds to requests
- ✅ Users can register and login
- ✅ Database connections work
- ✅ No critical errors in logs
- ✅ CORS is configured correctly

---

**Need Help?** Check the deployment guides:
- `DEPLOYMENT_QUICKSTART.md` - Fast 15-minute deployment
- `DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `DEPLOYMENT_READINESS.md` - Readiness status

