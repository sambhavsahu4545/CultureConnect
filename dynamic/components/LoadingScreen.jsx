// Loading screen - shows when app is first loading
// Displays logo with animation to make the wait feel shorter

import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo.jsx';

function LoadingScreen() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            {/* Animated logo that fades in and scales up */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="text-center"
            >
                <Logo large />
                {/* Tagline that fades in after logo */}
                <motion.p
                    className="mt-4 text-lg text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Connecting Cultures, One Journey at a Time.
                </motion.p>
            </motion.div>
        </div>
    );
}

export default LoadingScreen;
