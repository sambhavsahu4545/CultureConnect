// Profile dropdown - shows menu when user clicks profile icon
// Shows login/signup buttons if not logged in, or profile options if logged in

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

function ProfileDropdown({ setCurrentPage, isOpen, onClose }) {
    const { t } = useLanguage();
    const { isAuthenticated, logout } = useAuth();
    const dropdownRef = useRef(null);

    // Close dropdown when user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose(); // Close if click is outside the dropdown
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Navigate to a page and close the dropdown
    const handleMenuItemClick = (page) => {
        setCurrentPage(page);
        onClose();
    };

    // Log user out and go to home page
    const handleSignOut = () => {
        logout();
        onClose();
        setCurrentPage('home');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                >
                    <div className="py-2">
                        {!isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => handleMenuItemClick('login')}
                                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span>{t('login')}</span>
                                </button>
                                <button
                                    onClick={() => handleMenuItemClick('signin')}
                                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    <span>{t('signUp')}</span>
                                </button>
                                <div className="border-t border-gray-700 my-1"></div>
                                <button
                                    onClick={() => handleMenuItemClick('forgot-password')}
                                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>{t('forgotPassword')}</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleMenuItemClick('profile')}
                                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>{t('myProfile')}</span>
                                </button>
                                <div className="border-t border-gray-700 my-1"></div>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>{t('signOut')}</span>
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ProfileDropdown;

