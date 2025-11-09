// Featured destinations section - shows popular travel destinations
// Displays beautiful destination cards with images on the home page

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

function FeaturedDestinationsSection() {
    const { t } = useLanguage();
    
    // Popular destinations to showcase
    const destinations = [
        { nameKey: 'goaBeaches', descriptionKey: 'goaDescription', image: "https://media.istockphoto.com/id/621897226/photo/goa-beach-and-beautiful-sky-india.jpg?s=612x612&w=0&k=20&c=qDkllEUm9UpsXtfPlELdknkHMlgyT-kptQy6vAYFsM8=" },
        { nameKey: 'jaipurRajasthan', descriptionKey: 'jaipurDescription', image: "https://cdn.pixabay.com/photo/2016/06/17/18/45/india-1463837_1280.jpg" },
        { nameKey: 'varanasiGhats', descriptionKey: 'varanasiDescription', image: "https://static.vecteezy.com/system/resources/previews/042/594/744/non_2x/ai-generated-ancient-varanasi-city-generate-ai-photo.jpg" },
        { nameKey: 'keralaBackwaters', descriptionKey: 'keralaDescription', image: "https://wallpaperaccess.com/full/1635203.jpg" },
        { nameKey: 'rishikesh', descriptionKey: 'rishikeshDescription', image: "https://wallpaperaccess.com/full/2351818.jpg" },
        { nameKey: 'jagannathTemple', descriptionKey: 'jagannathDescription', image: "https://www.mypuritour.com/wp-content/uploads/2022/08/puri-tour-2022.jpeg" },
    ];

    return (
        <section className="py-20">
            <h2 className="text-3xl font-bold text-center mb-12">{t('featuredDestinations')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {destinations.map((dest, index) => (
                    <motion.div
                        key={dest.nameKey}
                        className="rounded-xl overflow-hidden relative group bg-cover bg-center h-80 shadow-lg border border-gray-700/50 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-indigo-400/50 hover:-translate-y-2"
                        whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 10 } }}
                        style={{ backgroundImage: `url(${dest.image})` }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h3 className="text-2xl font-bold">{t(dest.nameKey)}</h3>
                            <p className="mt-2 opacity-90">{t(dest.descriptionKey)}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default FeaturedDestinationsSection;
