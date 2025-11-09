// Admin routes - only accessible by admins
// Handles user management, system statistics, and admin operations

import express from 'express';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Notification from '../models/Notification.js';
import Permission from '../models/Permission.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

// All routes in this file require user to be logged in AND be an admin
router.use(protect); // Must be logged in
router.use(admin); // Must be admin

// Get admin dashboard statistics
// GET /api/admin/dashboard
// Shows overview of users, bookings, revenue, etc.
router.get('/dashboard', async (req, res) => {
    try {
        // Get basic statistics
        const totalUsers = await User.countDocuments(); // Total number of users
        const activeUsers = await User.countDocuments({ isActive: true }); // Active users only
        const totalBookings = await Booking.countDocuments(); // Total bookings
        
        // Calculate total revenue from completed payments
        const totalRevenue = await Booking.aggregate([
            { $match: { 'payment.status': 'completed' } }, // Only completed payments
            { $group: { _id: null, total: { $sum: '$pricing.totalPrice' } } }, // Sum all prices
        ]);

        // Get the 10 most recent users
        const recentUsers = await User.find()
            .sort({ createdAt: -1 }) // Newest first
            .limit(10)
            .select('name email role isActive createdAt');

        // Get the 10 most recent bookings
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 }) // Newest first
            .limit(10)
            .populate('user', 'name email') // Include user info
            .select('bookingReference type status pricing.totalPrice createdAt');

        res.json({
            success: true,
            data: {
                statistics: {
                    totalUsers,
                    activeUsers,
                    totalBookings,
                    totalRevenue: totalRevenue[0]?.total || 0, // Revenue total or 0 if none
                },
                recentUsers,
                recentBookings,
            },
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

/**
 * @route   GET /api/admin/users
 * @desc    Get all users (admin only)
 * @access  Private/Admin
 */
router.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 20, role, isActive, search } = req.query;

        // Build query
        const query = {};
        if (role) query.role = role;
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { mobile: { $regex: search, $options: 'i' } },
            ];
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Get users (excluding passwords)
        const users = await User.find(query)
            .select('-password -otp')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count
        const total = await User.countDocuments(query);

        res.json({
            success: true,
            data: {
                users,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit)),
                },
            },
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get user by ID (admin only)
 * @access  Private/Admin
 */
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password -otp');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Get user's bookings
        const bookings = await Booking.find({ user: user._id })
            .sort({ createdAt: -1 })
            .limit(10);

        // Get user's permissions
        const permissions = await Permission.findOne({ user: user._id });

        res.json({
            success: true,
            data: {
                user,
                bookings,
                permissions,
            },
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

/**
 * @route   PUT /api/admin/users/:id/role
 * @desc    Update user role (admin only)
 * @access  Private/Admin
 */
router.put(
    '/users/:id/role',
    [
        body('role').isIn(['user', 'admin']).withMessage('Invalid role'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array(),
                });
            }

            const { role } = req.body;
            const userId = req.params.id;

            // Prevent admin from removing their own admin role
            if (userId.toString() === req.user._id.toString() && role !== 'admin') {
                return res.status(400).json({
                    success: false,
                    message: 'You cannot remove your own admin role',
                });
            }

            const user = await User.findByIdAndUpdate(
                userId,
                { role },
                { new: true }
            ).select('-password -otp');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            // Log role change
            console.info(`[ADMIN] User role changed by ${req.user.email}: ${user.email} -> ${role}`);

            res.json({
                success: true,
                message: 'User role updated successfully',
                data: { user },
            });
        } catch (error) {
            console.error('Update user role error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }
    }
);

/**
 * @route   PUT /api/admin/users/:id/status
 * @desc    Update user status (active/inactive) (admin only)
 * @access  Private/Admin
 */
router.put(
    '/users/:id/status',
    [
        body('isActive').isBoolean().withMessage('isActive must be a boolean'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array(),
                });
            }

            const { isActive } = req.body;
            const userId = req.params.id;

            // Prevent admin from deactivating their own account
            if (userId.toString() === req.user._id.toString() && !isActive) {
                return res.status(400).json({
                    success: false,
                    message: 'You cannot deactivate your own account',
                });
            }

            const user = await User.findByIdAndUpdate(
                userId,
                { isActive },
                { new: true }
            ).select('-password -otp');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            // Log status change
            console.info(`[ADMIN] User status changed by ${req.user.email}: ${user.email} -> ${isActive ? 'active' : 'inactive'}`);

            res.json({
                success: true,
                message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
                data: { user },
            });
        } catch (error) {
            console.error('Update user status error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }
    }
);

/**
 * @route   GET /api/admin/database/stats
 * @desc    Get database statistics (admin only)
 * @access  Private/Admin
 */
router.get('/database/stats', async (req, res) => {
    try {
        const db = mongoose.connection.db;

        // Get database stats
        const stats = await db.stats();

        // Get collection stats
        const collections = await db.listCollections().toArray();
        const collectionStats = {};

        for (const collection of collections) {
            const collectionName = collection.name;
            const count = await db.collection(collectionName).countDocuments();
            collectionStats[collectionName] = {
                count,
                size: stats.dataSize || 0, // Approximate
            };
        }

        res.json({
            success: true,
            data: {
                database: {
                    name: db.databaseName,
                    collections: collections.length,
                    dataSize: stats.dataSize,
                    storageSize: stats.storageSize,
                    indexes: stats.indexes,
                    indexSize: stats.indexSize,
                },
                collections: collectionStats,
            },
        });
    } catch (error) {
        console.error('Database stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

/**
 * @route   GET /api/admin/bookings
 * @desc    Get all bookings (admin only)
 * @access  Private/Admin
 */
router.get('/bookings', async (req, res) => {
    try {
        const { page = 1, limit = 20, type, status } = req.query;

        // Build query
        const query = {};
        if (type) query.type = type;
        if (status) query.status = status;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Get bookings
        const bookings = await Booking.find(query)
            .populate('user', 'name email mobile')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count
        const total = await Booking.countDocuments(query);

        res.json({
            success: true,
            data: {
                bookings,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit)),
                },
            },
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user (admin only)
 * @access  Private/Admin
 */
router.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Prevent admin from deleting their own account
        if (userId.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own account',
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Delete user and related data
        await User.findByIdAndDelete(userId);
        await Permission.deleteOne({ user: userId });
        // Note: Bookings and notifications are kept for record-keeping
        // You may want to anonymize them instead of deleting

        // Log deletion
        console.warn(`[ADMIN] User deleted by ${req.user.email}: ${user.email} (ID: ${userId})`);

        res.json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

export default router;

