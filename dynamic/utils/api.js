// API utility - handles all communication with the backend server
// This file makes it easy to call backend APIs from the frontend

// Base URL for all API calls
// Gets it from environment variable, or uses localhost:5000 by default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get the authentication token from browser storage
// Token is stored when user logs in
const getToken = () => {
    return localStorage.getItem('token');
};

// Save the authentication token to browser storage
// Called after successful login or registration
const setToken = (token) => {
    localStorage.setItem('token', token);
};

// Remove the authentication token (logout)
// Clears the token from browser storage
const removeToken = () => {
    localStorage.removeItem('token');
};

// Main function that makes API requests
// Handles authentication, error handling, and response parsing
const apiRequest = async (endpoint, options = {}) => {
    // Get the token if user is logged in
    const token = getToken();
    
    // Set up request configuration
    const config = {
        headers: {
            'Content-Type': 'application/json',
            // Add authorization header if we have a token
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    try {
        // Log the request in development mode (helps with debugging)
        if (import.meta.env.DEV) {
            console.log(`API Request: ${API_BASE_URL}${endpoint}`, { method: options.method || 'GET' });
        }
        
        // Make the actual HTTP request
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        // Check if the response was successful
        if (!response.ok) {
            // Try to get error message from response
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                // If response isn't JSON, create a generic error
                errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
            }
            throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        // Parse and return the response data
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle network errors (like server being down)
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.error('Network Error - Backend server might be down:', error);
            throw new Error('Cannot connect to server. Please make sure the backend server is running on http://localhost:5000');
        }
        console.error('API Error:', error);
        throw error;
    }
};

// Authentication API functions
export const authAPI = {
    // Register a new user account
    register: async (userData) => {
        const response = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        // If registration successful, save the token so user is logged in
        if (response.token) {
            setToken(response.token);
        }
        return response;
    },

    // Login with email and password
    login: async (email, password) => {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        // Save the token so user stays logged in
        if (response.token) {
            setToken(response.token);
        }
        return response;
    },

    // Send OTP for password reset
    forgotPassword: async (contact, contactType) => {
        return await apiRequest('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ contact, contactType }),
        });
    },

    // Verify OTP
    verifyOTP: async (contact, contactType, otp) => {
        return await apiRequest('/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ contact, contactType, otp }),
        });
    },

    // Reset password
    resetPassword: async (contact, contactType, newPassword) => {
        const response = await apiRequest('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ contact, contactType, newPassword }),
        });
        if (response.token) {
            setToken(response.token);
        }
        return response;
    },

    // Get current user
    getCurrentUser: async () => {
        return await apiRequest('/auth/me');
    },

    // Logout
    logout: () => {
        removeToken();
    },
};

// Profile API
export const profileAPI = {
    // Get user profile
    getProfile: async () => {
        return await apiRequest('/profile');
    },

    // Update profile
    updateProfile: async (profileData) => {
        return await apiRequest('/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    },

    // Update password
    updatePassword: async (currentPassword, newPassword) => {
        return await apiRequest('/profile/password', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
        });
    },
};

// Permission API
export const permissionAPI = {
    // Get user permissions
    getPermissions: async () => {
        return await apiRequest('/permissions');
    },

    // Update location permission
    updateLocationPermission: async (permissionData) => {
        return await apiRequest('/permissions/location', {
            method: 'PUT',
            body: JSON.stringify(permissionData),
        });
    },

    // Update contact permission
    updateContactPermission: async (permissionData) => {
        return await apiRequest('/permissions/contact', {
            method: 'PUT',
            body: JSON.stringify(permissionData),
        });
    },

    // Update camera permission
    updateCameraPermission: async (enabled) => {
        return await apiRequest('/permissions/camera', {
            method: 'PUT',
            body: JSON.stringify({ enabled }),
        });
    },

    // Update notification preferences
    updateNotificationPreferences: async (preferences) => {
        return await apiRequest('/permissions/notifications', {
            method: 'PUT',
            body: JSON.stringify(preferences),
        });
    },

    // Update storage permission
    updateStoragePermission: async (enabled) => {
        return await apiRequest('/permissions/storage', {
            method: 'PUT',
            body: JSON.stringify({ enabled }),
        });
    },

    // Update analytics permission
    updateAnalyticsPermission: async (enabled) => {
        return await apiRequest('/permissions/analytics', {
            method: 'PUT',
            body: JSON.stringify({ enabled }),
        });
    },
};

// Location API
export const locationAPI = {
    // Get current location
    getCurrentLocation: async () => {
        return await apiRequest('/location/current');
    },

    // Update location
    updateLocation: async (locationData) => {
        return await apiRequest('/location/update', {
            method: 'POST',
            body: JSON.stringify(locationData),
        });
    },

    // Reverse geocode (coordinates to address)
    reverseGeocode: async (latitude, longitude) => {
        return await apiRequest('/location/reverse-geocode', {
            method: 'POST',
            body: JSON.stringify({ latitude, longitude }),
        });
    },

    // Search locations
    searchLocations: async (query) => {
        return await apiRequest(`/location/search?query=${encodeURIComponent(query)}`);
    },
};

// Booking API
export const bookingAPI = {
    // Create booking
    createBooking: async (bookingData) => {
        return await apiRequest('/bookings', {
            method: 'POST',
            body: JSON.stringify(bookingData),
        });
    },

    // Get all bookings
    getBookings: async (filters = {}) => {
        const queryString = new URLSearchParams(filters).toString();
        return await apiRequest(`/bookings${queryString ? `?${queryString}` : ''}`);
    },

    // Get booking by ID
    getBooking: async (bookingId) => {
        return await apiRequest(`/bookings/${bookingId}`);
    },

    // Cancel booking
    cancelBooking: async (bookingId, reason) => {
        return await apiRequest(`/bookings/${bookingId}/cancel`, {
            method: 'PUT',
            body: JSON.stringify({ reason }),
        });
    },

    // Update payment status
    updatePayment: async (bookingId, paymentData) => {
        return await apiRequest(`/bookings/${bookingId}/payment`, {
            method: 'PUT',
            body: JSON.stringify(paymentData),
        });
    },
};

// Notification API
export const notificationAPI = {
    // Get all notifications
    getNotifications: async (filters = {}) => {
        const queryString = new URLSearchParams(filters).toString();
        return await apiRequest(`/notifications${queryString ? `?${queryString}` : ''}`);
    },

    // Get unread count
    getUnreadCount: async () => {
        return await apiRequest('/notifications/unread-count');
    },

    // Mark notification as read
    markAsRead: async (notificationId) => {
        return await apiRequest(`/notifications/${notificationId}/read`, {
            method: 'PUT',
        });
    },

    // Mark all notifications as read
    markAllAsRead: async () => {
        return await apiRequest('/notifications/read-all', {
            method: 'PUT',
        });
    },

    // Delete notification
    deleteNotification: async (notificationId) => {
        return await apiRequest(`/notifications/${notificationId}`, {
            method: 'DELETE',
        });
    },
};

// Export token management functions
export { getToken, setToken, removeToken };

