// Header.jsx
// This component renders the fixed header at the top of the application.
// It includes the logo, navigation menu for different pages, and icons for settings and profile.
// The header has a semi-transparent background with blur effect and animated underlines for active nav items.

import React, { useState } from 'react'; // React for building the component
import { motion } from 'framer-motion'; // For animated underline effect
import { useLanguage } from '../contexts/LanguageContext'; // Language context
import Logo from './Logo.jsx'; // Logo component for branding
import { GearIcon, ProfileIcon, NotificationIcon, LocationIcon } from './Icons.jsx'; // Icon components for settings, profile, notifications, and location
import ProfileDropdown from './ProfileDropdown.jsx'; // Profile dropdown component

// Header functional component
// Props:
// - setCurrentPage: Function to change the current page (from App.jsx)
// - currentPage: String indicating the currently active page
function Header({ setCurrentPage, currentPage }) {
    const { t } = useLanguage();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    
    // Array of navigation items for the menu
    const navItems = [
        { key: 'home', label: t('home') },
        { key: 'flights', label: t('flights') },
        { key: 'hotels', label: t('hotels') },
        { key: 'trains', label: t('trains') },
        { key: 'destinations', label: t('destinations') },
        { key: 'profile', label: t('profile') }
    ];

    return (
        // Fixed header with semi-transparent background and backdrop blur
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/50 backdrop-blur-lg">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo section: Clickable to go to home page */}
                <div className="cursor-pointer" onClick={() => setCurrentPage('home')}>
                    <Logo />
                </div>
                {/* Navigation menu: Hidden on mobile, visible on medium screens and up */}
                <ul className="hidden md:flex items-center space-x-8">
                    {navItems.map(item => (
                        <li key={item.key} className="relative">
                            {/* Navigation button: Changes page on click, styled based on active state */}
                            <button
                                onClick={() => setCurrentPage(item.key)}
                                className={`text-sm font-medium transition-colors duration-300 ${currentPage === item.key ? 'text-indigo-400' : 'text-gray-300 hover:text-indigo-400'}`}
                            >
                                {item.label}
                            </button>
                            {/* Animated underline for the active navigation item */}
                            {currentPage === item.key && (
                                <motion.div
                                    className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-indigo-400"
                                    layoutId="underline" // Shared layout ID for smooth transitions
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
                {/* Right side icons: Profile, Notification, and Settings buttons */}
                <div className="flex items-center space-x-4">
                    {/* Profile button: Opens profile dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 relative"
                        >
                            <ProfileIcon />
                        </button>
                        <ProfileDropdown
                            isOpen={isProfileDropdownOpen}
                            onClose={() => setIsProfileDropdownOpen(false)}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                    {/* Location button: Navigates to location page */}
                    <button
                        onClick={() => {
                            setCurrentPage('location');
                            setIsProfileDropdownOpen(false);
                        }}
                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                        title="Location"
                    >
                        <LocationIcon />
                    </button>
                    {/* Notification button: Navigates to notifications page */}
                    <button
                        onClick={() => {
                            setCurrentPage('notifications');
                            setIsProfileDropdownOpen(false);
                        }}
                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 relative"
                    >
                        <div className="relative">
                            <NotificationIcon />
                            {/* Notification badge - can be shown conditionally */}
                            <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
                        </div>
                    </button>
                    {/* Settings button: Navigates to settings page */}
                    <button
                        onClick={() => {
                            setCurrentPage('settings');
                            setIsProfileDropdownOpen(false);
                        }}
                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                    >
                        <GearIcon />
                    </button>
                </div>
                {/* Mobile menu button: Visible on small screens, not functional yet */}
                <button className="md:hidden ml-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </nav>
        </header>
    );
}

export default Header; // Export the component for use in App.jsx
