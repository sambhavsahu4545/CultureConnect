// Login page - existing users can log in here
// User enters email and password to access their account

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeftIcon } from '../components/Icons';

function LoginPage({ setCurrentPage }) {
    const { t } = useLanguage();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Update form fields when user types
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear any error messages when user starts typing
    };

    // Handle form submission - try to log in
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                // Login successful, go to home page
                setCurrentPage('home');
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            // Show helpful error messages based on what went wrong
            if (err.message.includes('Cannot connect to server')) {
                setError('Backend server is not running. Please start the server and try again.');
            } else if (err.message.includes('fetch')) {
                setError('Network error. Please check your internet connection and make sure the backend server is running.');
            } else {
                setError(err.message || 'Login failed. Please try again.');
            }
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
            <motion.button
                onClick={handleBack}
                className="mb-8 flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                whileHover={{ x: -5 }}
            >
                <ArrowLeftIcon />
                <span>{t('cancel')}</span>
            </motion.button>

            <div className="max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8"
                >
                    <h1 className="text-3xl font-bold mb-2">{t('welcomeBack')}</h1>
                    <p className="text-gray-400 mb-8">{t('loginDescription')}</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">{t('emailAddress')}</label>
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
                            <label className="block text-sm font-medium mb-2">{t('password')}</label>
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded" />
                                <span className="text-sm text-gray-400">{t('rememberMe')}</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => setCurrentPage('forgot-password')}
                                className="text-sm text-indigo-400 hover:text-indigo-300"
                            >
                                {t('forgotPassword')}?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                            {loading ? 'Logging in...' : t('login')}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            {t('dontHaveAccount')}{' '}
                            <button
                                onClick={() => setCurrentPage('signin')}
                                className="text-indigo-400 hover:text-indigo-300 font-medium"
                            >
                                {t('signUp')}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default LoginPage;

