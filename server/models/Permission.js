// Permission model - stores what permissions users have granted
// Tracks location, contact, camera, notifications, storage, and analytics permissions

import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
    // Which user these permissions belong to
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true, // Each user has exactly one permission document
    },

    // Location permission settings
    location: {
        enabled: {
            type: Boolean,
            default: false, // Default is disabled (user must grant permission)
        },
        // Where the user is located (only stored if they granted permission)
        lastKnownLocation: {
            latitude: {
                type: Number,
                default: null,
            },
            longitude: {
                type: Number,
                default: null,
            },
            address: {
                type: String,
                default: '',
            },
            city: {
                type: String,
                default: '',
            },
            state: {
                type: String,
                default: '',
            },
            country: {
                type: String,
                default: '',
            },
            zipCode: {
                type: String,
                default: '',
            },
            updatedAt: {
                type: Date,
                default: null, // When was location last updated
            },
        },
        // When did user grant location permission
        grantedAt: {
            type: Date,
            default: null,
        },
    },

    // Contact permission - can app access user's contacts?
    contact: {
        enabled: {
            type: Boolean,
            default: false,
        },
        // Can we share contact info with travel partners (like flight companions)?
        shareWithPartners: {
            type: Boolean,
            default: false,
        },
        grantedAt: {
            type: Date,
            default: null,
        },
    },

    // Camera permission - can app use camera for photos?
    camera: {
        enabled: {
            type: Boolean,
            default: false,
        },
        grantedAt: {
            type: Date,
            default: null,
        },
    },

    // Notification permissions - what types of notifications can we send?
    notifications: {
        push: {
            enabled: {
                type: Boolean,
                default: true, // Push notifications enabled by default
            },
            grantedAt: {
                type: Date,
                default: Date.now,
            },
        },
        email: {
            enabled: {
                type: Boolean,
                default: true, // Email notifications enabled by default
            },
            grantedAt: {
                type: Date,
                default: Date.now,
            },
        },
        sms: {
            enabled: {
                type: Boolean,
                default: false, // SMS disabled by default (costs money)
            },
            grantedAt: {
                type: Date,
                default: null,
            },
        },
    },

    // Storage permission - can we store data locally on user's device?
    storage: {
        enabled: {
            type: Boolean,
            default: true, // Enabled by default (for offline access)
        },
        grantedAt: {
            type: Date,
            default: Date.now,
        },
    },

    // Analytics permission - can we track user behavior for analytics?
    analytics: {
        enabled: {
            type: Boolean,
            default: false, // Disabled by default (privacy)
        },
        grantedAt: {
            type: Date,
            default: null,
        },
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt
});

// Create index on user field for faster lookups
permissionSchema.index({ user: 1 });

// Helper method to update location and set the timestamp
permissionSchema.methods.updateLocation = function (locationData) {
    this.location.lastKnownLocation = {
        ...locationData,
        updatedAt: new Date(), // Remember when we updated it
    };
    return this.save();
};

// Check if user has granted a specific permission type
permissionSchema.methods.hasPermission = function (permissionType) {
    const permissionMap = {
        location: this.location.enabled,
        contact: this.contact.enabled,
        camera: this.camera.enabled,
        notifications: this.notifications.push.enabled || this.notifications.email.enabled,
        storage: this.storage.enabled,
        analytics: this.analytics.enabled,
    };

    return permissionMap[permissionType] || false;
};

// Get permissions for a user, or create default permissions if they don't exist
// This is useful - we don't have to check if permissions exist before using them
permissionSchema.statics.getOrCreate = async function (userId) {
    let permission = await this.findOne({ user: userId });
    
    // If no permissions document exists, create one with defaults
    if (!permission) {
        permission = await this.create({ user: userId });
    }
    
    return permission;
};

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;

