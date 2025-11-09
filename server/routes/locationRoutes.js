// Location routes - handle location-related operations
// Gets current location, updates location, searches places, converts coordinates to addresses

import express from 'express';
import { body, validationResult } from 'express-validator';
import Permission from '../models/Permission.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get the user's current location
// GET /api/location/current
// Returns the last known location we stored for this user
router.get('/current', protect, async (req, res) => {
    try {
        const permissions = await Permission.getOrCreate(req.user._id);

        // Check if user has granted location permission
        if (!permissions.location.enabled) {
            return res.status(403).json({
                success: false,
                message: 'Location permission not granted',
            });
        }

        // Check if we actually have location data
        if (!permissions.location.lastKnownLocation.latitude || 
            !permissions.location.lastKnownLocation.longitude) {
            return res.status(404).json({
                success: false,
                message: 'Location not found. Please update your location.',
            });
        }

        // Return the stored location
        res.json({
            success: true,
            location: permissions.location.lastKnownLocation,
        });
    } catch (error) {
        console.error('Get current location error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// Update the user's current location
// POST /api/location/update
// Saves new location coordinates and address info
router.post(
    '/update',
    protect,
    [
        body('latitude').isFloat().withMessage('Latitude must be a valid number'),
        body('longitude').isFloat().withMessage('Longitude must be a valid number'),
        body('address').optional().isString(),
        body('city').optional().isString(),
        body('state').optional().isString(),
        body('country').optional().isString(),
        body('zipCode').optional().isString(),
    ],
    async (req, res) => {
        try {
            // Validate the input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array(),
                });
            }

            const { latitude, longitude, address, city, state, country, zipCode } = req.body;

            // Validate coordinates
            if (latitude < -90 || latitude > 90) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid latitude. Must be between -90 and 90.',
                });
            }

            if (longitude < -180 || longitude > 180) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid longitude. Must be between -180 and 180.',
                });
            }

            const permissions = await Permission.getOrCreate(req.user._id);

            // Enable location permission if not already enabled
            if (!permissions.location.enabled) {
                permissions.location.enabled = true;
                permissions.location.grantedAt = new Date();
            }

            // Update location data
            const locationData = {
                latitude,
                longitude,
                address: address || '',
                city: city || '',
                state: state || '',
                country: country || '',
                zipCode: zipCode || '',
            };

            await permissions.updateLocation(locationData);

            res.json({
                success: true,
                message: 'Location updated successfully',
                location: permissions.location.lastKnownLocation,
            });
        } catch (error) {
            console.error('Update location error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

/**
 * @route   POST /api/location/reverse-geocode
 * @desc    Reverse geocode coordinates to get address
 * @access  Private
 * 
 * Note: This is a mock implementation. In production, integrate with:
 * - Google Maps Geocoding API
 * - OpenStreetMap Nominatim API
 * - Mapbox Geocoding API
 */
router.post(
    '/reverse-geocode',
    protect,
    [
        body('latitude').isFloat().withMessage('Latitude must be a valid number'),
        body('longitude').isFloat().withMessage('Longitude must be a valid number'),
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

            const { latitude, longitude } = req.body;

            // TODO: Integrate with actual geocoding service
            // Example with Google Maps API:
            /*
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
            */

            // Mock response for development
            const mockAddress = {
                address: `${latitude}, ${longitude}`,
                city: 'Unknown City',
                state: 'Unknown State',
                country: 'Unknown Country',
                zipCode: '',
                formattedAddress: `${latitude}, ${longitude}`,
            };

            // In development, return mock data
            if (process.env.NODE_ENV === 'development') {
                console.log(`Reverse geocoding: ${latitude}, ${longitude}`);
                return res.json({
                    success: true,
                    address: mockAddress,
                    message: 'Mock address returned (integrate with geocoding service in production)',
                });
            }

            // In production, this would call the actual geocoding service
            res.json({
                success: true,
                address: mockAddress,
            });
        } catch (error) {
            console.error('Reverse geocode error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

/**
 * @route   GET /api/location/search
 * @desc    Search for locations by query
 * @access  Private
 * 
 * Note: This is a mock implementation. In production, integrate with:
 * - Google Places API
 * - Mapbox Geocoding API
 * - OpenStreetMap Nominatim API
 */
router.get('/search', protect, async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required',
            });
        }

        // TODO: Integrate with actual location search service
        // Example with Google Places API:
        /*
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        */

        // Mock response for development
        const mockResults = [
            {
                id: '1',
                name: query,
                address: `${query}, Sample City`,
                latitude: 28.6139,
                longitude: 77.2090,
                city: 'Sample City',
                country: 'Sample Country',
            },
        ];

        // In development, return mock data
        if (process.env.NODE_ENV === 'development') {
            console.log(`Location search: ${query}`);
            return res.json({
                success: true,
                results: mockResults,
                message: 'Mock results returned (integrate with location search service in production)',
            });
        }

        // In production, this would call the actual search service
        res.json({
            success: true,
            results: mockResults,
        });
    } catch (error) {
        console.error('Location search error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

export default router;

