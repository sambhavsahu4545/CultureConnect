// OTP Service - handles one-time passwords for password reset
// Currently uses mock email/SMS (just logs to console)
// TODO: In production, integrate with real email/SMS service like SendGrid or Twilio

// Generate a random 6-digit code
// Returns something like "123456"
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Calculate when the OTP should expire
// Default is 10 minutes from now
export const getOTPExpiration = (minutes = 10) => {
    return new Date(Date.now() + minutes * 60 * 1000);
};

// Check if an OTP has expired
// Returns true if expired, false if still valid
export const isOTPExpired = (expiresAt) => {
    if (!expiresAt) return true; // No expiration date means it's expired
    return new Date() > new Date(expiresAt); // Compare current time with expiration
};

// Send OTP via email
// Right now it just logs to console (for development)
// TODO: Replace with real email service in production (SendGrid, AWS SES, etc.)
export const sendOTPEmail = async (email, otp, purpose = 'verification') => {
    try {
        // TODO: Replace this with actual email service
        // Example code for Nodemailer:
        /*
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: email,
            subject: 'Your OTP Code',
            html: `
                <h2>Your OTP Code</h2>
                <p>Your verification code is: <strong>${otp}</strong></p>
                <p>This code will expire in 10 minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
            `
        });
        */

        // For now, just log it so we can test
        if (process.env.NODE_ENV === 'development') {
            console.log('='.repeat(50));
            console.log(`📧 OTP Email (${purpose})`);
            console.log(`To: ${email}`);
            console.log(`OTP: ${otp}`);
            console.log(`Expires in: 10 minutes`);
            console.log('='.repeat(50));
        }

        return {
            success: true,
            message: 'OTP sent via email',
            method: 'email',
        };
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

// Send OTP via SMS
// Right now it just logs to console (for development)
// TODO: Replace with real SMS service in production (Twilio, AWS SNS, etc.)
export const sendOTPSMS = async (mobile, otp, purpose = 'verification') => {
    try {
        // TODO: Replace this with actual SMS service
        // Example code for Twilio:
        /*
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

        await client.messages.create({
            body: `Your OTP code is: ${otp}. Valid for 10 minutes.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobile
        });
        */

        // For now, just log it so we can test
        if (process.env.NODE_ENV === 'development') {
            console.log('='.repeat(50));
            console.log(`📱 OTP SMS (${purpose})`);
            console.log(`To: ${mobile}`);
            console.log(`OTP: ${otp}`);
            console.log(`Expires in: 10 minutes`);
            console.log('='.repeat(50));
        }

        return {
            success: true,
            message: 'OTP sent via SMS',
            method: 'sms',
        };
    } catch (error) {
        console.error('Error sending OTP SMS:', error);
        throw new Error('Failed to send OTP SMS');
    }
};

// Send OTP via email or SMS based on contact type
// This is the main function that routes to email or SMS sending
export const sendOTP = async (contact, contactType, otp, purpose = 'verification') => {
    if (contactType === 'email') {
        return await sendOTPEmail(contact, otp, purpose);
    } else if (contactType === 'mobile') {
        return await sendOTPSMS(contact, otp, purpose);
    } else {
        throw new Error('Invalid contact type. Use "email" or "mobile"');
    }
};

// Verify if the OTP entered by user is correct
// Checks if OTP exists, is not expired, and matches the stored one
export const verifyOTP = (enteredOTP, storedOTP, expiresAt) => {
    // Make sure we have both OTPs to compare
    if (!storedOTP || !enteredOTP) {
        return {
            valid: false,
            error: 'OTP not found',
        };
    }

    // Check if OTP expired
    if (isOTPExpired(expiresAt)) {
        return {
            valid: false,
            error: 'OTP expired',
        };
    }

    // Check if the codes match
    if (enteredOTP !== storedOTP) {
        return {
            valid: false,
            error: 'Invalid OTP',
        };
    }

    // Everything checks out!
    return {
        valid: true,
        message: 'OTP verified successfully',
    };
};

