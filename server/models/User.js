// User model - defines what data we store for each user
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    // Basic user info
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true, // Remove extra spaces
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true, // No duplicate emails allowed
        lowercase: true, // Store emails in lowercase
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    mobile: {
        type: String,
        required: [true, 'Please provide a mobile number'],
        unique: true, // No duplicate mobile numbers
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false, // Don't include password when querying users (security)
        validate: {
            validator: function (password) {
                // Make sure password has uppercase, lowercase, number, and special character
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(password);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        },
    },
    // Profile information
    profilePicture: {
        type: String,
        default: '', // URL to the profile picture
    },
    dateOfBirth: {
        type: Date,
        default: null,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', ''], // Only allow these values
        default: '',
    },
    // User's address
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        country: { type: String, default: '' },
        zipCode: { type: String, default: '' },
    },
    // User preferences for the app
    preferences: {
        language: { type: String, default: 'en' },
        currency: { type: String, default: 'INR' },
        theme: { type: String, default: 'dark' },
        notifications: {
            email: { type: Boolean, default: true },
            sms: { type: Boolean, default: false },
            push: { type: Boolean, default: true },
        },
    },
    // Travel-related preferences
    travelPreferences: {
        defaultSearchLocation: { type: String, default: '' },
        preferredAirline: { type: String, default: '' },
        seatPreference: { type: String, default: 'window' },
        mealPreference: { type: String, default: 'vegetarian' },
        baggagePreference: { type: String, default: 'standard' },
        classPreference: { type: String, default: 'economy' },
    },
    // OTP for password reset (one-time password)
    otp: {
        code: { type: String, default: null },
        expiresAt: { type: Date, default: null }, // OTP expires after 10 minutes
    },
    // Verification status
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isMobileVerified: {
        type: Boolean,
        default: false,
    },
    // Password reset token (legacy, we use OTP now)
    resetPasswordToken: {
        type: String,
        default: null,
    },
    resetPasswordExpire: {
        type: Date,
        default: null,
    },
    // User role - 'user' or 'admin'
    // Only admins can access database and internal info
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user', // Everyone starts as a regular user
    },
    // Whether the account is active or deactivated
    isActive: {
        type: Boolean,
        default: true,
    },
    // Track failed login attempts (for security)
    loginAttempts: {
        type: Number,
        default: 0,
    },
    // Lock account until this date if too many failed attempts
    lockUntil: {
        type: Date,
        default: null,
    },
    // When did the user last login
    lastLogin: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Before saving user, hash the password if it was changed
// We never store plain text passwords - always hash them
userSchema.pre('save', async function (next) {
    // Only hash if password was modified (not on every save)
    if (!this.isModified('password')) {
        next();
        return;
    }
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to check if entered password matches the stored hash
// Used during login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate a 6-digit OTP for password reset
// OTP expires after 10 minutes
userSchema.methods.generateOTP = function () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otp = {
        code: otp,
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes from now
    };
    return otp;
};

// Verify if the entered OTP is correct and not expired
userSchema.methods.verifyOTP = function (enteredOTP) {
    if (!this.otp || !this.otp.code) {
        return false; // No OTP was generated
    }
    if (Date.now() > this.otp.expiresAt) {
        return false; // OTP expired
    }
    return this.otp.code === enteredOTP; // Check if codes match
};

// Check if account is currently locked
// Account is locked if lockUntil exists and is in the future
userSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Called when user enters wrong password
// Locks account after 5 failed attempts for 2 hours
userSchema.methods.incrementLoginAttempts = async function () {
    // If lock expired, reset and start counting again
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 },
        });
    }

    const updates = { $inc: { loginAttempts: 1 } }; // Increase attempts by 1
    
    // After 5 failed attempts, lock the account for 2 hours
    if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours from now
    }

    return this.updateOne(updates);
};

// Called when user logs in successfully
// Reset the failed attempt counter and update last login time
userSchema.methods.resetLoginAttempts = async function () {
    return this.updateOne({
        $set: { loginAttempts: 0, lastLogin: new Date() },
        $unset: { lockUntil: 1 }, // Remove lock if it exists
    });
};

// Create indexes for faster queries
// These fields are searched frequently, so indexes help a lot
userSchema.index({ email: 1 });
userSchema.index({ mobile: 1 });
userSchema.index({ role: 1 });

const User = mongoose.model('User', userSchema);

export default User;

