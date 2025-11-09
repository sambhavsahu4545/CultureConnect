// Footer.jsx
// This component renders the footer section at the bottom of the page.
// It includes a small logo, a tagline, social media links, and copyright information.

import React from 'react'; // React for building the component
import { useLanguage } from '../contexts/LanguageContext'; // Language context
import Logo from './Logo.jsx'; // Logo component, rendered small in the footer

// Footer functional component
function Footer() {
    const { t } = useLanguage();
    
    return (
        // Footer element with top border and margin for spacing
        <footer className="relative z-10 border-t border-gray-800/50 mt-20">
            {/* Container centers content and applies padding */}
            <div className="container mx-auto px-6 py-8 text-center text-gray-500">
                {/* Small logo for branding */}
                <Logo small/>
                {/* Tagline text */}
                <p className="mt-4 text-sm">
                    {t('footerTagline')}
                </p>
                {/* Social media links with hover color transition */}
                <div className="mt-4 flex justify-center space-x-6">
                   <a href="#" className="hover:text-indigo-400 transition-colors">{t('facebook')}</a>
                   <a href="#" className="hover:text-indigo-400 transition-colors">{t('instagram')}</a>
                   <a href="#" className="hover:text-indigo-400 transition-colors">{t('twitter')}</a>
                </div>
                {/* Copyright notice with current year */}
                <p className="mt-6 text-xs">&copy; {new Date().getFullYear()} Culture Connect. {t('allRightsReserved')}</p>
            </div>
        </footer>
    );
}

export default Footer; // Export the component for use in App.jsx or other pages
