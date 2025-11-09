// Services section - shows all booking options on home page
// Displays cards for flights, hotels, trains, car rentals, tours, and cruises

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FlightIcon, HotelIcon, TrainIcon, CarRentalIcon, TourPackageIcon, CruiseIcon } from './Icons';

function ServicesSection({ setCurrentPage }) {
    const { t } = useLanguage();
    
    // List of services to display
    const services = [
        { nameKey: 'flights', icon: <FlightIcon />, descriptionKey: 'flightsService', pageKey: 'flights' },
        { nameKey: 'hotels', icon: <HotelIcon />, descriptionKey: 'hotelsService', pageKey: 'hotels' },
        { nameKey: 'trains', icon: <TrainIcon />, descriptionKey: 'trainsService', pageKey: 'trains' },
        { nameKey: 'carRentals', icon: <CarRentalIcon />, descriptionKey: 'carRentalsService', pageKey: 'car-rentals' },
        { nameKey: 'tourPackages', icon: <TourPackageIcon />, descriptionKey: 'tourPackagesService', pageKey: 'tour-packages' },
        { nameKey: 'cruises', icon: <CruiseIcon />, descriptionKey: 'cruisesService', pageKey: 'cruises' },
    ];
    
    return (
        <section className="mt-20 py-20">
            <h2 className="text-3xl font-bold text-center mb-2">{t('discoverOurServices')}</h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">{t('servicesDescription')}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={service.nameKey}
                        className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center hover:border-indigo-400 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => {
                            setCurrentPage(service.pageKey);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setCurrentPage(service.pageKey);
                            }
                        }}
                    >
                        {service.icon}
                        <h3 className="text-xl font-bold mb-2">{t(service.nameKey)}</h3>
                        <p className="text-gray-400 text-sm">{t(service.descriptionKey)}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default ServicesSection;
