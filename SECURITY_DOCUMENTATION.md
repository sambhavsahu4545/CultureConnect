# Security Documentation

This document outlines all security measures implemented in the application to protect against cyber attacks and ensure data safety.

## 🔒 Security Features Implemented

### 1. Authentication & Authorization

#### JWT Token Security
- ✅ Secure token generation with expiration (7 days)
- ✅ Token validation on every protected route
- ✅ Token stored securely (not in localStorage in production - use httpOnly cookies)
- ✅ Token rotation capability

#### Password Security
- ✅ Password hashing using bcrypt (salt rounds: 10)
- ✅ Strong password requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- ✅ Password never returned in API responses
- ✅ Password reset with OTP verification

#### Account Security
- ✅ Account locking after 5 failed login attempts (2 hours)
- ✅ Login attempt tracking
- ✅ Last login timestamp
- ✅ Account activation/deactivation
- ✅ Failed login attempt logging

### 2. Rate Limiting

#### API Rate Limiting
- ✅ General API: 100 requests per 15 minutes per IP
- ✅ Authentication: 5 requests per 15 minutes per IP
- ✅ OTP requests: 3 requests per hour per IP
- ✅ Password reset: 3 requests per hour per IP

#### Protection Against
- ✅ Brute force attacks
- ✅ DDoS attacks
- ✅ API abuse
- ✅ OTP spam

### 3. Input Validation & Sanitization

#### Input Validation
- ✅ Express-validator for all inputs
- ✅ Email validation
- ✅ Mobile number validation
- ✅ Password strength validation
- ✅ Data type validation

#### Input Sanitization
- ✅ NoSQL injection prevention (express-mongo-sanitize)
- ✅ XSS prevention (input escaping)
- ✅ HTML tag removal
- ✅ Parameter pollution prevention (HPP)

### 4. Security Headers (Helmet.js)

#### HTTP Headers
- ✅ Content-Security-Policy
- ✅ X-Content-Type-Options
- ✅ X-Frame-Options
- ✅ X-XSS-Protection
- ✅ Strict-Transport-Security (HTTPS)
- ✅ Referrer-Policy
- ✅ Permissions-Policy

### 5. CORS Configuration

#### Cross-Origin Resource Sharing
- ✅ Whitelist-based origin validation
- ✅ Credentials support
- ✅ Method restrictions
- ✅ Header restrictions
- ✅ Preflight request handling

### 6. Database Security

#### MongoDB Security
- ✅ Connection string validation
- ✅ Connection pooling
- ✅ Timeout configurations
- ✅ Error handling
- ✅ No direct database access (only through API)
- ✅ Database indexes for performance
- ✅ Query sanitization

#### Data Protection
- ✅ Sensitive data encryption (passwords)
- ✅ OTP data expiration
- ✅ Token expiration
- ✅ No sensitive data in logs

### 7. Admin Access Control

#### Admin Authentication
- ✅ Admin role-based access control (RBAC)
- ✅ Admin-only routes
- ✅ Admin middleware protection
- ✅ Admin activity logging

#### Admin Routes
- ✅ `/api/admin/dashboard` - Admin dashboard
- ✅ `/api/admin/users` - User management
- ✅ `/api/admin/users/:id` - User details
- ✅ `/api/admin/users/:id/role` - Update user role
- ✅ `/api/admin/users/:id/status` - Update user status
- ✅ `/api/admin/database/stats` - Database statistics
- ✅ `/api/admin/bookings` - All bookings
- ✅ `/api/admin/users/:id` (DELETE) - Delete user

#### Admin Security
- ✅ Only admins can access database statistics
- ✅ Only admins can view all users
- ✅ Only admins can modify user roles
- ✅ Only admins can access internal information
- ✅ Admin actions are logged
- ✅ Admins cannot remove their own admin role
- ✅ Admins cannot deactivate their own account

### 8. Error Handling

#### Secure Error Messages
- ✅ No sensitive information in error messages
- ✅ Generic error messages in production
- ✅ Detailed error messages only in development
- ✅ Error logging with request IDs
- ✅ Stack traces hidden in production

### 9. Request Tracking

#### Request IDs
- ✅ Unique request ID for each request
- ✅ Request ID in response headers
- ✅ Request ID in error logs
- ✅ Request tracking for debugging

### 10. Security Logging

#### Security Events Logged
- ✅ Failed login attempts
- ✅ Admin access attempts
- ✅ Unauthorized access attempts
- ✅ Account locking events
- ✅ Role changes
- ✅ Account status changes
- ✅ User deletions

### 11. API Security

#### API Protection
- ✅ All routes require authentication (except public routes)
- ✅ Admin routes require admin role
- ✅ Rate limiting on all routes
- ✅ Input validation on all routes
- ✅ Output sanitization
- ✅ Request size limits (10mb)

### 12. Environment Variables

#### Secure Configuration
- ✅ All secrets in environment variables
- ✅ No hardcoded credentials
- ✅ `.env` file in `.gitignore`
- ✅ Environment variable validation
- ✅ Production/development separation

## 🛡️ Protection Against Attacks

### 1. SQL/NoSQL Injection
- ✅ Input sanitization (express-mongo-sanitize)
- ✅ Parameterized queries (Mongoose)
- ✅ Input validation
- ✅ No raw queries

### 2. XSS (Cross-Site Scripting)
- ✅ Input escaping
- ✅ HTML tag removal
- ✅ Content Security Policy
- ✅ X-XSS-Protection header

