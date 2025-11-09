// Admin middleware - only admins can access certain routes
// Make sure to use protect middleware first, then this one

import User from '../models/User.js';

// Check if the logged-in user is an admin
// Use this after protect middleware: protect, admin
export const admin = async (req, res, next) => {
    try {
        // User should already be set by protect middleware
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, please login',
            });
        }

        // Get full user data to check the role field
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        // Check if user has admin role
        if (user.role !== 'admin') {
            // Log this attempt for security monitoring
            console.warn(`[SECURITY] Unauthorized admin access attempt by user ${user.email} (ID: ${user._id}) at ${new Date().toISOString()}`);
            console.warn(`[SECURITY] IP: ${req.ip}, Path: ${req.path}, Method: ${req.method}`);

            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.',
            });
        }

        // User is admin, allow them to continue
        req.user = user; // Update with full user data
        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// Check if user is admin OR the owner of the resource
// Useful for routes where users can see their own data, but admins can see everything
// Example: users can see their own bookings, admins can see all bookings
export const adminOrOwner = (resourceUserIdField = 'userId') => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authorized, please login',
                });
            }

            const user = await User.findById(req.user._id);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found',
                });
            }

            // Admins can access anything
            if (user.role === 'admin') {
                req.user = user;
                return next();
            }

            // Check if this user owns the resource they're trying to access
            // The resourceUserIdField tells us where to find the user ID (in params or body)
            const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];

            // If the resource belongs to this user, allow access
            if (resourceUserId && resourceUserId.toString() === user._id.toString()) {
                req.user = user;
                return next();
            }

            // User is trying to access someone else's resource and they're not admin
            console.warn(`[SECURITY] Unauthorized resource access attempt by user ${user.email} (ID: ${user._id}) at ${new Date().toISOString()}`);
            console.warn(`[SECURITY] IP: ${req.ip}, Path: ${req.path}, Resource User ID: ${resourceUserId}`);

            return res.status(403).json({
                success: false,
                message: 'Access denied. You do not have permission to access this resource.',
            });
        } catch (error) {
            console.error('Admin or owner middleware error:', error);
            return res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }
    };
};

