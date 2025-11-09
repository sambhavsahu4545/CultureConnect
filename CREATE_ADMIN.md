# How to Create an Admin User

This guide explains how to create an admin user who can access the database and internal information.

## ⚠️ Security Warning

Only create admin users for trusted personnel. Admin users have full access to:
- All user data
- Database statistics
- System configuration
- User management (create, update, delete)
- Booking management
- Internal system information

## Method 1: Using MongoDB Shell (Recommended)

### Step 1: Connect to MongoDB

```bash
# For local MongoDB
mongosh

# For MongoDB Atlas
mongosh "your-connection-string"
```

### Step 2: Switch to Your Database

```javascript
use culture-connect
```

### Step 3: Find the User

```javascript
// Find user by email
db.users.findOne({ email: "admin@example.com" })
```

### Step 4: Update User Role to Admin

```javascript
// Update user role to admin
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Step 5: Verify Admin Role

```javascript
// Verify the user is now an admin
db.users.findOne({ email: "admin@example.com" }, { role: 1, email: 1 })
```

## Method 2: Using MongoDB Compass

1. Open MongoDB Compass
2. Connect to your database
3. Navigate to the `users` collection
4. Find the user you want to make admin
5. Edit the document
6. Set `role` field to `"admin"`
7. Save the changes

## Method 3: Using Node.js Script

Create a file `create-admin.js`:

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './server/models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find user by email
        const userEmail = 'admin@example.com'; // Change this to your admin email
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            console.error('User not found. Please register the user first.');
            process.exit(1);
        }

        // Update user role to admin
        user.role = 'admin';
        await user.save();

        console.log(`✅ User ${userEmail} is now an admin`);
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
```

Run the script:

```bash
node create-admin.js
```

## Method 4: During Registration (Development Only)

⚠️ **Warning**: Only use this method in development. Remove it before production.

Modify `server/routes/authRoutes.js`:

```javascript
// In the register route, after user creation
if (process.env.NODE_ENV === 'development' && email === 'admin@example.com') {
    user.role = 'admin';
    await user.save();
}
```

## Method 5: Using Admin API (If You Already Have an Admin)

If you already have an admin user, you can create new admins using the admin API:

```bash
# Login as admin first to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-password"}'

# Use the token to update user role
curl -X PUT http://localhost:5000/api/admin/users/USER_ID/role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"role":"admin"}'
```

## Verification

After creating an admin user, verify it works:

1. **Login as Admin**:
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"your-password"}'
   ```

2. **Access Admin Dashboard** (use the token from login):
   ```bash
   curl -X GET http://localhost:5000/api/admin/dashboard \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
   ```

3. **Check User List**:
   ```bash
   curl -X GET http://localhost:5000/api/admin/users \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
   ```

## Admin Features

Once a user is an admin, they can:

- ✅ Access `/api/admin/dashboard` - View system statistics
- ✅ Access `/api/admin/users` - View all users
- ✅ Access `/api/admin/users/:id` - View user details
- ✅ Access `/api/admin/users/:id/role` - Update user roles
- ✅ Access `/api/admin/users/:id/status` - Activate/deactivate users
- ✅ Access `/api/admin/database/stats` - View database statistics
- ✅ Access `/api/admin/bookings` - View all bookings
- ✅ Delete users

## Security Best Practices

1. **Use Strong Passwords**: Admin accounts should have very strong passwords
2. **Limit Admin Access**: Only create admin users for trusted personnel
3. **Monitor Admin Activity**: All admin actions are logged
4. **Regular Audits**: Regularly review admin users and their activities
5. **Two-Factor Authentication**: Consider adding 2FA for admin accounts (future enhancement)
6. **Separate Admin Accounts**: Don't use regular user accounts as admin accounts
7. **Regular Password Changes**: Require admin users to change passwords regularly

## Troubleshooting

### "Access denied" Error

- Make sure the user has `role: "admin"` in the database
- Verify the JWT token is valid
- Check if the user account is active (`isActive: true`)

### "User not found" Error

- Verify the user exists in the database
- Check the email address is correct
- Make sure you're connected to the correct database

### "Not authorized" Error

- Verify you're using a valid JWT token
- Check if the token has expired
- Make sure you're sending the token in the Authorization header: `Bearer <token>`

## Removing Admin Access

To remove admin access from a user:

```javascript
// Using MongoDB shell
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "user" } }
)
```

Or using the Admin API (if you have another admin):

```bash
curl -X PUT http://localhost:5000/api/admin/users/USER_ID/role \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"role":"user"}'
```

## Important Notes

- ⚠️ Only admins can access database and internal information
- ⚠️ Admin actions are logged for security
- ⚠️ Admins cannot remove their own admin role
- ⚠️ Admins cannot deactivate their own account
- ⚠️ Admins cannot delete their own account
- ✅ All admin routes are protected by authentication and authorization middleware
- ✅ All admin actions are logged for auditing purposes

