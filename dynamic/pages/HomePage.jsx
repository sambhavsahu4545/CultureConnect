// Home page - the main landing page of the app
// Shows hero section, services, and featured destinations

import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection.jsx';
import FeaturedDestinationsSection from '../components/FeaturedDestinationsSection';

function HomePage({ setCurrentPage }) {
    return (
        <div className="container mx-auto px-6 pt-32">
            {/* Hero banner at the top with main message */}
            <HeroSection setCurrentPage={setCurrentPage} />
            {/* Services section - flights, hotels, trains, etc. */}
            <ServicesSection setCurrentPage={setCurrentPage} />
            {/* Popular destinations to explore */}
            <FeaturedDestinationsSection />
        </div>
    );
}

export default HomePage; // Export the component for use in App.jsx
