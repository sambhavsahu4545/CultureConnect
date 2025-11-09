// Main server file - this is where everything starts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import testRoutes from './routes/testRoutes.js';
import {
    apiLimiter,
    authLimiter,
    otpLimiter,
    passwordResetLimiter,
    sanitizeInput,
    preventHPP,
    securityLogger,
    requestIdGenerator,
    corsOptions,
} from './middleware/security.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Create Express app instance
const app = express();

// ==================== SECURITY SETUP ====================
// These middlewares run before all routes to keep the app secure

// Helmet adds security headers to prevent common attacks
// We disable crossOriginEmbedderPolicy so maps can work properly
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false, // Needed for map iframes
}));

// CORS allows frontend to talk to backend from different origins
app.use(cors(corsOptions));

// Give each request a unique ID so we can track errors easily
app.use(requestIdGenerator);

// Parse JSON bodies, but limit size to 10mb to prevent DoS attacks
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Clean user input to prevent NoSQL injection (removes $ and . operators)
app.use(sanitizeInput);

// Prevent duplicate query parameters from causing issues
app.use(preventHPP);

// Log suspicious activities like failed logins
app.use(securityLogger);

// Limit how many requests each IP can make (prevents brute force attacks)
app.use('/api/', apiLimiter);

// ==================== ROUTES ====================
// All our API endpoints are defined in separate route files

// Auth routes - login, register, password reset, etc.
// Rate limiting is handled inside the route file for stricter limits
app.use('/api/auth', authRoutes);

// User profile management
app.use('/api/profile', profileRoutes);

// User permissions - location, contact, camera access, etc.
app.use('/api/permissions', permissionRoutes);

// Location services - get current location, search places, etc.
app.use('/api/location', locationRoutes);

// Bookings - flights, hotels, trains, etc.
app.use('/api/bookings', bookingRoutes);

// Notifications - user notifications
app.use('/api/notifications', notificationRoutes);

// Admin routes - only admins can access these
app.use('/api/admin', adminRoutes);

// Test routes - for checking if MongoDB is connected
app.use('/api/test', testRoutes);

// Simple health check endpoint to see if server is alive
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// Catch any errors that happen in routes
// We don't want to expose error details in production (security)
app.use((err, req, res, next) => {
    // Log the full error with request ID for debugging
    console.error(`[ERROR] ${req.requestId} - ${err.stack}`);
    
    // In development, show the actual error. In production, show generic message
    const errorMessage = process.env.NODE_ENV === 'development' 
        ? err.message 
        : 'An error occurred. Please try again later.';
    
    res.status(err.status || 500).json({
        success: false,
        message: errorMessage,
        requestId: req.requestId, // User can give us this ID for support
    });
});

// If no route matches, return 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Start the server on the configured port
const PORT = process.env.PORT || 5000;
// In production, bind to 0.0.0.0 to accept connections from any IP (required for cloud deployment)
// In development, use localhost for security
const HOST = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost');

app.listen(PORT, HOST, () => {
    console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`✅ Backend API: http://${HOST}:${PORT}`);
    console.log(`✅ Health check: http://${HOST}:${PORT}/api/health`);
});

