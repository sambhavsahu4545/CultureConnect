import React, { useState } from 'react';
import { motion } from 'framer-motion';

function FlightResultsPage({ searchData }) {
    const [sortBy, setSortBy] = useState('price');
    const [filterStops, setFilterStops] = useState('all');
    const [filterAirlines, setFilterAirlines] = useState([]);

    // Mock flight data
    const mockFlights = [
        {
            id: 1,
            airline: 'Air India',
            flightNumber: 'AI 301',
            departure: { time: '08:00', airport: 'DEL' },
            arrival: { time: '10:30', airport: 'BOM' },
            duration: '2h 30m',
            stops: 0,
            price: 4500,
            class: 'Economy'
        },
        {
            id: 2,
            airline: 'Indigo',
            flightNumber: '6E 205',
            departure: { time: '14:15', airport: 'DEL' },
            arrival: { time: '16:45', airport: 'BOM' },
            duration: '2h 30m',
            stops: 0,
            price: 3800,
            class: 'Economy'
        },
        {
            id: 3,
            airline: 'Vistara',
            flightNumber: 'UK 801',
            departure: { time: '18:30', airport: 'DEL' },
            arrival: { time: '21:00', airport: 'BOM' },
            duration: '2h 30m',
            stops: 0,
            price: 5200,
            class: 'Business'
        },
        {
            id: 4,
            airline: 'SpiceJet',
            flightNumber: 'SG 101',
            departure: { time: '06:45', airport: 'DEL' },
            arrival: { time: '11:15', airport: 'BOM' },
            duration: '4h 30m',
            stops: 1,
            price: 3200,
            class: 'Economy'
        }
    ];

    const filteredFlights = mockFlights
        .filter(flight => filterStops === 'all' || flight.stops === parseInt(filterStops))
        .filter(flight => filterAirlines.length === 0 || filterAirlines.includes(flight.airline))
        .sort((a, b) => {
            if (sortBy === 'price') return a.price - b.price;
            if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
            if (sortBy === 'departure') return a.departure.time.localeCompare(b.departure.time);
            return 0;
        });

    return (
        <div className="container mx-auto px-6 pt-32 pb-16">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Flight Results</h1>
                <p className="text-gray-400">
                    {searchData.from} to {searchData.to} • {searchData.departDate} • {searchData.passengers} passenger{searchData.passengers > 1 ? 's' : ''} • {searchData.classType}
                </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Filters</h3>

                        {/* Stops Filter */}
                        <div className="mb-6">
                            <h4 className="font-medium mb-2">Stops</h4>
                            <select
                                value={filterStops}
                                onChange={e => setFilterStops(e.target.value)}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="all">All</option>
                                <option value="0">Non-stop</option>
                                <option value="1">1 stop</option>
                                <option value="2">2+ stops</option>
                            </select>
                        </div>

                        {/* Airlines Filter */}
                        <div className="mb-6">
                            <h4 className="font-medium mb-2">Airlines</h4>
                            {['Air India', 'Indigo', 'Vistara', 'SpiceJet'].map(airline => (
                                <label key={airline} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        checked={filterAirlines.includes(airline)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setFilterAirlines([...filterAirlines, airline]);
                                            } else {
                                                setFilterAirlines(filterAirlines.filter(a => a !== airline));
                                            }
                                        }}
                                        className="mr-2"
                                    />
                                    {airline}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-3">
                    {/* Sort Options */}
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-400">{filteredFlights.length} flights found</p>
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="bg-gray-800/50 border border-gray-700/50 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="price">Sort by Price</option>
                            <option value="duration">Sort by Duration</option>
                            <option value="departure">Sort by Departure</option>
                        </select>
                    </div>

                    {/* Flight Cards */}
                    <div className="space-y-4">
                        {filteredFlights.map(flight => (
                            <motion.div
                                key={flight.id}
                                className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-indigo-400/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold">{flight.airline}</h3>
                                                <p className="text-gray-400">{flight.flightNumber}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold">₹{flight.price}</p>
                                                <p className="text-sm text-gray-400">{flight.class}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-center">
                                                <p className="text-xl font-semibold">{flight.departure.time}</p>
                                                <p className="text-sm text-gray-400">{flight.departure.airport}</p>
                                            </div>

                                            <div className="flex-1 mx-4">
                                                <div className="flex items-center">
                                                    <div className="flex-1 border-t border-gray-600"></div>
                                                    <div className="px-2 text-xs text-gray-400">
                                                        {flight.duration} • {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                                                    </div>
                                                    <div className="flex-1 border-t border-gray-600"></div>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <p className="text-xl font-semibold">{flight.arrival.time}</p>
                                                <p className="text-sm text-gray-400">{flight.arrival.airport}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ml-6">
                                        <button className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-bold py-2 px-6 rounded-lg">
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlightResultsPage;
