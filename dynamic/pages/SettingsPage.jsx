// Settings page - comprehensive settings for the app
// Users can configure language, notifications, preferences, privacy, etc.

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../utils/translations';

function SettingsPage({ setCurrentPage }) {
    const { language, changeLanguage, t } = useLanguage();
    const [activeTab, setActiveTab] = useState('general'); // Which settings tab is open
    
    // General settings (theme, currency, timezone, date format)
    const [theme, setTheme] = useState('dark');
    const [currency, setCurrency] = useState('INR');
    const [timezone, setTimezone] = useState('Asia/Kolkata');
    const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
    
    // Notification preferences
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [bookingUpdates, setBookingUpdates] = useState(true);
    const [promotionalOffers, setPromotionalOffers] = useState(true);
    const [priceAlerts, setPriceAlerts] = useState(true);
    const [newsletter, setNewsletter] = useState(false);
    const [specialDeals, setSpecialDeals] = useState(true);
    
    // Travel preferences (defaults for bookings)
    const [defaultSearchLocation, setDefaultSearchLocation] = useState('');
    const [preferredAirline, setPreferredAirline] = useState('');
    const [seatPreference, setSeatPreference] = useState('window');
    const [mealPreference, setMealPreference] = useState('vegetarian');
    const [baggagePreference, setBaggagePreference] = useState('standard');
    const [classPreference, setClassPreference] = useState('economy');
    const [accessibilityNeeds, setAccessibilityNeeds] = useState(false);
    
    // Privacy settings
    const [profileVisibility, setProfileVisibility] = useState('private');
    const [dataSharing, setDataSharing] = useState(false);
    const [analytics, setAnalytics] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);
    const [cookieConsent, setCookieConsent] = useState(true);
    
    // Account security settings
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [loginAlerts, setLoginAlerts] = useState(true);
    const [autoLogin, setAutoLogin] = useState(false);
    
    const currencies = [
        { code: 'INR', name: 'Indian Rupee (₹)', symbol: '₹' },
        { code: 'USD', name: 'US Dollar ($)', symbol: '$' },
        { code: 'EUR', name: 'Euro (€)', symbol: '€' },
        { code: 'GBP', name: 'British Pound (£)', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen (¥)', symbol: '¥' },
        { code: 'AUD', name: 'Australian Dollar (A$)', symbol: 'A$' },
        { code: 'CAD', name: 'Canadian Dollar (C$)', symbol: 'C$' },
        { code: 'CHF', name: 'Swiss Franc (CHF)', symbol: 'CHF' },
        { code: 'CNY', name: 'Chinese Yuan (¥)', symbol: '¥' },
        { code: 'SGD', name: 'Singapore Dollar (S$)', symbol: 'S$' },
        { code: 'AED', name: 'UAE Dirham (د.إ)', symbol: 'د.إ' },
        { code: 'SAR', name: 'Saudi Riyal (﷼)', symbol: '﷼' },
    ];

    const handleBack = () => {
        setCurrentPage('home');
    };

    const handleSave = () => {
        // Save all settings
        console.log('Saving settings...');
        // You can add API call here to save settings
        alert('Settings saved successfully!');
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all settings to default?')) {
            // Reset all settings to default
            setTheme('dark');
            setCurrency('INR');
            setEmailNotifications(true);
            setSmsNotifications(false);
            setPushNotifications(true);
            // Add more resets as needed
        }
    };

    const tabs = [
        { id: 'general', label: 'General', icon: '⚙️' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'travel', label: 'Travel Preferences', icon: '✈️' },
        { id: 'privacy', label: 'Privacy', icon: '🔒' },
        { id: 'account', label: 'Account', icon: '👤' },
        { id: 'payment', label: 'Payment', icon: '💳' },
    ];

    return (
        <div className="container mx-auto px-6 pt-32 pb-16 min-h-screen">
            <motion.button
                onClick={handleBack}
                className="mb-8 flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                whileHover={{ x: -5 }}
            >
                <ArrowLeftIcon />
                <span>{t('cancel')}</span>
            </motion.button>

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold mb-2">{t('settingsTitle')}</h1>
                    <p className="text-gray-400 mb-8">Manage your preferences and account settings</p>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 font-medium transition-all duration-300 border-b-2 ${
                                    activeTab === tab.id
                                        ? 'border-indigo-500 text-indigo-400'
                                        : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* General Settings Tab */}
                    {activeTab === 'general' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 space-y-6"
                        >
                            <div>
                                <h2 className="text-2xl font-bold mb-6">{t('languageSettings')}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {languages.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                                                language === lang.code
                                                    ? 'border-indigo-500 bg-indigo-500/20'
                                                    : 'border-gray-700 hover:border-gray-600'
                                            }`}
                                        >
                                            <div className="font-semibold">{lang.name}</div>
                                            <div className="text-sm text-gray-400">{lang.nativeName}</div>
                                            {language === lang.code && (
                                                <div className="mt-2 text-indigo-400 text-sm">✓ Selected</div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-6">
                                <h3 className="text-xl font-semibold mb-4">Currency</h3>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="w-full md:w-64 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                >
                                    {currencies.map(curr => (
                                        <option key={curr.code} value={curr.code}>
                                            {curr.name} {curr.symbol}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="border-t border-gray-700 pt-6">
                                <h3 className="text-xl font-semibold mb-4">Theme</h3>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`px-6 py-3 rounded-lg border-2 transition-all ${
                                            theme === 'light'
                                                ? 'border-indigo-500 bg-indigo-500/20'
                                                : 'border-gray-700'
                                        }`}
                                    >
                                        Light Mode
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`px-6 py-3 rounded-lg border-2 transition-all ${
                                            theme === 'dark'
                                                ? 'border-indigo-500 bg-indigo-500/20'
                                                : 'border-gray-700'
                                        }`}
                                    >
                                        Dark Mode
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-6">
                                <h3 className="text-xl font-semibold mb-4">Date & Time</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Timezone</label>
                                        <select
                                            value={timezone}
                                            onChange={(e) => setTimezone(e.target.value)}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                        >
                                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                            <option value="America/New_York">America/New_York (EST)</option>
                                            <option value="Europe/London">Europe/London (GMT)</option>
                                            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                                            <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Date Format</label>
                                        <select
                                            value={dateFormat}
                                            onChange={(e) => setDateFormat(e.target.value)}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                        >
                                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 space-y-6"
                        >
                            <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">Email Notifications</h3>
                                        <p className="text-sm text-gray-400">Receive updates via email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={emailNotifications}
                                            onChange={(e) => setEmailNotifications(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">SMS Notifications</h3>
                                        <p className="text-sm text-gray-400">Receive updates via SMS</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={smsNotifications}
                                            onChange={(e) => setSmsNotifications(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">Push Notifications</h3>
                                        <p className="text-sm text-gray-400">Receive browser push notifications</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={pushNotifications}
                                            onChange={(e) => setPushNotifications(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>

                                <div className="border-t border-gray-700 pt-4 mt-4">
                                    <h3 className="font-semibold mb-4">Notification Types</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span>Booking Updates</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={bookingUpdates}
                                                    onChange={(e) => setBookingUpdates(e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Promotional Offers</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={promotionalOffers}
                                                    onChange={(e) => setPromotionalOffers(e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Price Alerts</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={priceAlerts}
                                                    onChange={(e) => setPriceAlerts(e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Newsletter</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={newsletter}
                                                    onChange={(e) => setNewsletter(e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Special Deals & Discounts</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={specialDeals}
                                                    onChange={(e) => setSpecialDeals(e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Travel Preferences Tab */}
                    {activeTab === 'travel' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 space-y-6"
                        >
                            <h2 className="text-2xl font-bold mb-6">Travel Preferences</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Default Search Location</label>
                                    <input
                                        type="text"
                                        value={defaultSearchLocation}
                                        onChange={(e) => setDefaultSearchLocation(e.target.value)}
                                        placeholder="Enter city or airport code"
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Preferred Airline</label>
                                    <select
                                        value={preferredAirline}
                                        onChange={(e) => setPreferredAirline(e.target.value)}
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                    >
                                        <option value="">No Preference</option>
                                        <option value="indigo">IndiGo</option>
                                        <option value="airindia">Air India</option>
                                        <option value="spicejet">SpiceJet</option>
                                        <option value="vistara">Vistara</option>
                                        <option value="goair">GoAir</option>
                                    </select>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Seat Preference</label>
                                        <select
                                            value={seatPreference}
                                            onChange={(e) => setSeatPreference(e.target.value)}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                        >
                                            <option value="window">Window</option>
                                            <option value="aisle">Aisle</option>
                                            <option value="middle">Middle</option>
                                            <option value="none">No Preference</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Class Preference</label>
                                        <select
                                            value={classPreference}
                                            onChange={(e) => setClassPreference(e.target.value)}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                        >
                                            <option value="economy">Economy</option>
                                            <option value="premium_economy">Premium Economy</option>
                                            <option value="business">Business</option>
                                            <option value="first">First Class</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Meal Preference</label>
                                        <select
                                            value={mealPreference}
                                            onChange={(e) => setMealPreference(e.target.value)}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                        >
                                            <option value="vegetarian">Vegetarian</option>
                                            <option value="non_vegetarian">Non-Vegetarian</option>
                                            <option value="vegan">Vegan</option>
                                            <option value="halal">Halal</option>
                                            <option value="kosher">Kosher</option>
                                            <option value="jain">Jain</option>
                                            <option value="none">No Preference</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Baggage Preference</label>
                                        <select
                                            value={baggagePreference}
                                            onChange={(e) => setBaggagePreference(e.target.value)}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                        >
                                            <option value="standard">Standard (15kg)</option>
                                            <option value="light">Light (10kg)</option>
                                            <option value="heavy">Heavy (20kg+)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">Accessibility Needs</h3>
                                        <p className="text-sm text-gray-400">Request special assistance</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={accessibilityNeeds}
                                            onChange={(e) => setAccessibilityNeeds(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Privacy Tab */}
                    {activeTab === 'privacy' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 space-y-6"
                        >
                            <h2 className="text-2xl font-bold mb-6">Privacy & Security</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Profile Visibility</label>
                                    <select
                                        value={profileVisibility}
                                        onChange={(e) => setProfileVisibility(e.target.value)}
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                    >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                        <option value="friends">Friends Only</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                        <div>
                                            <h3 className="font-semibold">Data Sharing</h3>
                                            <p className="text-sm text-gray-400">Allow sharing data with partners</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={dataSharing}
                                                onChange={(e) => setDataSharing(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                        <div>
                                            <h3 className="font-semibold">Analytics & Tracking</h3>
                                            <p className="text-sm text-gray-400">Help improve our services</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={analytics}
                                                onChange={(e) => setAnalytics(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                        <div>
                                            <h3 className="font-semibold">Marketing Emails</h3>
                                            <p className="text-sm text-gray-400">Receive marketing communications</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={marketingEmails}
                                                onChange={(e) => setMarketingEmails(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                        <div>
                                            <h3 className="font-semibold">Cookie Consent</h3>
                                            <p className="text-sm text-gray-400">Accept cookies for better experience</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={cookieConsent}
                                                onChange={(e) => setCookieConsent(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Account Tab */}
                    {activeTab === 'account' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 space-y-6"
                        >
                            <h2 className="text-2xl font-bold mb-6">Account Security</h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">Two-Factor Authentication</h3>
                                        <p className="text-sm text-gray-400">Add an extra layer of security</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={twoFactorAuth}
                                            onChange={(e) => setTwoFactorAuth(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">Login Alerts</h3>
                                        <p className="text-sm text-gray-400">Get notified of new device logins</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={loginAlerts}
                                            onChange={(e) => setLoginAlerts(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">Auto Login</h3>
                                        <p className="text-sm text-gray-400">Stay logged in on this device</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={autoLogin}
                                            onChange={(e) => setAutoLogin(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Payment Tab */}
                    {activeTab === 'payment' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 space-y-6"
                        >
                            <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-700/30 rounded-lg">
                                    <h3 className="font-semibold mb-4">Saved Payment Methods</h3>
                                    <p className="text-gray-400 text-sm mb-4">No saved payment methods</p>
                                    <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors">
                                        Add Payment Method
                                    </button>
                                </div>

                                <div className="p-4 bg-gray-700/30 rounded-lg">
                                    <h3 className="font-semibold mb-2">Default Payment Method</h3>
                                    <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white">
                                        <option>Select default payment method</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                            {t('reset')}
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors font-semibold"
                        >
                            {t('save')}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default SettingsPage;

