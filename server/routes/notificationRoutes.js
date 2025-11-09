// Notification routes - handle user notifications
// Get notifications, mark as read, delete notifications, get unread count

import express from 'express';
import Notification from '../models/Notification.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all notifications for the logged-in user
// GET /api/notifications
// Can filter by read status and type, supports pagination
router.get('/', protect, async (req, res) => {
    try {
        const { read, type, page = 1, limit = 20 } = req.query;

        // Build query - only get notifications for this user
        const query = { user: req.user._id };
        
        // Filter by read status if provided (true/false)
        if (read !== undefined) {
            query.read = read === 'true';
        }
        
        // Filter by notification type if provided
        if (type) {
            query.type = type;
        }
        
        // Don't show expired notifications
        query.$or = [
            { expiresAt: null }, // Never expires
            { expiresAt: { $gt: new Date() } }, // Still valid
        ];

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Get notifications from database
        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 }) // Newest first
            .skip(skip)
            .limit(parseInt(limit))
            .populate('booking', 'bookingReference type status'); // Include booking details if linked

        // Count total notifications (for pagination)
        const total = await Notification.countDocuments(query);

        // Get unread count (for badge display)
        const unreadCount = await Notification.getUnreadCount(req.user._id);

        res.json({
            success: true,
            notifications,
            unreadCount,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit)),
            },
        });
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// Get the count of unread notifications
// GET /api/notifications/unread-count
// Used to show notification badge with number
router.get('/unread-count', protect, async (req, res) => {
    try {
        const unreadCount = await Notification.getUnreadCount(req.user._id);

        res.json({
            success: true,
            unreadCount,
        });
    } catch (error) {
        console.error('Get unread count error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// Mark a specific notification as read
// PUT /api/notifications/:id/read
// User clicks on notification, marks it as read
router.put('/:id/read', protect, async (req, res) => {
    try {
        // Find notification (must belong to this user)
        const notification = await Notification.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found',
            });
        }

        // Mark it as read
        await notification.markAsRead();

        res.json({
            success: true,
            message: 'Notification marked as read',
            notification,
        });
    } catch (error) {
        console.error('Mark notification as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// Mark all notifications as read
// PUT /api/notifications/read-all
// User clicks "Mark all as read" button
router.put('/read-all', protect, async (req, res) => {
    try {
        // Mark all user's notifications as read
        const result = await Notification.markAllAsRead(req.user._id);

        res.json({
            success: true,
            message: 'All notifications marked as read',
            updatedCount: result.modifiedCount, // How many were updated
        });
    } catch (error) {
        console.error('Mark all notifications as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// Delete a notification
// DELETE /api/notifications/:id
// User can delete notifications they don't want to see anymore
router.delete('/:id', protect, async (req, res) => {
    try {
        // Find and delete notification (must belong to this user)
        const notification = await Notification.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found',
            });
        }

        res.json({
            success: true,
            message: 'Notification deleted successfully',
        });
    } catch (error) {
        console.error('Delete notification error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

export default router;

