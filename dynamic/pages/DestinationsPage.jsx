import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// --- Destinations Page ---
// A full page showcasing various Indian destinations.
function DestinationsPage({ setCurrentPage, setSelectedDestination }) {
    const { t } = useLanguage();
    const [visibleCount, setVisibleCount] = useState(9); // Initially show 9 destinations

    const allDestinations = [
        { 
            id: 'goa',
            name: "Goa", 
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop&q=80", 
            category: "Beaches",
            state: "Goa"
        },
        { 
            id: 'jaipur',
            name: "Jaipur", 
            image: "https://blog.yatradham.org/wp-content/uploads/2023/07/jaipur.jpg", 
            category: "Heritage",
            state: "Rajasthan"
        },
        { 
            id: 'varanasi',
            name: "Varanasi", 
            image: "https://www.visittnt.com/images/aarti.jpg", 
            category: "Spiritual",
            state: "Uttar Pradesh"
        },
        { 
            id: 'kerala',
            name: "Kerala Backwaters", 
            image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&auto=format&fit=crop&q=80", 
            category: "Nature",
            state: "Kerala"
        },
        { 
            id: 'rishikesh',
            name: "Rishikesh", 
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80", 
            category: "Yoga & Adventure",
            state: "Uttarakhand"
        },
        { 
            id: 'agra',
            name: "Agra", 
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80", 
            category: "Monument",
            state: "Uttar Pradesh"
        },
        { 
            id: 'darjeeling',
            name: "Darjeeling", 
            image: "https://wallpaperaccess.com/full/4136691.jpg", 
            category: "Hill Station",
            state: "West Bengal"
        },
        { 
            id: 'mumbai',
            name: "Mumbai", 
            image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&auto=format&fit=crop&q=80", 
            category: "Metropolitan",
            state: "Maharashtra"
        },
        { 
            id: 'amritsar',
            name: "Amritsar", 
            image: "https://tse3.mm.bing.net/th/id/OIP.YSASx5D22SHNVoSC4hSI4gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3", 
            category: "Religious",
            state: "Punjab"
        },
        { 
            id: 'puri',
            name: "Puri", 
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Odisha"
        },
        { 
            id: 'udaipur',
            name: "Udaipur", 
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80", 
            category: "Heritage",
            state: "Rajasthan"
        },
        { 
            id: 'khajuraho',
            name: "Khajuraho", 
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Madhya Pradesh"
        },
        { 
            id: 'hampi',
            name: "Hampi", 
            image: "https://images.unsplash.com/photo-1587502537100-aac0f307b672?w=800&auto=format&fit=crop&q=80", 
            category: "Heritage",
            state: "Karnataka"
        },
        { 
            id: 'mysore',
            name: "Mysore", 
            image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&auto=format&fit=crop&q=80", 
            category: "Heritage",
            state: "Karnataka"
        },
        { 
            id: 'tirupati',
            name: "Tirupati", 
            image: "https://images.unsplash.com/photo-1594736797933-d0e013b3f9b9?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Andhra Pradesh"
        },
        { 
            id: 'dwarka',
            name: "Dwarka", 
            image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Gujarat"
        },
        { 
            id: 'badrinath',
            name: "Badrinath", 
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Uttarakhand"
        },
        { 
            id: 'kedarnath',
            name: "Kedarnath", 
            image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Uttarakhand"
        },
        { 
            id: 'somnath',
            name: "Somnath", 
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Gujarat"
        },
        { 
            id: 'mathura',
            name: "Mathura", 
            image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Uttar Pradesh"
        },
        { 
            id: 'ayodhya',
            name: "Ayodhya", 
            image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Uttar Pradesh"
        },
        { 
            id: 'konark',
            name: "Konark", 
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Odisha"
        },
        { 
            id: 'mahabalipuram',
            name: "Mahabalipuram", 
            image: "https://images.unsplash.com/photo-1587502537100-aac0f307b672?w=800&auto=format&fit=crop&q=80", 
            category: "Heritage",
            state: "Tamil Nadu"
        },
        { 
            id: 'thanjavur',
            name: "Thanjavur", 
            image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Tamil Nadu"
        },
        { 
            id: 'madurai',
            name: "Madurai", 
            image: "https://images.unsplash.com/photo-1594736797933-d0e013b3f9b9?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Tamil Nadu"
        },
        { 
            id: 'pushkar',
            name: "Pushkar", 
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Rajasthan"
        },
        { 
            id: 'haridwar',
            name: "Haridwar", 
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80", 
            category: "Spiritual",
            state: "Uttarakhand"
        },
        { 
            id: 'shirdi',
            name: "Shirdi", 
            image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Maharashtra"
        },
        { 
            id: 'vaishnodevi',
            name: "Vaishno Devi", 
            image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Jammu & Kashmir"
        },
        { 
            id: 'vrindavan',
            name: "Vrindavan", 
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80", 
            category: "Temple",
            state: "Uttar Pradesh"
        }
    ];

    const visibleDestinations = allDestinations.slice(0, visibleCount);
    const hasMore = visibleCount < allDestinations.length;

    const handleDestinationClick = (destination) => {
        setSelectedDestination(destination);
        setCurrentPage('destination-detail');
    };

    const handleViewMore = () => {
        setVisibleCount(prev => Math.min(prev + 9, allDestinations.length));
    };

    return (
         <div className="container mx-auto px-6 pt-32 pb-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">{t('exploreIndianDestinations')}</h1>
                <p className="text-gray-400 mt-2">{t('destinationsDescription')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {visibleDestinations.map((dest, index) => (
                    <motion.div
                        key={dest.id}
                        className="rounded-xl overflow-hidden relative group break-inside-avoid cursor-pointer h-[400px]"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        onClick={() => handleDestinationClick(dest)}
                        whileHover={{ scale: 1.05 }}
                    >
                         <img 
                            src={dest.image} 
                            alt={dest.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            loading="lazy"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                         <div className="absolute bottom-0 left-0 right-0 p-6">
                            <span className="text-xs bg-indigo-500/80 text-white py-1 px-3 rounded-full font-medium">{dest.category}</span>
                            <h3 className="text-2xl font-bold mt-2 text-white">{dest.name}</h3>
                            <p className="text-sm text-gray-300 mt-1">{dest.state}</p>
                         </div>
                         <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-indigo-500/90 text-white px-4 py-2 rounded-full text-sm font-medium">
                                {t('viewDetails')} →
                            </div>
                         </div>
                    </motion.div>
                 ))}
            </div>

            {/* View More Button */}
            {hasMore && (
                <motion.div 
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.button
                        onClick={handleViewMore}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('viewMoreDestinations')}
                    </motion.button>
                </motion.div>
            )}
         </div>
    );
}

export default DestinationsPage;
