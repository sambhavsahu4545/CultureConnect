# Backend Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env` (if not already created)
   - Update the following variables in `.env`:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/culture-connect
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     FRONTEND_URL=http://localhost:5173
     ```

3. **Start MongoDB:**
   - If using local MongoDB, make sure MongoDB is running
   - If using MongoDB Atlas, update `MONGODB_URI` with your connection string

4. **Run the backend server:**
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Send OTP for password reset
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user (requires authentication)

### Profile
- `GET /api/profile` - Get user profile (requires authentication)
- `PUT /api/profile` - Update user profile (requires authentication)
- `PUT /api/profile/password` - Update password (requires authentication)

## Frontend Configuration

Make sure to set the API URL in your frontend environment:
- Create a `.env` file in the root directory
- Add: `VITE_API_URL=http://localhost:5000/api`

## Database Schema

The User model includes:
- Basic info: name, email, mobile, password
- Profile: profilePicture, dateOfBirth, gender, address
- Preferences: language, currency, theme, notifications
- Travel preferences: defaultSearchLocation, preferredAirline, seatPreference, etc.
- Authentication: OTP for password reset, email/mobile verification

## Development Notes

- In development mode, OTP is logged to console for testing
- JWT tokens expire in 7 days (configurable via JWT_EXPIRE)
- Passwords are hashed using bcryptjs
- All routes are protected except registration and login

