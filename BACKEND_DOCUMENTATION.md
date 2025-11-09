# Backend Documentation

This document provides comprehensive documentation for all backend features, APIs, models, and services.

## Table of Contents

1. [Overview](#overview)
2. [API Endpoints](#api-endpoints)
3. [Models](#models)
4. [Services](#services)
5. [Authentication & Authorization](#authentication--authorization)
6. [Permissions System](#permissions-system)
7. [Location Services](#location-services)
8. [Booking System](#booking-system)
9. [Notifications](#notifications)
10. [OTP Service](#otp-service)
11. [Environment Variables](#environment-variables)
12. [Deployment](#deployment)

## Overview

The backend is built with Node.js, Express.js, and MongoDB. It provides RESTful APIs for:
- User authentication and authorization
- User profile management
- Permissions management (location, contact, camera, etc.)
- Location services and mapping
- Booking management (flights, hotels, trains, etc.)
- Notifications system
- OTP (One-Time Password) service

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
- **POST** `/api/auth/register`
- **Description**: Register a new user
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "password": "password123",
    "gender": "male",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "zipCode": "10001"
    }
  }
  ```
- **Response**: Returns user data and JWT token

#### Login
- **POST** `/api/auth/login`
- **Description**: Login user
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns user data and JWT token

#### Forgot Password
- **POST** `/api/auth/forgot-password`
- **Description**: Send OTP for password reset
- **Body**:
  ```json
  {
    "contact": "john@example.com",
    "contactType": "email"
  }
  ```
- **Response**: Returns success message (OTP returned in development mode)

#### Verify OTP
- **POST** `/api/auth/verify-otp`
- **Description**: Verify OTP code
- **Body**:
  ```json
  {
    "contact": "john@example.com",
    "contactType": "email",
    "otp": "123456"
  }
  ```
- **Response**: Returns success message

#### Reset Password
- **POST** `/api/auth/reset-password`
- **Description**: Reset password after OTP verification
- **Body**:
  ```json
  {
    "contact": "john@example.com",
    "contactType": "email",
    "newPassword": "newpassword123"
  }
  ```
- **Response**: Returns user data and JWT token

#### Get Current User
- **GET** `/api/auth/me`
- **Description**: Get current authenticated user
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns user data

### Profile Routes (`/api/profile`)

#### Get Profile
- **GET** `/api/profile`
- **Description**: Get user profile
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns user profile data

#### Update Profile
- **PUT** `/api/profile`
- **Description**: Update user profile
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Partial user data
- **Response**: Returns updated user profile

#### Update Password
- **PUT** `/api/profile/password`
- **Description**: Update user password
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "currentPassword": "oldpassword",
    "newPassword": "newpassword123"
  }
  ```
- **Response**: Returns success message

### Permission Routes (`/api/permissions`)

#### Get Permissions
- **GET** `/api/permissions`
- **Description**: Get user permissions
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns all user permissions

#### Update Location Permission
- **PUT** `/api/permissions/location`
- **Description**: Update location permission and location data
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "enabled": true,
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "New Delhi",
    "city": "Delhi",
    "state": "Delhi",
    "country": "India",
    "zipCode": "110001"
  }
  ```
- **Response**: Returns updated location permission

#### Update Contact Permission
- **PUT** `/api/permissions/contact`
- **Description**: Update contact permission
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "enabled": true,
    "shareWithPartners": false
  }
  ```
- **Response**: Returns updated contact permission

#### Update Camera Permission
- **PUT** `/api/permissions/camera`
- **Description**: Update camera permission
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "enabled": true
  }
  ```
- **Response**: Returns updated camera permission

#### Update Notification Preferences
- **PUT** `/api/permissions/notifications`
- **Description**: Update notification preferences
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "push": { "enabled": true },
    "email": { "enabled": true },
    "sms": { "enabled": false }
  }
  ```
- **Response**: Returns updated notification preferences

#### Update Storage Permission
- **PUT** `/api/permissions/storage`
- **Description**: Update storage permission
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "enabled": true
  }
  ```
- **Response**: Returns updated storage permission

#### Update Analytics Permission
- **PUT** `/api/permissions/analytics`
- **Description**: Update analytics permission
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "enabled": false
  }
  ```
- **Response**: Returns updated analytics permission

### Location Routes (`/api/location`)

#### Get Current Location
- **GET** `/api/location/current`
- **Description**: Get user's current location
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns current location data

#### Update Location
- **POST** `/api/location/update`
- **Description**: Update user's location
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "New Delhi",
    "city": "Delhi",
    "state": "Delhi",
    "country": "India",
    "zipCode": "110001"
  }
  ```
- **Response**: Returns updated location data

#### Reverse Geocode
- **POST** `/api/location/reverse-geocode`
- **Description**: Convert coordinates to address (mock implementation)
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "latitude": 28.6139,
    "longitude": 77.2090
  }
  ```
- **Response**: Returns address data
- **Note**: Currently returns mock data. Integrate with Google Maps API or similar in production.

#### Search Locations
- **GET** `/api/location/search?query=delhi`
- **Description**: Search for locations (mock implementation)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns search results
- **Note**: Currently returns mock data. Integrate with Google Places API or similar in production.

### Booking Routes (`/api/bookings`)

#### Create Booking
- **POST** `/api/bookings`
- **Description**: Create a new booking
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Booking data (varies by type)
- **Response**: Returns created booking

#### Get Bookings
- **GET** `/api/bookings?type=flight&status=confirmed&page=1&limit=10`
- **Description**: Get all bookings for the user
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `type`: Booking type (flight, hotel, train, car-rental, tour-package, cruise)
  - `status`: Booking status (pending, confirmed, cancelled, completed, refunded)
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
- **Response**: Returns list of bookings with pagination

#### Get Booking by ID
- **GET** `/api/bookings/:id`
- **Description**: Get booking details by ID
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns booking details

#### Cancel Booking
- **PUT** `/api/bookings/:id/cancel`
- **Description**: Cancel a booking
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "reason": "Change of plans"
  }
  ```
- **Response**: Returns cancelled booking

#### Update Payment Status
- **PUT** `/api/bookings/:id/payment`
- **Description**: Update payment status for a booking
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "status": "completed",
    "method": "credit-card",
    "transactionId": "txn_123456"
  }
  ```
- **Response**: Returns updated booking

### Notification Routes (`/api/notifications`)

#### Get Notifications
- **GET** `/api/notifications?read=false&type=booking-confirmation&page=1&limit=20`
- **Description**: Get all notifications for the user
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `read`: Filter by read status (true/false)
  - `type`: Filter by notification type
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)
- **Response**: Returns list of notifications with pagination and unread count

#### Get Unread Count
- **GET** `/api/notifications/unread-count`
- **Description**: Get unread notifications count
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns unread count

#### Mark Notification as Read
- **PUT** `/api/notifications/:id/read`
- **Description**: Mark a notification as read
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns updated notification

#### Mark All Notifications as Read
- **PUT** `/api/notifications/read-all`
- **Description**: Mark all notifications as read
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns success message and updated count

#### Delete Notification
- **DELETE** `/api/notifications/:id`
- **Description**: Delete a notification
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns success message

## Models

### User Model

Stores user account information, profile data, and preferences.

**Fields**:
- `name`: String (required)
- `email`: String (required, unique)
- `mobile`: String (required, unique)
- `password`: String (required, hashed)
- `profilePicture`: String
- `dateOfBirth`: Date
- `gender`: String (enum: male, female, other, '')
- `address`: Object (street, city, state, country, zipCode)
- `preferences`: Object (language, currency, theme, notifications)
- `travelPreferences`: Object (defaultSearchLocation, preferredAirline, etc.)
- `otp`: Object (code, expiresAt)
- `isEmailVerified`: Boolean
- `isMobileVerified`: Boolean
- `resetPasswordToken`: String
- `resetPasswordExpire`: Date
- `createdAt`: Date
- `updatedAt`: Date

### Permission Model

Stores user permissions and consent for various features.

**Fields**:
- `user`: ObjectId (reference to User)
- `location`: Object (enabled, lastKnownLocation, grantedAt)
- `contact`: Object (enabled, shareWithPartners, grantedAt)
- `camera`: Object (enabled, grantedAt)
- `notifications`: Object (push, email, sms)
- `storage`: Object (enabled, grantedAt)
- `analytics`: Object (enabled, grantedAt)
- `createdAt`: Date
- `updatedAt`: Date

### Booking Model

Stores all user bookings including flights, hotels, trains, etc.

**Fields**:
- `user`: ObjectId (reference to User)
- `type`: String (enum: flight, hotel, train, car-rental, tour-package, cruise)
- `status`: String (enum: pending, confirmed, cancelled, completed, refunded)
- `bookingReference`: String (unique)
- `bookingDetails`: Object (varies by type)
- `pricing`: Object (basePrice, taxes, fees, discount, totalPrice, currency)
- `payment`: Object (method, transactionId, paidAt, status)
- `cancellation`: Object (cancelledAt, cancellationReason, refundAmount, refundStatus)
- `notes`: String
- `createdAt`: Date
- `updatedAt`: Date

### Notification Model

Stores all notifications for users.

**Fields**:
- `user`: ObjectId (reference to User)
- `type`: String (enum: booking-confirmation, booking-cancelled, etc.)
- `title`: String
- `message`: String
- `data`: Object (additional information)
- `read`: Boolean
- `readAt`: Date
- `priority`: String (enum: low, medium, high, urgent)
- `booking`: ObjectId (reference to Booking)
- `actionUrl`: String
- `expiresAt`: Date
- `createdAt`: Date
- `updatedAt`: Date

## Services

### OTP Service

Handles OTP generation, validation, and delivery.

**Functions**:
- `generateOTP()`: Generate a random 6-digit OTP
- `getOTPExpiration(minutes)`: Calculate OTP expiration time
- `isOTPExpired(expiresAt)`: Check if OTP is expired
- `sendOTPEmail(email, otp, purpose)`: Send OTP via email (mock)
- `sendOTPSMS(mobile, otp, purpose)`: Send OTP via SMS (mock)
- `sendOTP(contact, contactType, otp, purpose)`: Send OTP via preferred method
- `verifyOTP(enteredOTP, storedOTP, expiresAt)`: Verify OTP code

**Note**: Currently uses mock implementations. Integrate with actual email/SMS services in production.

## Authentication & Authorization

### JWT Token

- Tokens are generated using JWT (JSON Web Tokens)
- Token expiration: 7 days (configurable via `JWT_EXPIRE` environment variable)
- Tokens are sent in the `Authorization` header: `Bearer <token>`

### Protected Routes

Routes that require authentication use the `protect` middleware:
```javascript
import { protect } from '../middleware/auth.js';
router.get('/profile', protect, async (req, res) => {
    // req.user contains the authenticated user
});
```

## Permissions System

The permissions system allows users to control access to:
- Location services
- Contact information sharing
- Camera access
- Notifications (push, email, SMS)
- Storage access
- Analytics tracking

Permissions are stored in the `Permission` model and can be updated via the `/api/permissions` endpoints.

## Location Services

Location services provide:
- Current location tracking
- Location updates
- Reverse geocoding (coordinates to address)
- Location search

**Note**: Currently uses mock implementations for geocoding and search. Integrate with Google Maps API, Mapbox, or similar in production.

## Booking System

The booking system supports:
- Multiple booking types (flights, hotels, trains, car rentals, tour packages, cruises)
- Booking status management
- Payment tracking
- Cancellation and refunds
- Booking references

## Notifications

The notification system provides:
- Multiple notification types
- Read/unread status
- Priority levels
- Expiration dates
- Action URLs
- Automatic notifications for bookings and payments

## OTP Service

The OTP service handles:
- OTP generation (6-digit codes)
- OTP expiration (10 minutes)
- OTP delivery via email or SMS
- OTP verification

**Production Integration**:
- Email: SendGrid, AWS SES, Nodemailer
- SMS: Twilio, AWS SNS, MessageBird

## Environment Variables

Required environment variables in `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/culture-connect
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173

# Optional: For production OTP services
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-password
# TWILIO_ACCOUNT_SID=your-twilio-sid
# TWILIO_AUTH_TOKEN=your-twilio-token
# TWILIO_PHONE_NUMBER=your-twilio-number
# GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## Deployment

### Production Checklist

1. **Environment Variables**:
   - Set `NODE_ENV=production`
   - Use strong `JWT_SECRET`
   - Configure production MongoDB URI
   - Set up OTP service (email/SMS)
   - Configure CORS for production domain

2. **Security**:
   - Use HTTPS
   - Enable rate limiting
   - Implement request validation
   - Use environment variables for secrets
   - Enable MongoDB authentication

3. **Performance**:
   - Enable compression
   - Use caching where appropriate
   - Optimize database queries
   - Use connection pooling

4. **Monitoring**:
   - Set up error logging
   - Monitor API performance
   - Track database performance
   - Set up alerts

5. **Integration**:
   - Integrate OTP service (email/SMS)
   - Integrate location services (Google Maps, Mapbox)
   - Integrate payment gateway
   - Set up email service for notifications

## API Response Format

All API responses follow this format:

**Success Response**:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response**:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error message (development only)"
}
```

## Error Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (permission denied)
- `404`: Not Found
- `500`: Internal Server Error

## Rate Limiting

Currently, rate limiting is not implemented. Consider implementing rate limiting in production using:
- `express-rate-limit`
- Redis for distributed rate limiting
- API gateway rate limiting

## CORS Configuration

CORS is configured to allow:
- All localhost origins (development)
- All origins (development - change in production)
- Credentials enabled
- Common HTTP methods
- Authorization header

**Production**: Update CORS configuration to allow only your frontend domain.

## Database Indexes

The following indexes are created for performance:
- User: `email`, `mobile`
- Permission: `user`
- Booking: `user`, `bookingReference`, `status`, `type`, `createdAt`
- Notification: `user`, `read`, `createdAt`, `expiresAt`

## Testing

### Test Endpoints

- **Health Check**: `GET /api/health`
- **MongoDB Test**: `GET /api/test/mongodb`

### Testing with cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","mobile":"1234567890","password":"test123","gender":"male","address":{"street":"123 St","city":"City","state":"State","country":"Country"}}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get profile (with token)
curl -X GET http://localhost:5000/api/profile \
  -H "Authorization: Bearer <token>"
```

## Support

For issues or questions:
1. Check the troubleshooting guide
2. Review the API documentation
3. Check server logs
4. Verify environment variables
5. Test with the health check endpoint

## License

This project is proprietary and confidential.

