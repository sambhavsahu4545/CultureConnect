// Profile routes - handle user profile operations
// Get profile, update profile, change password

import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get the logged-in user's profile
// GET /api/profile
// Returns all user information (password is automatically excluded)
router.get('/', protect, async (req, res) => {
    try {
        // Get user data (password is excluded by default in User model)
        const user = await User.findById(req.user._id);

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                profilePicture: user.profilePicture,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                address: user.address,
                preferences: user.preferences,
                travelPreferences: user.travelPreferences,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// Update user profile
// PUT /api/profile
// User can update their name, email, address, preferences, etc.
router.put(
    '/',
    protect,
    [
        body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
        body('email').optional().isEmail().withMessage('Please provide a valid email'),
        body('mobile').optional().trim().notEmpty().withMessage('Mobile cannot be empty'),
    ],
    async (req, res) => {
        try {
            // Validate input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array(),
                });
            }

            const {
                name,
                email,
                mobile,
                profilePicture,
                dateOfBirth,
                gender,
                address,
                preferences,
                travelPreferences,
            } = req.body;

            // Check if email is being changed and if it's already taken by another user
            if (email) {
                const emailExists = await User.findOne({
                    email,
                    _id: { $ne: req.user._id }, // Exclude current user
                });
                if (emailExists) {
                    return res.status(400).json({
                        success: false,
                        message: 'Email already in use',
                    });
                }
            }

            // Check if mobile is being changed and if it's already taken
            if (mobile) {
                const mobileExists = await User.findOne({
                    mobile,
                    _id: { $ne: req.user._id }, // Exclude current user
                });
                if (mobileExists) {
                    return res.status(400).json({
                        success: false,
                        message: 'Mobile number already in use',
                    });
                }
            }

            // Update user profile (only update fields that were provided)
            const user = await User.findByIdAndUpdate(
                req.user._id,
                {
                    ...(name && { name }),
                    ...(email && { email }),
                    ...(mobile && { mobile }),
                    ...(profilePicture !== undefined && { profilePicture }),
                    ...(dateOfBirth && { dateOfBirth }),
                    ...(gender !== undefined && { gender }),
                    ...(address && { address }),
                    ...(preferences && { preferences }),
                    ...(travelPreferences && { travelPreferences }),
                },
                {
                    new: true, // Return updated document
                    runValidators: true, // Run model validators
                }
            );

            res.json({
                success: true,
                message: 'Profile updated successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    profilePicture: user.profilePicture,
                    dateOfBirth: user.dateOfBirth,
                    gender: user.gender,
                    address: user.address,
                    preferences: user.preferences,
                    travelPreferences: user.travelPreferences,
                },
            });
        } catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

// Change password
// PUT /api/profile/password
// User must provide current password and new password
router.put(
    '/password',
    protect,
    [
        body('currentPassword').notEmpty().withMessage('Current password is required'),
        body('newPassword').isLength({ min: 8 })
            .withMessage('New password must be at least 8 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
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

            const { currentPassword, newPassword } = req.body;

            // Get user with password (password is normally excluded)
            const user = await User.findById(req.user._id).select('+password');

            // Verify current password is correct
            const isMatch = await user.matchPassword(currentPassword);

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password is incorrect',
                });
            }

            // Update password (will be automatically hashed by User model)
            user.password = newPassword;
            await user.save();

            res.json({
                success: true,
                message: 'Password updated successfully',
            });
        } catch (error) {
            console.error('Update password error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

export default router;

