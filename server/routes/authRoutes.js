// Authentication routes - handles login, register, password reset, etc.
import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateToken, protect } from '../middleware/auth.js';
import { sendOTP, generateOTP, getOTPExpiration, verifyOTP } from '../services/otpService.js';
import { authLimiter, otpLimiter, passwordResetLimiter } from '../middleware/security.js';

const router = express.Router();

// Register a new user
// POST /api/auth/register
router.post(
    '/register',
    authLimiter, // Limit registration attempts to prevent spam
    [
        // Validate all the input fields
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('mobile').trim().notEmpty().withMessage('Mobile number is required'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        body('gender').isIn(['male', 'female', 'other']).withMessage('Please select a valid gender'),
        body('address.street').trim().notEmpty().withMessage('Street address is required'),
        body('address.city').trim().notEmpty().withMessage('City is required'),
        body('address.state').trim().notEmpty().withMessage('State is required'),
        body('address.country').trim().notEmpty().withMessage('Country is required'),
    ],
    async (req, res) => {
        try {
            // Check if validation passed
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array(),
                });
            }

            const { name, email, mobile, password, gender, address } = req.body;

            // Check if someone already registered with this email or mobile
            const userExists = await User.findOne({
                $or: [{ email }, { mobile }],
            });

            if (userExists) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists with this email or mobile number',
                });
            }

            // Create the new user
            // Password will be automatically hashed by the User model
            const user = await User.create({
                name,
                email,
                mobile,
                password,
                gender: gender || '',
                address: {
                    street: address?.street || '',
                    city: address?.city || '',
                    state: address?.state || '',
                    country: address?.country || '',
                    zipCode: address?.zipCode || '',
                },
            });

            // Generate a JWT token so they're automatically logged in after registration
            const token = generateToken(user._id);

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                },
            });
        } catch (error) {
            console.error('Register error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

// Login user
// POST /api/auth/login
router.post(
    '/login',
    authLimiter, // Stricter rate limiting for login (prevents brute force attacks)
    [
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        try {
            // Check validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array(),
                });
            }

            const { email, password } = req.body;

            // Find user (we need to select password to compare it)
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                // Don't tell them if user exists or not (security)
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            // Check if account is locked (too many failed attempts)
            if (user.isLocked) {
                const lockTime = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
                return res.status(423).json({
                    success: false,
                    message: `Account is locked due to multiple failed login attempts. Please try again after ${lockTime} minutes.`,
                });
            }

            // Check if account is deactivated
            if (!user.isActive) {
                return res.status(403).json({
                    success: false,
                    message: 'Account is deactivated. Please contact support.',
                });
            }

            // Check if password is correct
            const isMatch = await user.matchPassword(password);

            if (!isMatch) {
                // Wrong password - increment failed attempts
                await user.incrementLoginAttempts();

                // Log this for security monitoring
                console.warn(`[SECURITY] Failed login attempt for user: ${email} from IP: ${req.ip}`);

                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            // Password is correct! Reset failed attempts and update last login
            await user.resetLoginAttempts();

            // Generate token for the user
            const token = generateToken(user._id);

            res.json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    profilePicture: user.profilePicture,
                    role: user.role, // Include role so frontend knows if user is admin
                },
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

// Send OTP for password reset
// POST /api/auth/forgot-password
router.post(
    '/forgot-password',
    passwordResetLimiter, // Limit how many times user can request OTP
    [
        body('contact').notEmpty().withMessage('Email or mobile is required'),
        body('contactType').isIn(['email', 'mobile']).withMessage('Invalid contact type'),
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

            const { contact, contactType } = req.body;

            // Find the user by their email or mobile number
            const user = await User.findOne(
                contactType === 'email' ? { email: contact } : { mobile: contact }
            );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            // Generate a 6-digit OTP that expires in 10 minutes
            const otp = generateOTP();
            const expiresAt = getOTPExpiration(10);

            // Save the OTP to the user's account
            user.otp = {
                code: otp,
                expiresAt: expiresAt,
            };
            await user.save();

            // Send the OTP via email or SMS
            // In development, it just logs to console. In production, integrate with email/SMS service
            try {
                await sendOTP(contact, contactType, otp, 'password-reset');
            } catch (error) {
                console.error('Error sending OTP:', error);
                // We still return success so users don't know if email/SMS failed
            }

            res.json({
                success: true,
                message: 'OTP sent successfully',
                // In development mode, return the OTP so we can test (remove this in production!)
                ...(process.env.NODE_ENV === 'development' && { otp }),
            });
        } catch (error) {
            console.error('Forgot password error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

// Verify the OTP that was sent to user's email/mobile
// POST /api/auth/verify-otp
router.post(
    '/verify-otp',
    otpLimiter, // Limit how many times user can try to verify
    [
        body('contact').notEmpty().withMessage('Email or mobile is required'),
        body('contactType').isIn(['email', 'mobile']).withMessage('Invalid contact type'),
        body('otp').notEmpty().withMessage('OTP is required'),
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

            const { contact, contactType, otp } = req.body;

            // Find the user
            const user = await User.findOne(
                contactType === 'email' ? { email: contact } : { mobile: contact }
            );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            // Check if the OTP is correct and not expired
            const verificationResult = verifyOTP(
                otp,
                user.otp?.code,
                user.otp?.expiresAt
            );

            if (!verificationResult.valid) {
                return res.status(400).json({
                    success: false,
                    message: verificationResult.error || 'Invalid or expired OTP',
                });
            }

            // OTP is correct! Clear it from the database
            user.otp = { code: null, expiresAt: null };
            await user.save();

            res.json({
                success: true,
                message: 'OTP verified successfully',
            });
        } catch (error) {
            console.error('Verify OTP error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

// Reset password after OTP is verified
// POST /api/auth/reset-password
// User should verify OTP first, then call this to set new password
router.post(
    '/reset-password',
    [
        body('contact').notEmpty().withMessage('Email or mobile is required'),
        body('contactType').isIn(['email', 'mobile']).withMessage('Invalid contact type'),
        body('newPassword').isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters')
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

            const { contact, contactType, newPassword } = req.body;

            // Find the user
            const user = await User.findOne(
                contactType === 'email' ? { email: contact } : { mobile: contact }
            ).select('+password');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            // Update the password (it will be automatically hashed by the User model)
            user.password = newPassword;
            // Clear the OTP since password is reset
            user.otp = { code: null, expiresAt: null };
            await user.save();

            // Generate a new token so user is logged in with new password
            const token = generateToken(user._id);

            res.json({
                success: true,
                message: 'Password reset successfully',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                },
            });
        } catch (error) {
            console.error('Reset password error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

// Get current logged-in user's information
// GET /api/auth/me
// Requires authentication (user must be logged in)
router.get('/me', protect, async (req, res) => {
    try {
        // req.user is set by the protect middleware
        const user = await User.findById(req.user._id);

        // Return user data (password is automatically excluded)
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
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

export default router;

