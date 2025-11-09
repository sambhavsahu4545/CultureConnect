// Authentication context - manages user login state across the app
// Provides login, register, logout functions and user info to all components

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, getToken } from '../utils/api';

// Create the context (shared state container)
const AuthContext = createContext();

// Hook to use auth context in components
// Throws error if used outside AuthProvider (helps catch bugs)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Auth provider component - wraps the app and provides auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Current logged-in user data
    const [loading, setLoading] = useState(true); // Loading state during auth check
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Is user logged in?

    // When app starts, check if user is already logged in
    useEffect(() => {
        checkAuth();
    }, []);

    // Check if user has a valid token and is logged in
    const checkAuth = async () => {
        const token = getToken(); // Get token from localStorage
        if (!token) {
            setLoading(false); // No token, user is not logged in
            return;
        }

        try {
            // Verify token with backend
            const response = await authAPI.getCurrentUser();
            if (response.success) {
                setUser(response.user);
                setIsAuthenticated(true);
            } else {
                // Token is invalid, remove it
                authAPI.logout();
            }
        } catch (error) {
            console.error('Auth check error:', error);
            authAPI.logout(); // Remove invalid token
        } finally {
            setLoading(false); // Done checking
        }
    };

    // Login function - called when user enters email and password
    const login = async (email, password) => {
        try {
            const response = await authAPI.login(email, password);
            if (response.success) {
                setUser(response.user);
                setIsAuthenticated(true);
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (error) {
            return { success: false, message: error.message || 'Login failed' };
        }
    };

    // Register function - called when new user signs up
    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            if (response.success) {
                setUser(response.user);
                setIsAuthenticated(true);
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (error) {
            return { success: false, message: error.message || 'Registration failed' };
        }
    };

    // Logout function - clears user data and token
    const logout = () => {
        authAPI.logout(); // Remove token from localStorage
        setUser(null);
        setIsAuthenticated(false);
    };

    // Update user data in context (used when profile is updated)
    const updateUser = (userData) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...userData, // Merge new data with existing user data
        }));
    };

    // Provide auth state and functions to all child components
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                register,
                logout,
                updateUser,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

