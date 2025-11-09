import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// --- Tour Packages Page ---
function TourPackagesPage() {
    const { t } = useLanguage();
    
    const packages = [
        { name: 'European Adventure', description: 'Explore the best of Europe with guided tours.' },
        { name: 'Asian Discovery', description: 'Discover the wonders of Asia with cultural experiences.' },
        { name: 'American Road Trip', description: 'Cross-country adventures in the USA.' },
        { name: 'African Safari', description: 'Wildlife and nature tours in Africa.' },
    ];

    return (
        <div className="container mx-auto px-6 pt-32 pb-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">{t('tourPackages')}</h1>
                <p className="text-gray-400 mt-2">{t('tourPackagesService')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {packages.map((pkg, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                        <p className="text-gray-400 text-sm">{pkg.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default TourPackagesPage;
