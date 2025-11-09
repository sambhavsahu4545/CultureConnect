# Setup Instructions for MongoDB and Starting the Site

## Step 1: Install MongoDB (if not already installed)

### Option A: Local MongoDB Installation
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install it and make sure MongoDB service is running
3. Default connection: `mongodb://localhost:27017`

### Option B: MongoDB Atlas (Cloud - Recommended for beginners)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/culture-connect`)

## Step 2: Create Environment Files

### Create `server/.env` file:
```env
PORT=5000
NODE_ENV=development

# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/culture-connect

# OR for MongoDB Atlas (replace with your connection string):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/culture-connect

JWT_SECRET=culture-connect-super-secret-jwt-key-2024
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Create `.env` file in root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Start MongoDB (if using local)

### Windows:
```powershell
# Check if MongoDB is running
Get-Service MongoDB

# If not running, start it:
net start MongoDB
```

### Or start MongoDB manually:
```powershell
mongod
```

## Step 4: Start the Backend Server

Open a terminal and run:
```powershell
cd server
npm install  # If not already done
npm run dev
```

You should see:
- "MongoDB Connected: ..."
- "Server running in development mode on port 5000"

## Step 5: Start the Frontend

Open another terminal and run:
```powershell
npm run dev
```

The frontend will start on http://localhost:5173

## Troubleshooting

### MongoDB Connection Error:
- Make sure MongoDB is running (for local) or connection string is correct (for Atlas)
- Check firewall settings
- Verify the connection string in `server/.env`

### Port Already in Use:
- Change PORT in `server/.env` to a different port (e.g., 5001)
- Update `VITE_API_URL` in root `.env` to match

### CORS Error:
- Make sure `FRONTEND_URL` in `server/.env` matches your frontend URL
- Default is `http://localhost:5173`

