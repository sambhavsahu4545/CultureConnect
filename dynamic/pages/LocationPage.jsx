// Location page - shows user's current location on a map
// Users can see their location, search for places, and manage location permissions

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeftIcon, LocationIcon } from '../components/Icons';
import { locationAPI, permissionAPI } from '../utils/api';

function LocationPage({ setCurrentPage }) {
    const { t } = useLanguage();
    const { isAuthenticated } = useAuth();
    
    // State for location data
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // When page loads, check permissions and get location
    useEffect(() => {
        if (isAuthenticated) {
            checkLocationPermission();
            getCurrentLocation();
        }
    }, [isAuthenticated]);

    // Check if user has granted location permission
    const checkLocationPermission = async () => {
        try {
            const response = await permissionAPI.getPermissions();
            if (response.success) {
                setPermissionGranted(response.permissions.location.enabled);
            }
        } catch (error) {
            console.error('Error checking permission:', error);
        }
    };

    // Get the user's current location from the backend
    // This is the location we stored earlier (not the browser's current location)
    const getCurrentLocation = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await locationAPI.getCurrentLocation();
            if (response.success) {
                setCurrentLocation(response.location);
            }
        } catch (error) {
            // Show helpful error messages based on what went wrong
            if (error.message.includes('not granted')) {
                setError('Location permission not granted. Please enable location access.');
            } else if (error.message.includes('not found')) {
                setError('Location not found. Please update your location.');
            } else {
                setError('Failed to get location');
            }
        } finally {
            setLoading(false);
        }
    };

    // Ask browser for user's current location and save it to backend
    // This uses the browser's geolocation API
    const requestLocation = async () => {
        // Check if browser supports geolocation
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setLoading(true);
        setError('');

        // Ask browser for current location
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                // Got the location coordinates
                const { latitude, longitude } = position.coords;

                try {
                    // First, enable location permission in our backend
                    await permissionAPI.updateLocationPermission({
                        enabled: true,
                    });

                    // Then save the location to backend
                    const response = await locationAPI.updateLocation({
                        latitude,
                        longitude,
                    });

                    if (response.success) {
                        setCurrentLocation(response.location);
                        setPermissionGranted(true);
                        setError('');
                    }
                } catch (error) {
                    console.error('Error updating location:', error);
                    setError('Failed to update location');
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                // User denied location access or something went wrong
                console.error('Geolocation error:', error);
                setError('Failed to get location. Please enable location access in your browser settings.');
                setLoading(false);
            },
            {
                enableHighAccuracy: true, // Try to get accurate location
                timeout: 10000, // Don't wait more than 10 seconds
                maximumAge: 0, // Don't use cached location
            }
        );
    };

    // Search for locations by name
    // Right now this uses mock data, but ready for real location search API
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            setLoading(true);
            const response = await locationAPI.searchLocations(searchQuery);
            if (response.success) {
                setSearchResults(response.results);
            }
        } catch (error) {
            console.error('Search error:', error);
            setError('Failed to search locations');
        } finally {
            setLoading(false);
        }
    };

    // Go back to home page
    const handleBack = () => {
        setCurrentPage('home');
    };

    return (
        <div className="container mx-auto px-6 pt-32 pb-16 min-h-screen">
            {/* Back button */}
            <motion.button
                onClick={handleBack}
                className="mb-8 flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                whileHover={{ x: -5 }}
            >
                <ArrowLeftIcon />
                <span>{t('cancel') || 'Back'}</span>
            </motion.button>

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8"
                >
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <LocationIcon />
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Location Services</h1>
                            <p className="text-gray-400">View and manage your location</p>
                        </div>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Permission status */}
                    <div className="mb-6 p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold mb-1">Location Permission</h3>
                                <p className="text-sm text-gray-400">
                                    {permissionGranted
                                        ? 'Location access is enabled'
                                        : 'Location access is disabled'}
                                </p>
                            </div>
                            <button
                                onClick={requestLocation}
                                disabled={loading}
                                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                            >
                                {loading ? 'Loading...' : permissionGranted ? 'Update Location' : 'Enable Location'}
                            </button>
                        </div>
                    </div>

                    {/* Current location display */}
                    {currentLocation && (
                        <div className="mb-6 p-6 bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold mb-4">Current Location</h3>
                            <div className="space-y-2">
                                {currentLocation.address && (
                                    <div>
                                        <span className="text-gray-400">Address: </span>
                                        <span className="text-white">{currentLocation.address}</span>
                                    </div>
                                )}
                                {currentLocation.city && (
                                    <div>
                                        <span className="text-gray-400">City: </span>
                                        <span className="text-white">{currentLocation.city}</span>
                                    </div>
                                )}
                                {currentLocation.state && (
                                    <div>
                                        <span className="text-gray-400">State: </span>
                                        <span className="text-white">{currentLocation.state}</span>
                                    </div>
                                )}
                                {currentLocation.country && (
                                    <div>
                                        <span className="text-gray-400">Country: </span>
                                        <span className="text-white">{currentLocation.country}</span>
                                    </div>
                                )}
                                <div>
                                    <span className="text-gray-400">Coordinates: </span>
                                    <span className="text-white">
                                        {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                                    </span>
                                </div>
                            </div>

                            {/* Map embed (using OpenStreetMap) */}
                            <div className="mt-4 rounded-lg overflow-hidden">
                                <iframe
                                    width="100%"
                                    height="400"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${currentLocation.longitude - 0.01},${currentLocation.latitude - 0.01},${currentLocation.longitude + 0.01},${currentLocation.latitude + 0.01}&layer=mapnik&marker=${currentLocation.latitude},${currentLocation.longitude}`}
                                    className="w-full"
                                />
                                <br />
                                <small>
                                    <a
                                        href={`https://www.openstreetmap.org/?mlat=${currentLocation.latitude}&mlon=${currentLocation.longitude}#map=15/${currentLocation.latitude}/${currentLocation.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-400 hover:text-indigo-300"
                                    >
                                        View Larger Map
                                    </a>
                                </small>
                            </div>
                        </div>
                    )}

                    {/* Location search */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-4">Search Locations</h3>
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for a location..."
                                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                            >
                                Search
                            </button>
                        </form>

                        {/* Search results */}
                        {searchResults.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {searchResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                                        onClick={() => {
                                            setCurrentLocation({
                                                latitude: result.latitude,
                                                longitude: result.longitude,
                                                address: result.address,
                                                city: result.city,
                                                country: result.country,
                                            });
                                            setSearchResults([]);
                                            setSearchQuery('');
                                        }}
                                    >
                                        <div className="font-semibold">{result.name}</div>
                                        <div className="text-sm text-gray-400">{result.address}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default LocationPage;

