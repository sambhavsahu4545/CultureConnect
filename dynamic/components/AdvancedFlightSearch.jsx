import React, { useState } from 'react';
import { motion } from 'framer-motion';

function AdvancedFlightSearch({ onSearch }) {
    const [tripType, setTripType] = useState('round-trip');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departDate, setDepartDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [classType, setClassType] = useState('economy');

    const handleSearch = (e) => {
        e.preventDefault();
        const searchData = {
            tripType,
            from,
            to,
            departDate,
            returnDate: tripType === 'round-trip' ? returnDate : null,
            passengers,
            classType
        };
        onSearch(searchData);
    };

    return (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 shadow-2xl">
            <form onSubmit={handleSearch} className="space-y-6">
                {/* Trip Type */}
                <div className="flex space-x-4">
                    {['round-trip', 'one-way', 'multi-city'].map(type => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setTripType(type)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                tripType === type
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {type.replace('-', ' ').toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* From and To */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">From</label>
                        <input
                            type="text"
                            placeholder="e.g., New York (NYC)"
                            value={from}
                            onChange={e => setFrom(e.target.value)}
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">To</label>
                        <input
                            type="text"
                            placeholder="e.g., London (LHR)"
                            value={to}
                            onChange={e => setTo(e.target.value)}
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Departure Date</label>
                        <input
                            type="date"
                            value={departDate}
                            onChange={e => setDepartDate(e.target.value)}
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        />
                    </div>
                    {tripType === 'round-trip' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Return Date</label>
                            <input
                                type="date"
                                value={returnDate}
                                onChange={e => setReturnDate(e.target.value)}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            />
                        </div>
                    )}
                </div>

                {/* Passengers and Class */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Passengers</label>
                        <select
                            value={passengers}
                            onChange={e => setPassengers(parseInt(e.target.value))}
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Class</label>
                        <select
                            value={classType}
                            onChange={e => setClassType(e.target.value)}
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        >
                            <option value="economy">Economy</option>
                            <option value="premium-economy">Premium Economy</option>
                            <option value="business">Business</option>
                            <option value="first">First Class</option>
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <motion.button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-indigo-500/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Search Flights
                </motion.button>
            </form>
        </div>
    );
}

export default AdvancedFlightSearch;
