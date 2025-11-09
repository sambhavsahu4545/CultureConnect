// Permission routes - manage what users allow the app to access
// Handles location, contact, camera, notifications, storage, and analytics permissions

import express from 'express';
import { body, validationResult } from 'express-validator';
import Permission from '../models/Permission.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all permissions for the logged-in user
// GET /api/permissions
// User must be logged in (protected route)
router.get('/', protect, async (req, res) => {
    try {
        // Get user's permissions, or create default permissions if they don't exist
        const permissions = await Permission.getOrCreate(req.user._id);

        res.json({
            success: true,
            permissions: {
                location: permissions.location,
                contact: permissions.contact,
                camera: permissions.camera,
                notifications: permissions.notifications,
                storage: permissions.storage,
                analytics: permissions.analytics,
            },
        });
    } catch (error) {
        console.error('Get permissions error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// Update location permission and location data
// PUT /api/permissions/location
// User can enable/disable location access and update their location
router.put(
    '/location',
    protect,
    [
        body('enabled').optional().isBoolean().withMessage('Enabled must be a boolean'),
        body('latitude').optional().isFloat().withMessage('Latitude must be a number'),
        body('longitude').optional().isFloat().withMessage('Longitude must be a number'),
        body('address').optional().isString(),
        body('city').optional().isString(),
        body('state').optional().isString(),
        body('country').optional().isString(),
        body('zipCode').optional().isString(),
    ],
    async (req, res) => {
        try {
            // Check if all inputs are valid
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array(),
                });
            }

            const {
                enabled,
                latitude,
                longitude,
                address,
                city,
                state,
                country,
                zipCode,
            } = req.body;

            // Get or create permissions
            const permissions = await Permission.getOrCreate(req.user._id);

            // Update location permission
            if (enabled !== undefined) {
                permissions.location.enabled = enabled;
                if (enabled) {
                    permissions.location.grantedAt = new Date();
                } else {
                    permissions.location.grantedAt = null;
                    // Clear location data when permission is revoked
                    permissions.location.lastKnownLocation = {
                        latitude: null,
                        longitude: null,
                        address: '',
                        city: '',
                        state: '',
                        country: '',
                        zipCode: '',
                        updatedAt: null,
                    };
                }
            }

            // Update location data (only if permission is enabled)
            if (permissions.location.enabled && (latitude !== undefined || longitude !== undefined)) {
                const locationData = {
                    latitude: latitude || permissions.location.lastKnownLocation.latitude,
                    longitude: longitude || permissions.location.lastKnownLocation.longitude,
                    address: address || permissions.location.lastKnownLocation.address || '',
                    city: city || permissions.location.lastKnownLocation.city || '',
                    state: state || permissions.location.lastKnownLocation.state || '',
                    country: country || permissions.location.lastKnownLocation.country || '',
                    zipCode: zipCode || permissions.location.lastKnownLocation.zipCode || '',
                };
                await permissions.updateLocation(locationData);
            }

            await permissions.save();

            res.json({
                success: true,
                message: 'Location permission updated successfully',
                permissions: {
                    location: permissions.location,
                },
            });
        } catch (error) {
            console.error('Update location permission error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

/**
 * @route   PUT /api/permissions/contact
 * @desc    Update contact permission
 * @access  Private
 */
router.put(
    '/contact',
    protect,
    [
        body('enabled').optional().isBoolean().withMessage('Enabled must be a boolean'),
        body('shareWithPartners').optional().isBoolean().withMessage('Share with partners must be a boolean'),
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

            const { enabled, shareWithPartners } = req.body;

            const permissions = await Permission.getOrCreate(req.user._id);

            if (enabled !== undefined) {
                permissions.contact.enabled = enabled;
                if (enabled) {
                    permissions.contact.grantedAt = new Date();
                } else {
                    permissions.contact.grantedAt = null;
                    permissions.contact.shareWithPartners = false;
                }
            }

            if (shareWithPartners !== undefined && permissions.contact.enabled) {
                permissions.contact.shareWithPartners = shareWithPartners;
            }

            await permissions.save();

            res.json({
                success: true,
                message: 'Contact permission updated successfully',
                permissions: {
                    contact: permissions.contact,
                },
            });
        } catch (error) {
            console.error('Update contact permission error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

/**
 * @route   PUT /api/permissions/camera
 * @desc    Update camera permission
 * @access  Private
 */
router.put(
    '/camera',
    protect,
    [
        body('enabled').isBoolean().withMessage('Enabled must be a boolean'),
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

            const { enabled } = req.body;

            const permissions = await Permission.getOrCreate(req.user._id);

            permissions.camera.enabled = enabled;
            if (enabled) {
                permissions.camera.grantedAt = new Date();
            } else {
                permissions.camera.grantedAt = null;
            }

            await permissions.save();

            res.json({
                success: true,
                message: 'Camera permission updated successfully',
                permissions: {
                    camera: permissions.camera,
                },
            });
        } catch (error) {
            console.error('Update camera permission error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

/**
 * @route   PUT /api/permissions/notifications
 * @desc    Update notification preferences
 * @access  Private
 */
router.put(
    '/notifications',
    protect,
    [
        body('push.enabled').optional().isBoolean(),
        body('email.enabled').optional().isBoolean(),
        body('sms.enabled').optional().isBoolean(),
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

            const { push, email, sms } = req.body;

            const permissions = await Permission.getOrCreate(req.user._id);

            if (push?.enabled !== undefined) {
                permissions.notifications.push.enabled = push.enabled;
                if (push.enabled) {
                    permissions.notifications.push.grantedAt = new Date();
                }
            }

            if (email?.enabled !== undefined) {
                permissions.notifications.email.enabled = email.enabled;
                if (email.enabled) {
                    permissions.notifications.email.grantedAt = new Date();
                }
            }

            if (sms?.enabled !== undefined) {
                permissions.notifications.sms.enabled = sms.enabled;
                if (sms.enabled) {
                    permissions.notifications.sms.grantedAt = new Date();
                }
            }

            await permissions.save();

            res.json({
                success: true,
                message: 'Notification preferences updated successfully',
                permissions: {
                    notifications: permissions.notifications,
                },
            });
        } catch (error) {
            console.error('Update notification preferences error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

/**
 * @route   PUT /api/permissions/storage
 * @desc    Update storage permission
 * @access  Private
 */
router.put(
    '/storage',
    protect,
    [
        body('enabled').isBoolean().withMessage('Enabled must be a boolean'),
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

            const { enabled } = req.body;

            const permissions = await Permission.getOrCreate(req.user._id);

            permissions.storage.enabled = enabled;
            if (enabled) {
                permissions.storage.grantedAt = new Date();
            } else {
                permissions.storage.grantedAt = null;
            }

            await permissions.save();

            res.json({
                success: true,
                message: 'Storage permission updated successfully',
                permissions: {
                    storage: permissions.storage,
                },
            });
        } catch (error) {
            console.error('Update storage permission error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

/**
 * @route   PUT /api/permissions/analytics
 * @desc    Update analytics permission
 * @access  Private
 */
router.put(
    '/analytics',
    protect,
    [
        body('enabled').isBoolean().withMessage('Enabled must be a boolean'),
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

            const { enabled } = req.body;

            const permissions = await Permission.getOrCreate(req.user._id);

            permissions.analytics.enabled = enabled;
            if (enabled) {
                permissions.analytics.grantedAt = new Date();
            } else {
                permissions.analytics.grantedAt = null;
            }

            await permissions.save();

            res.json({
                success: true,
                message: 'Analytics permission updated successfully',
                permissions: {
                    analytics: permissions.analytics,
                },
            });
        } catch (error) {
            console.error('Update analytics permission error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

export default router;

