import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// --- Car Rentals Page ---
function CarRentalsPage() {
    const { t } = useLanguage();
    
    const rentals = [
        { name: 'Economy Car', description: 'Affordable and fuel-efficient cars for city travel.' },
        { name: 'SUV', description: 'Spacious SUVs for family trips and off-road adventures.' },
        { name: 'Luxury Car', description: 'Premium cars for a comfortable and stylish ride.' },
        { name: 'Convertible', description: 'Enjoy the open air with our convertible options.' },
    ];

    return (
        <div className="container mx-auto px-6 pt-32 pb-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">{t('carRentals')}</h1>
                <p className="text-gray-400 mt-2">{t('carRentalsService')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {rentals.map((rental, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <h3 className="text-xl font-bold mb-2">{rental.name}</h3>
                        <p className="text-gray-400 text-sm">{rental.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default CarRentalsPage;
