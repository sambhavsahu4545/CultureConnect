// Hero section - the big banner at the top of the home page
// Shows welcome message and call-to-action buttons

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

function HeroSection({ setCurrentPage }) {
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  
  // Navigate to destinations page
  const handleExploreDestinations = () => {
    setCurrentPage('destinations');
  };

  // Navigate to flights booking page
  const handleBookNow = () => {
    setCurrentPage('flights');
  };

  return (
    <section className="relative h-[100vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 overflow-hidden">
      {/* Text content */}
      <motion.div
        className="md:w-1/2 text-center md:text-left z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {isAuthenticated && user && (
          <motion.p
            className="text-xl md:text-2xl text-indigo-400 mb-4 font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome, {user.name}! 👋
          </motion.p>
        )}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          {t('exploreWorld')} <br />
          <span className="text-indigo-400">{t('embraceCulture')}</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-lg mx-auto md:mx-0">
          {t('heroDescription')}
        </p>
        <div className="mt-8 flex justify-center md:justify-start space-x-4">
          <button 
            onClick={handleExploreDestinations}
            className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 cursor-pointer"
          >
            {t('exploreDestinations')}
          </button>
          <button 
            onClick={handleBookNow}
            className="bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg hover:scale-105 cursor-pointer"
          >
            {t('bookNow')}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
