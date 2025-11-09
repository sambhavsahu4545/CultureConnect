// App.jsx
// This is the main root component of the travel booking application.
// It manages the global state including the current page, loading state, search data, and settings modal.
// It handles page navigation, search submissions, and renders the appropriate page component based on the current state.
// Uses Framer Motion for smooth page transitions and AnimatePresence for exit animations.

import React, { useState, useEffect } from 'react'; // React hooks for state and side effects
import { motion, AnimatePresence } from 'framer-motion'; // Animation library for page transitions
import { LanguageProvider } from './contexts/LanguageContext.jsx'; // Language context provider
import { AuthProvider } from './contexts/AuthContext.jsx'; // Auth context provider
import Header from './components/Header.jsx'; // Navigation header component
import Footer from './components/Footer.jsx'; // Footer component
import HomePage from './pages/HomePage.jsx'; // Home page component
import BookingPage from './components/BookingPage.jsx'; // Generic booking page for flights, hotels, trains
import DestinationsPage from './pages/DestinationsPage.jsx'; // Destinations listing page
import DestinationDetailPage from './pages/DestinationDetailPage.jsx'; // Destination detail page
import FlightResultsPage from './pages/FlightResultsPage.jsx'; // Flight search results page
import CarRentalsPage from './pages/CarRentalsPage.jsx'; // Car rentals page
import TourPackagesPage from './pages/TourPackagesPage.jsx'; // Tour packages page
import CruisesPage from './pages/CruisesPage.jsx'; // Cruises page
import AdvancedFlightSearch from './components/AdvancedFlightSearch.jsx'; // Advanced search component (not used in renderPage?)
import { FlightIcon, HotelIcon, TrainIcon } from './components/Icons.jsx'; // Icon components for services
import LoadingScreen from './components/LoadingScreen.jsx'; // Loading screen during app initialization
import ProfilePage from './components/ProfilePage.jsx'; // User profile page
import SettingsPage from './pages/SettingsPage.jsx'; // Settings page
import SignInPage from './pages/SignInPage.jsx'; // Sign up page
import LoginPage from './pages/LoginPage.jsx'; // Login page
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'; // Forgot password page
import NotificationsPage from './pages/NotificationsPage.jsx'; // Notifications page
import LocationPage from './pages/LocationPage.jsx'; // Location page
import ApiTestPage from './pages/ApiTestPage.jsx'; // API test page for debugging

// App functional component - the root of the application
function App() {
    // State for the current page being displayed (e.g., 'home', 'flights', 'hotels')
    const [currentPage, setCurrentPage] = useState('home');
    // State for loading screen visibility during app initialization
    const [isLoading, setIsLoading] = useState(true);
    // State to store search data from flight searches, passed to FlightResultsPage
    const [searchData, setSearchData] = useState(null);
    // State to store selected destination for detail page
    const [selectedDestination, setSelectedDestination] = useState(null);

    // useEffect to simulate loading time on app start, hides loading screen after 2.5 seconds
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    // Function to handle search submission from search components
    // Sets search data and navigates to flight results page
    const handleSearch = (data) => {
        setSearchData(data);
        setCurrentPage('flight-results');
    };


    // Function to render the appropriate page component based on currentPage state
    // Uses a switch statement to map page keys to components
    const renderPage = () => {
        switch (currentPage) {
            case 'flights':
                return <BookingPage type="Flights" icon={<FlightIcon />} />; // Flights booking page
            case 'hotels':
                return <BookingPage type="Hotels" icon={<HotelIcon />} />; // Hotels booking page
            case 'trains':
                return <BookingPage type="Trains" icon={<TrainIcon />} />; // Trains booking page
            case 'car-rentals':
                return <CarRentalsPage />; // Car rentals page
            case 'tour-packages':
                return <TourPackagesPage />; // Tour packages page
            case 'cruises':
                return <CruisesPage />; // Cruises page
            case 'destinations':
                return <DestinationsPage setCurrentPage={setCurrentPage} setSelectedDestination={setSelectedDestination} />; // Destinations listing page
            case 'destination-detail':
                return <DestinationDetailPage destination={selectedDestination} setCurrentPage={setCurrentPage} />; // Destination detail page
            case 'profile':
                return <ProfilePage setCurrentPage={setCurrentPage} />; // User profile page
            case 'signin':
                return <SignInPage setCurrentPage={setCurrentPage} />; // Sign up page
            case 'login':
                return <LoginPage setCurrentPage={setCurrentPage} />; // Login page
            case 'forgot-password':
                return <ForgotPasswordPage setCurrentPage={setCurrentPage} />; // Forgot password page
            case 'notifications':
                return <NotificationsPage setCurrentPage={setCurrentPage} />; // Notifications page
            case 'settings':
                return <SettingsPage setCurrentPage={setCurrentPage} />; // Settings page
            case 'location':
                return <LocationPage setCurrentPage={setCurrentPage} />; // Location page
            case 'api-test':
                return <ApiTestPage />; // API test page for debugging
            case 'flight-results':
                return <FlightResultsPage searchData={searchData} />; // Flight search results with data
            case 'home':
            default:
                return <HomePage setCurrentPage={setCurrentPage} />; // Default home page
        }
    };

    // If still loading, show loading screen
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Main JSX return: Renders the app layout with background, header, animated main content, footer
    return (
        <AuthProvider>
            <LanguageProvider>
                {/* Root div with dark theme styling, full height, and overflow hidden for background effects */}
                <div className="bg-gray-900 text-white min-h-screen font-sans antialiased relative overflow-x-hidden">
                    {/* Decorative background gradients for visual appeal */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                        <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
                        <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] bg-gradient-to-tl from-teal-500/20 via-transparent to-transparent rounded-full filter blur-3xl opacity-40 animate-pulse delay-1000"></div>
                    </div>

                    {/* Header component with navigation and settings button */}
                    <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    {/* Main content area with higher z-index to appear above background */}
                    <main className="relative z-10">
                        {/* AnimatePresence for managing enter/exit animations of pages */}
                        <AnimatePresence mode="wait">
                            {/* Animated div for page transitions: fades and slides on page change */}
                            <motion.div
                                key={currentPage} // Key changes trigger re-animation
                                initial={{ opacity: 0, y: 20 }} // Initial state: invisible and slightly down
                                animate={{ opacity: 1, y: 0 }} // Animate to visible and normal position
                                exit={{ opacity: 0, y: -20 }} // Exit animation: fade out and slide up
                                transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                            >
                                {renderPage()} {/* Render the current page component */}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                    {/* Footer component at the bottom */}
                    <Footer />
                </div>
            </LanguageProvider>
        </AuthProvider>
    );
}

export default App;
