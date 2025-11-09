// Forgot password page - reset password using OTP
// User enters email/mobile, receives OTP, verifies it, then sets new password

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { authAPI } from '../utils/api';
import { ArrowLeftIcon } from '../components/Icons';

function ForgotPasswordPage({ setCurrentPage }) {
    const { t } = useLanguage();
    const [step, setStep] = useState(1); // Step 1: Enter contact, Step 2: Enter OTP, Step 3: New password
    const [contactType, setContactType] = useState('email'); // 'email' or 'mobile'
    const [formData, setFormData] = useState({
        contact: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    // Update form fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    // Step 1: Send OTP to user's email or mobile
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.forgotPassword(formData.contact, contactType);
            if (response.success) {
                setOtpSent(true);
                setStep(2); // Move to OTP verification step
                // In development mode, OTP is returned in response (for testing)
                if (response.otp) {
                    console.log('OTP (dev only):', response.otp);
                }
            } else {
                setError(response.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify the OTP user entered
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.verifyOTP(formData.contact, contactType, formData.otp);
            if (response.success) {
                setStep(3); // OTP verified, move to password reset step
            } else {
                setError(response.message || 'Invalid OTP');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Set new password after OTP is verified
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');

        // Check if passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.resetPassword(
                formData.contact,
                contactType,
                formData.newPassword
            );
            if (response.success) {
                setCurrentPage('home');
            } else {
                setError(response.message || 'Failed to reset password');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            setCurrentPage('login');
        }
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
                    <h1 className="text-3xl font-bold mb-2">{t('resetPassword')}</h1>
                    <p className="text-gray-400 mb-8">
                        {step === 1 && t('enterEmailOrMobile')}
                        {step === 2 && t('enterOTP') + ' ' + (contactType === 'email' ? t('email') : t('mobile'))}
                        {step === 3 && t('createNewPassword')}
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {otpSent && step === 2 && (
                        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
                            OTP sent successfully! Check your {contactType === 'email' ? 'email' : 'mobile'}.
                        </div>
                    )}

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                                <span className="text-sm font-bold">1</span>
                            </div>
                            <div className={`w-16 h-1 ${step >= 2 ? 'bg-indigo-500' : 'bg-gray-700'}`}></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                                <span className="text-sm font-bold">2</span>
                            </div>
                            <div className={`w-16 h-1 ${step >= 3 ? 'bg-indigo-500' : 'bg-gray-700'}`}></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                                <span className="text-sm font-bold">3</span>
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Enter Contact Information */}
                    {step === 1 && (
                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-4">{t('selectMethod')}</label>
                                <div className="flex space-x-4 mb-4">
                                    <button
                                        type="button"
                                        onClick={() => setContactType('email')}
                                        className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                                            contactType === 'email'
                                                ? 'bg-indigo-500 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    >
                                        {t('email')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setContactType('mobile')}
                                        className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                                            contactType === 'mobile'
                                                ? 'bg-indigo-500 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    >
                                        {t('mobile')}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {contactType === 'email' ? t('emailAddress') : t('mobileNumber')}
                                </label>
                                <input
                                    type={contactType === 'email' ? 'email' : 'tel'}
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                    placeholder={contactType === 'email' ? t('emailAddress') : t('mobileNumber')}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                {loading ? 'Sending...' : t('sendOTP')}
                            </button>
                        </form>
                    )}

                    {/* Step 2: Enter OTP */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">{t('enterOTP')}</label>
                                <input
                                    type="text"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    required
                                    maxLength="6"
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-center text-2xl tracking-widest"
                                    placeholder="000000"
                                />
                                <p className="text-sm text-gray-400 mt-2">
                                    {t('enterOTP')} {contactType === 'email' ? formData.contact : formData.contact}
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                {loading ? 'Verifying...' : t('verifyOTP')}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full text-indigo-400 hover:text-indigo-300 font-medium py-2"
                            >
                                {t('resendOTP')}
                            </button>
                        </form>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">{t('newPassword')}</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                    placeholder={t('newPassword')}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">{t('confirmPassword')}</label>
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                {loading ? 'Resetting...' : t('resetPassword')}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;

