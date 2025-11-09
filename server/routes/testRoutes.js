// Test routes - for testing database connection and debugging
// These routes help verify that everything is working correctly

import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';

const router = express.Router();

// Test MongoDB connection
// GET /api/test/mongodb
// Check if database is connected and can perform operations
// Useful for debugging connection issues
router.get('/mongodb', async (req, res) => {
    try {
        // Check what state the MongoDB connection is in
        const connectionState = mongoose.connection.readyState;
        const states = {
            0: 'disconnected', // Not connected
            1: 'connected', // Connected and ready
            2: 'connecting', // Currently connecting
            3: 'disconnecting' // Currently disconnecting
        };

        // Get connection details
        const connectionInfo = {
            state: states[connectionState] || 'unknown',
            readyState: connectionState,
            host: mongoose.connection.host || 'N/A',
            name: mongoose.connection.name || 'N/A',
            port: mongoose.connection.port || 'N/A',
        };

        // Try to perform a simple database operation to make sure it's working
        let dbOperationSuccess = false;
        let userCount = 0;
        let errorMessage = null;

        try {
            if (connectionState === 1) {
                // Connection is open, try to count users in database
                userCount = await User.countDocuments();
                dbOperationSuccess = true;
            } else {
                errorMessage = `Database is ${states[connectionState]}. Cannot perform operations.`;
            }
        } catch (dbError) {
            errorMessage = `Database operation failed: ${dbError.message}`;
        }

        res.json({
            success: connectionState === 1, // Success only if connected
            message: connectionState === 1 
                ? 'MongoDB is connected successfully!' 
                : `MongoDB connection state: ${states[connectionState]}`,
            connection: connectionInfo,
            database: {
                operationSuccess: dbOperationSuccess,
                userCount: userCount, // How many users are in the database
                error: errorMessage
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error testing MongoDB connection',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

export default router;

