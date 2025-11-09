// Authentication middleware - checks if user is logged in
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to protect routes - user must be logged in to access
// Put this before routes that need authentication
export const protect = async (req, res, next) => {
    let token;

    // Check if authorization header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token (format: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify the token is valid and not expired
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user and attach to request object
            // We exclude password for security
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found',
                });
            }

            // User is authenticated, continue to the route
            next();
        } catch (error) {
            // Token is invalid or expired
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed',
            });
        }
    }

    // No token provided
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token',
        });
    }
};

// Create a JWT token for a user when they login
// Token expires in 7 days by default (configurable in .env)
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

