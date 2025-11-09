import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// --- Cruises Page ---
function CruisesPage() {
    const { t } = useLanguage();
    
    const cruises = [
        { name: 'Mediterranean Cruise', description: 'Sail through the beautiful Mediterranean Sea.' },
        { name: 'Caribbean Adventure', description: 'Explore tropical islands in the Caribbean.' },
        { name: 'Alaska Glacier Tour', description: 'Witness stunning glaciers and wildlife.' },
        { name: 'Transatlantic Voyage', description: 'Cross the Atlantic with luxury amenities.' },
    ];

    return (
        <div className="container mx-auto px-6 pt-32 pb-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">{t('cruises') || 'Cruises'}</h1>
                <p className="text-gray-400 mt-2">{t('cruisesService')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {cruises.map((cruise, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <h3 className="text-xl font-bold mb-2">{cruise.name}</h3>
                        <p className="text-gray-400 text-sm">{cruise.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default CruisesPage;