### 3. CSRF (Cross-Site Request Forgery)
- ✅ CORS configuration
- ✅ SameSite cookies (when using cookies)
- ✅ Origin validation
- ✅ Referrer validation

### 4. Brute Force Attacks
- ✅ Rate limiting on authentication
- ✅ Account locking after failed attempts
- ✅ Login attempt tracking
- ✅ CAPTCHA ready (can be added)

### 5. DDoS Attacks
- ✅ Rate limiting on all routes
- ✅ Request size limits
- ✅ Connection pooling
- ✅ Timeout configurations

### 6. Session Hijacking
- ✅ JWT tokens with expiration
- ✅ Secure token storage
- ✅ Token rotation capability
- ✅ HTTPS enforcement (in production)

### 7. Man-in-the-Middle (MITM)
- ✅ HTTPS enforcement (in production)
- ✅ Secure headers
- ✅ Certificate validation
- ✅ TLS/SSL encryption

### 8. Data Exposure
- ✅ No sensitive data in responses
- ✅ Password hashing
- ✅ OTP expiration
- ✅ Token expiration
- ✅ Secure error messages

## 🔐 Admin Access

### Admin Requirements
- ✅ User must have `role: 'admin'` in database
- ✅ Admin must be authenticated (JWT token)
- ✅ Admin routes protected by `admin` middleware
- ✅ Admin actions are logged

### Creating an Admin User

#### Method 1: Direct Database Update
```javascript
// Connect to MongoDB and run:
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

#### Method 2: Using Admin API (if you have an admin)
```javascript
PUT /api/admin/users/:id/role
{
  "role": "admin"
}
```

#### Method 3: During Registration (Development Only)
Modify the registration route to set admin role for specific emails (remove in production).

### Admin Capabilities
- ✅ View all users
- ✅ View user details
- ✅ Update user roles
- ✅ Activate/deactivate users
- ✅ Delete users
- ✅ View all bookings
- ✅ Access database statistics
- ✅ View system logs

### Admin Security
- ✅ Admins cannot remove their own admin role
- ✅ Admins cannot deactivate their own account
- ✅ Admins cannot delete their own account
- ✅ All admin actions are logged
- ✅ Admin access attempts are logged

## 📊 Security Monitoring

### Logged Events
- ✅ Failed login attempts
- ✅ Admin access attempts
- ✅ Unauthorized access attempts
- ✅ Account locking events
- ✅ Role changes
- ✅ Account status changes
- ✅ User deletions
- ✅ API errors

### Log Format
```
[SECURITY] Event type: Details
[SECURITY] Failed login attempt for user: email@example.com from IP: 192.168.1.1
[ADMIN] User role changed by admin@example.com: user@example.com -> admin
[ERROR] Request ID: 1234567890-abc123 - Error message
```

## 🚀 Production Security Checklist

### Before Deployment
- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (at least 32 characters)
- [ ] Configure `ALLOWED_ORIGINS` in environment variables
- [ ] Enable HTTPS/SSL
- [ ] Set up MongoDB authentication
- [ ] Configure firewall rules
- [ ] Set up rate limiting (consider Redis for distributed rate limiting)
- [ ] Enable MongoDB encryption at rest
- [ ] Set up backup and recovery
- [ ] Configure logging and monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Review and update CORS configuration
- [ ] Review and update security headers
- [ ] Test all security measures
- [ ] Perform security audit
- [ ] Set up intrusion detection
- [ ] Configure DDoS protection

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRE=7d
FRONTEND_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 🔍 Security Testing

### Manual Testing
1. **Brute Force Protection**: Try multiple failed logins
2. **Rate Limiting**: Make multiple requests quickly
3. **Input Validation**: Try SQL injection, XSS attacks
4. **Admin Access**: Try accessing admin routes without admin role
5. **Token Validation**: Try accessing protected routes without token
6. **Password Strength**: Try weak passwords

### Automated Testing
- Consider using tools like:
  - OWASP ZAP
  - Burp Suite
  - Nessus
  - npm audit

## 📝 Security Best Practices

### For Developers
1. ✅ Never commit `.env` files
2. ✅ Use strong passwords
3. ✅ Keep dependencies updated
4. ✅ Review security logs regularly
5. ✅ Test security measures
6. ✅ Follow secure coding practices
7. ✅ Use HTTPS in production
8. ✅ Regular security audits

### For Administrators
1. ✅ Create admin users securely
2. ✅ Monitor security logs
3. ✅ Review admin actions
4. ✅ Keep system updated
5. ✅ Backup data regularly
6. ✅ Use strong admin passwords
7. ✅ Limit admin access
8. ✅ Regular security reviews

## 🆘 Security Incident Response

### If Security Breach Occurs
1. **Immediate Actions**:
   - Change all admin passwords
   - Revoke all JWT tokens
   - Lock affected accounts
   - Review security logs
   - Notify users if necessary

2. **Investigation**:
   - Check security logs
   - Identify compromised accounts
   - Determine attack vector
   - Assess damage

3. **Recovery**:
   - Patch vulnerabilities
   - Restore from backup if necessary
   - Update security measures
   - Monitor for further attacks

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB Security Checklist](https://www.mongodb.com/docs/manual/administration/security-checklist/)

## 🔒 Conclusion

The application implements comprehensive security measures to protect against:
- ✅ Cyber attacks
- ✅ Unauthorized access
- ✅ Data breaches
- ✅ API abuse
- ✅ Brute force attacks
- ✅ Injection attacks
- ✅ XSS attacks
- ✅ CSRF attacks
- ✅ DDoS attacks

**Only users with admin role can access database and internal information. All admin actions are logged and monitored.**

