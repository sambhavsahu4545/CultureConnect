# Port Configuration

This project is configured to always use consistent ports:

## Backend Server
- **Port:** `5000` (fixed)
- **URL:** `http://localhost:5000`
- **API Base:** `http://localhost:5000/api`
- **Configuration:** Set in `server/.env` file (`PORT=5000`)

## Frontend Server
- **Port:** `5173` (fixed)
- **URL:** `http://localhost:5173`
- **Configuration:** Set in `vite.config.js` and `dynamic/vite.config.js`

## Starting the Servers

### Start Backend Only:
```powershell
cd server
npm run dev
```

### Start Frontend Only:
```powershell
npm run dev
```

### Start Both Servers:
Use the provided PowerShell script:
```powershell
.\start-servers.ps1
```

Or manually start in two separate terminals:
1. Terminal 1: `cd server && npm run dev`
2. Terminal 2: `npm run dev`

## Port Configuration Files

### Backend (`server/.env`):
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/culture-connect
JWT_SECRET=culture-connect-super-secret-jwt-key-2024
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env` in root):
```
VITE_API_URL=http://localhost:5000/api
```

## Important Notes

- The backend **always** runs on port `5000`
- The frontend **always** runs on port `5173`
- Both ports are configured with `strictPort: true` to prevent conflicts
- If a port is already in use, the server will exit with an error message
- Make sure MongoDB is running if using local MongoDB (port 27017)

## Troubleshooting

If you get a "port already in use" error:
1. Check what's using the port: `netstat -ano | findstr :5000` (or `:5173`)
2. Stop the process using that port
3. Restart the server

