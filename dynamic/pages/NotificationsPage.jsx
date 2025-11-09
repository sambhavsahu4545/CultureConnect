// Notifications page - shows all user notifications
// Displays booking confirmations, offers, reminders, etc.

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeftIcon } from '../components/Icons';

function NotificationsPage({ setCurrentPage }) {
    const { t } = useLanguage();
    // Sample notifications (in real app, these would come from API)
    const [notifications] = useState([
        {
            id: 1,
            type: 'booking',
            title: 'Booking Confirmed',
            message: 'Your flight to Jaipur has been confirmed. Booking ID: ABC123',
            time: '2 hours ago',
            read: false
        },
        {
            id: 2,
            type: 'offer',
            title: 'Special Offer',
            message: 'Get 20% off on your next hotel booking. Use code: HOTEL20',
            time: '5 hours ago',
            read: false
        },
        {
            id: 3,
            type: 'reminder',
            title: 'Payment Reminder',
            message: 'Complete your payment for Delhi to Mumbai train booking',
            time: '1 day ago',
            read: true
        },
        {
            id: 4,
            type: 'update',
            title: 'Trip Update',
            message: 'Your Kerala backwater tour has been updated. Check details.',
            time: '2 days ago',
            read: true
        },
        {
            id: 5,
            type: 'promotion',
            title: 'New Destination Added',
            message: 'Explore the new destination: Rishikesh. Book now and get exclusive deals!',
            time: '3 days ago',
            read: true
        }
    ]);

    const handleBack = () => {
        setCurrentPage('home');
    };

    const unreadCount = notifications.filter(n => !n.read).length;

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
                >
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">{t('notificationsTitle')}</h1>
                        {unreadCount > 0 && (
                            <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {unreadCount} {t('newNotifications')}
                            </span>
                        )}
                    </div>

                    <div className="space-y-4">
                        {notifications.map((notification, index) => (
                            <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-gray-800/50 border rounded-xl p-6 cursor-pointer hover:bg-gray-800 transition-all duration-300 ${
                                    notification.read
                                        ? 'border-gray-700/50'
                                        : 'border-indigo-500/50 bg-indigo-500/10'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-lg">{notification.title}</h3>
                                            {!notification.read && (
                                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                            )}
                                        </div>
                                        <p className="text-gray-400 mb-2">{notification.message}</p>
                                        <p className="text-sm text-gray-500">{notification.time}</p>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full ${
                                        notification.type === 'booking' ? 'bg-green-500' :
                                        notification.type === 'offer' ? 'bg-yellow-500' :
                                        notification.type === 'reminder' ? 'bg-red-500' :
                                        notification.type === 'update' ? 'bg-blue-500' :
                                        'bg-purple-500'
                                    }`}></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {notifications.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-400 text-lg">{t('noNotifications')}</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default NotificationsPage;

