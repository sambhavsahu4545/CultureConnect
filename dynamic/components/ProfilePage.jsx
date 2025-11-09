// Profile page - displays user's profile information
// Shows user name, email, photo, address, and allows logout

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { profileAPI } from '../utils/api';

function ProfilePage({ setCurrentPage }) {
    const { t } = useLanguage();
    const { user, logout } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user profile data from API when page loads
    useEffect(() => {
        fetchProfile();
    }, []);

    // Get user profile from backend
    const fetchProfile = async () => {
        try {
            const response = await profileAPI.getProfile();
            if (response.success) {
                setProfileData(response.user);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    // Log user out and go to home page
    const handleLogout = () => {
        logout();
        if (setCurrentPage) {
            setCurrentPage('home');
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-6 pt-32 pb-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto"></div>
                    <p className="mt-4 text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    const displayUser = profileData || user;

    return (
        <div className="container mx-auto px-6 pt-32 pb-16 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md text-center">
                <h1 className="text-4xl font-bold mb-4">{t('myProfilePage')}</h1>
                <p className="text-gray-400 mb-8">{t('profileDescription')}</p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8"
                >
                    <img
                        src={displayUser?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayUser?.name || 'User')}&background=6366f1&color=fff&size=128`}
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-indigo-400 object-cover"
                    />
                    <h2 className="text-2xl font-semibold">{displayUser?.name || 'User'}</h2>
                    <p className="text-indigo-400 mt-2">{displayUser?.email || ''}</p>
                    {displayUser?.mobile && (
                        <p className="text-gray-400 mt-1">{displayUser.mobile}</p>
                    )}
                    <div className="mt-6 space-y-2 text-left">
                        {displayUser?.address?.city && (
                            <p className="text-gray-300 text-sm">
                                <span className="text-gray-500">Location:</span> {displayUser.address.city}
                                {displayUser.address.state && `, ${displayUser.address.state}`}
                            </p>
                        )}
                        {displayUser?.gender && (
                            <p className="text-gray-300 text-sm">
                                <span className="text-gray-500">Gender:</span> {displayUser.gender}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-8 w-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg"
                    >
                        {t('signOut')}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

export default ProfilePage;
