// Booking page - generic booking form for flights, hotels, or trains
// Shows different input fields based on the booking type

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FlightIcon, HotelIcon, TrainIcon } from './Icons';
import InputField from './InputField';

function BookingPage({ type, icon }) {
    const { t } = useLanguage();
    
    // Form state - different fields based on booking type
    const [from, setFrom] = useState(''); // Origin city or hotel location
    const [to, setTo] = useState(''); // Destination city or check-in date
    const [date, setDate] = useState(''); // Departure date or check-out date
    
    // Get the page title based on booking type
    const getTitle = () => {
        if (type === 'Flights') return t('bookFlights');
        if (type === 'Hotels') return t('bookHotels');
        if (type === 'Trains') return t('bookTrains');
        return `Book ${type}`;
    };
    
    // Get button text based on booking type
    const getSearchButtonText = () => {
        if (type === 'Flights') return t('searchFlights');
        if (type === 'Hotels') return t('searchHotels');
        if (type === 'Trains') return t('searchTrains');
        return `${t('search')} ${type}`;
    };
    
    return (
        // Container centers the form vertically and horizontally with padding
        <div className="container mx-auto px-6 pt-32 pb-16 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl">
                {/* Header section with icon, title, and subtitle */}
                <div className="text-center mb-12">
                    <div className="flex justify-center">{icon}</div>
                    <h1 className="text-4xl font-bold">{getTitle()}</h1>
                    <p className="text-gray-400 mt-2">{t('findBestDeals')}</p>
                </div>

                {/* Form container with background, border, padding, and shadow */}
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 shadow-2xl">
                    <form className="space-y-6">
                        {/* Grid layout for input fields */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* "From" or "City or Hotel" input field */}
                            <InputField
                                label={type === 'Hotels' ? t('cityOrHotel') : t('from')}
                                type="text"
                                placeholder={type === 'Hotels' ? "e.g., New York" : "e.g., London"}
                                value={from}
                                onChange={e => setFrom(e.target.value)}
                            />
                            {/* "To" or "Check-in Date" input field */}
                            <InputField
                                label={type === 'Hotels' ? t('checkInDate') : t('to')}
                                type={type === 'Hotels' ? "date" : "text"}
                                placeholder={type === 'Hotels' ? "" : "e.g., Paris"}
                                value={to}
                                onChange={e => setTo(e.target.value)}
                            />
                        </div>
                        {/* "Check-out Date" or "Departure Date" input field */}
                        <InputField
                            label={type === 'Hotels' ? t('checkOutDate') : t('departureDate')}
                            type="date"
                            placeholder=""
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                        {/* Passengers input field, only for Flights and Trains */}
                        {type !== 'Hotels' && (
                            <InputField
                                label={t('passengers')}
                                type="number"
                                placeholder="1"
                            />
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-indigo-500/30"
                        >
                            {getSearchButtonText()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookingPage; // Export the component for use in routing
