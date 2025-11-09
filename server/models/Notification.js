// Notification model - stores all user notifications
// Handles booking confirmations, payment updates, reminders, promotions, etc.

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    // Which user should receive this notification
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    // What type of notification is this?
    type: {
        type: String,
        enum: [
            'booking-confirmation', // Booking was created
            'booking-cancelled', // Booking was cancelled
            'booking-reminder', // Reminder about upcoming booking
            'payment-success', // Payment went through
            'payment-failed', // Payment failed
            'password-changed', // User changed password
            'profile-updated', // User updated profile
            'system-update', // System announcement
            'promotion', // Promotional offer
            'reminder', // General reminder
            'alert', // Important alert
        ],
        required: true,
    },

    // Short title for the notification
    title: {
        type: String,
        required: true,
    },

    // Full notification message
    message: {
        type: String,
        required: true,
    },

    // Extra data stored as JSON (like booking ID, transaction ID, etc.)
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },

    // Has the user read this notification?
    read: {
        type: Boolean,
        default: false, // Starts as unread
    },

    // When did the user read it?
    readAt: {
        type: Date,
        default: null,
    },

    // How important is this notification?
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium',
    },

    // If this notification is about a booking, link to it
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        default: null,
    },

    // Where should user go when they click this notification?
    actionUrl: {
        type: String,
        default: '', // e.g., "/bookings/123"
    },

    // When does this notification expire? (for time-sensitive notifications)
    expiresAt: {
        type: Date,
        default: null, // null means it never expires
    },
}, {
    timestamps: true, // Track when notification was created
});

// Create indexes for faster queries
notificationSchema.index({ user: 1, read: 1 }); // Find unread notifications for a user
notificationSchema.index({ user: 1, createdAt: -1 }); // Get user's notifications sorted by newest
notificationSchema.index({ type: 1 }); // Find notifications by type
// Auto-delete expired notifications (MongoDB TTL index)
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Mark this notification as read
notificationSchema.methods.markAsRead = function () {
    this.read = true;
    this.readAt = new Date();
    return this.save();
};

// Create a new notification (helper function)
notificationSchema.statics.createNotification = async function (userId, notificationData) {
    const notification = await this.create({
        user: userId,
        ...notificationData,
    });
    return notification;
};

// Count how many unread notifications a user has
notificationSchema.statics.getUnreadCount = async function (userId) {
    return await this.countDocuments({
        user: userId,
        read: false,
        // Only count notifications that haven't expired
        $or: [
            { expiresAt: null }, // Never expires
            { expiresAt: { $gt: new Date() } }, // Expires in the future
        ],
    });
};

// Mark all of a user's notifications as read
notificationSchema.statics.markAllAsRead = async function (userId) {
    return await this.updateMany(
        { user: userId, read: false },
        { read: true, readAt: new Date() }
    );
};

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;

