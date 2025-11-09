// Security middleware - keeps our API safe from attacks
// This file has all the security stuff like rate limiting and input cleaning

import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

// Rate limiter for regular API calls
// Allows 100 requests per 15 minutes from each IP address
// Helps prevent DDoS attacks and API abuse
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Time window: 15 minutes
    max: 100, // Maximum 100 requests in that window
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true, // Send rate limit info in response headers
    legacyHeaders: false, // Don't use old header format
});

// Stricter rate limiter for login/register
// Only 5 attempts per 15 minutes - prevents brute force attacks
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Only 5 login attempts allowed
    message: {
        success: false,
        message: 'Too many login attempts from this IP, please try again after 15 minutes.',
    },
    skipSuccessfulRequests: true, // Don't count successful logins against the limit
});

// Rate limiter for OTP requests
// Only 3 OTP requests per hour to prevent spam
export const otpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Only 3 OTP requests per hour
    message: {
        success: false,
        message: 'Too many OTP requests, please try again after 1 hour.',
    },
});

// Rate limiter for password reset
// Only 3 password reset attempts per hour
export const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Only 3 password reset requests per hour
    message: {
        success: false,
        message: 'Too many password reset requests, please try again after 1 hour.',
    },
});

// Clean user input to prevent NoSQL injection attacks
// Removes dangerous characters like $ and . that could be used for injection
export const sanitizeInput = mongoSanitize();

// Prevent HTTP Parameter Pollution
// If someone sends duplicate parameters like ?id=1&id=2, this cleans it up
export const preventHPP = hpp({
    whitelist: [
        'type',
        'status',
        'page',
        'limit',
        'sort',
        'order',
    ], // These parameters are allowed to have duplicates
});

// Password requirements - use these in route validation
// Passwords need: uppercase, lowercase, number, special character, and 8+ chars
export const passwordRequirements = {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
};

// Regex pattern for validating email addresses
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex pattern for validating mobile numbers (10-15 digits)
export const mobilePattern = /^[0-9]{10,15}$/;

// Security logger - tracks suspicious activity
// Logs failed login attempts and admin access for monitoring
export const securityLogger = (req, res, next) => {
    // Watch for failed login/register attempts
    if (req.path.includes('/auth/login') || req.path.includes('/auth/register')) {
        const originalSend = res.send;
        // Intercept the response to check if it failed
        res.send = function (data) {
            // If request failed (401 or 400), log it
            if (res.statusCode === 401 || res.statusCode === 400) {
                console.warn(`[SECURITY] Failed authentication attempt from ${req.ip} at ${new Date().toISOString()}`);
                console.warn(`[SECURITY] Path: ${req.path}, Method: ${req.method}`);
            }
            return originalSend.call(this, data);
        };
    }

    // Log whenever someone tries to access admin routes
    if (req.path.includes('/admin')) {
        console.info(`[SECURITY] Admin access attempt from ${req.ip} at ${new Date().toISOString()}`);
        console.info(`[SECURITY] Path: ${req.path}, User: ${req.user?.email || 'Unauthenticated'}`);
    }

    next();
};

// Give each request a unique ID for tracking
// Helps us debug issues - user can give us the request ID from error messages
export const requestIdGenerator = (req, res, next) => {
    // Create a unique ID using timestamp + random string
    req.requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    // Send it back in response headers so frontend can see it
    res.setHeader('X-Request-ID', req.requestId);
    next();
};

// CORS configuration - controls which websites can access our API
export const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);

        // In development, allow localhost requests
        if (process.env.NODE_ENV === 'development') {
            if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
                return callback(null, true);
            }
        }

        // In production, only allow specific origins from .env file
        const allowedOrigins = process.env.ALLOWED_ORIGINS
            ? process.env.ALLOWED_ORIGINS.split(',')
            : [];

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // Block requests from unauthorized origins
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and authentication headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization', 'X-Request-ID'], // Headers frontend can read
    maxAge: 86400, // Cache CORS preflight requests for 24 hours
};

