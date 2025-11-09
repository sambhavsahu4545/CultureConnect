// Sign up page - new users create an account here
// Collects user information including name, email, password, address, etc.

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeftIcon } from '../components/Icons';

function SignInPage({ setCurrentPage }) {
    const { t } = useLanguage();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        gender: '',
        address: {
            street: '',
            city: '',
            state: '',
            country: '',
            zipCode: ''
        }
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Update form fields when user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Handle address fields (they're nested in formData.address)
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [addressField]: value
                }
            });
        } else {
            // Handle regular fields
            setFormData({
                ...formData,
                [name]: value
            });
        }
        setError(''); // Clear errors when user types
    };

    // Handle form submission - create new account
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Check password length
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        // Make sure required fields are filled
        if (!formData.gender) {
            setError('Please select your gender');
            return;
        }

        // Make sure address is complete
        if (!formData.address.street || !formData.address.city || !formData.address.state || !formData.address.country) {
            setError('Please fill in all address fields');
            return;
        }

        setLoading(true);

        try {
            const result = await register({
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                password: formData.password,
                gender: formData.gender,
                address: formData.address,
            });

            if (result.success) {
                setCurrentPage('home');
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            // Provide more helpful error messages
            if (err.message.includes('Cannot connect to server')) {
                setError('Backend server is not running. Please start the server and try again.');
            } else if (err.message.includes('fetch')) {
                setError('Network error. Please check your internet connection and make sure the backend server is running.');
            } else {
                setError(err.message || 'Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setCurrentPage('home');
    };

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

            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 max-h-[90vh] overflow-y-auto"
                >
                    <h1 className="text-3xl font-bold mb-2">{t('createAccount')}</h1>
                    <p className="text-gray-400 mb-8">{t('signUpDescription')}</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information Section */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4 text-indigo-400">{t('basicInformation') || 'Basic Information'}</h3>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">{t('fullName')} <span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                placeholder={t('fullName')}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('emailAddress')} <span className="text-red-400">*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                placeholder={t('emailAddress')}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('mobileNumber')} <span className="text-red-400">*</span></label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                placeholder={t('mobileNumber')}
                            />
                        </div>

                        {/* Password Section */}
                        <div className="border-t border-gray-700 pt-6 mt-6">
                            <h3 className="text-lg font-semibold mb-4 text-indigo-400">{t('password')} <span className="text-red-400">*</span></h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('password')} <span className="text-red-400">*</span></label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                placeholder={t('password')}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('confirmPassword')} <span className="text-red-400">*</span></label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                placeholder={t('confirmPassword')}
                            />
                        </div>

                        {/* Personal Information Section */}
                        <div className="border-t border-gray-700 pt-6 mt-6">
                            <h3 className="text-lg font-semibold mb-4 text-indigo-400">{t('personalInformation') || 'Personal Information'}</h3>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium mb-2">{t('gender')} <span className="text-red-400">*</span></label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                            >
                                <option value="">{t('selectGender') || 'Select Gender'}</option>
                                <option value="male">{t('male') || 'Male'}</option>
                                <option value="female">{t('female') || 'Female'}</option>
                                <option value="other">{t('other') || 'Other'}</option>
                            </select>
                        </div>

                        {/* Address Section */}
                        <div className="border-t border-gray-700 pt-6 mt-6">
                            <h3 className="text-lg font-semibold mb-4 text-indigo-400">{t('address')} <span className="text-red-400">*</span></h3>
                            
                            {/* Street Address */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">{t('streetAddress') || 'Street Address'} <span className="text-red-400">*</span></label>
                                <input
                                    type="text"
                                    name="address.street"
                                    value={formData.address.street}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                    placeholder={t('streetAddress') || 'Enter street address'}
                                />
                            </div>

                            {/* City and State in a row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">{t('city') || 'City'} <span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                        placeholder={t('city') || 'City'}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{t('state') || 'State'} <span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        name="address.state"
                                        value={formData.address.state}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                        placeholder={t('state') || 'State'}
                                    />
                                </div>
                            </div>

                            {/* Country and Zip Code */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">{t('country') || 'Country'} <span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        name="address.country"
                                        value={formData.address.country}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                        placeholder={t('country') || 'Country'}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{t('zipCode') || 'Zip Code'}</label>
                                    <input
                                        type="text"
                                        name="address.zipCode"
                                        value={formData.address.zipCode}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                        placeholder={t('zipCode') || 'Zip Code'}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                            {loading ? 'Creating account...' : t('signUp')}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            {t('alreadyHaveAccount')}{' '}
                            <button
                                onClick={() => setCurrentPage('login')}
                                className="text-indigo-400 hover:text-indigo-300 font-medium"
                            >
                                {t('login')}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default SignInPage;

