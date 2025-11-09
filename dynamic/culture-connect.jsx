// Culture Connect: A Dynamic Travel Website inspired by modern web animations.
// This single file contains the entire React application.
// To run this:
// 1. You'll need a basic HTML file (like index.html).
// 2. Include the following scripts in your HTML's <head> section:
//    <!-- React Libraries -->
//    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
//    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
//    <!-- Babel to compile JSX in the browser -->
//    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
//    <!-- Tailwind CSS for styling -->
//    <script src="https://cdn.tailwindcss.com"></script>
//    <!-- Framer Motion for animations -->
//    <script src="https://cdn.jsdelivr.net/npm/framer-motion@4.1.17/dist/framer-motion.js"></it>
//    <!-- Three.js for 3D globe -->
//    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
// 3. Add a <div> with id="root" in your HTML's <body>.
// 4. Add this entire file's content into a <script type="text/babel"> tag in your HTML body.

const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = Motion;

//============================================
// 1. MAIN APP COMPONENT
//============================================
// This is the root component that manages the state of the entire application,
// such as the current page being displayed.
function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoading, setIsLoading] = useState(true);

    // Simulate a loading screen for a better user experience
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    // Function to render the correct page based on the state
    const renderPage = () => {
        switch (currentPage) {
            case 'flights':
                return <BookingPage type="Flights" icon={<FlightIcon />} />;
            case 'hotels':
                return <BookingPage type="Hotels" icon={<HotelIcon />} />;
            case 'trains':
                return <BookingPage type="Trains" icon={<TrainIcon />} />;
            case 'destinations':
                return <DestinationsPage />;
            case 'profile':
                 return <ProfilePage />;
            case 'home':
            default:
                return <HomePage />;
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans antialiased relative overflow-x-hidden">
            {/* Background decorative gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] bg-gradient-to-tl from-teal-500/20 via-transparent to-transparent rounded-full filter blur-3xl opacity-40 animate-pulse delay-1000"></div>
            </div>

            <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    {/* We use the currentPage as a key to trigger animations on page change */}
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {renderPage()}
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}


//============================================
// 2. UI & REUSABLE COMPONENTS
//============================================

// --- Loading Screen Component ---
// This provides a visually appealing loading state when the app first loads.
function LoadingScreen() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="text-center"
            >
                <Logo large />
                <motion.p 
                    className="mt-4 text-lg text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Connecting Cultures, One Journey at a Time.
                </motion.p>
            </motion.div>
        </div>
    );
}

// --- Header Component ---
// Contains the logo and navigation links. It's fixed at the top.
function Header({ setCurrentPage, currentPage }) {
    const navItems = ['home', 'flights', 'hotels', 'trains', 'destinations', 'profile'];
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/50 backdrop-blur-lg">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="cursor-pointer" onClick={() => setCurrentPage('home')}>
                    <Logo />
                </div>
                <ul className="hidden md:flex items-center space-x-8">
                    {navItems.map(item => (
                        <li key={item} className="relative">
                            <button
                                onClick={() => setCurrentPage(item)}
                                className={`capitalize text-sm font-medium transition-colors duration-300 ${currentPage === item ? 'text-indigo-400' : 'text-gray-300 hover:text-indigo-400'}`}
                            >
                                {item}
                            </button>
                            {/* Animated underline for the active item */}
                            {currentPage === item && (
                                <motion.div
                                    className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-indigo-400"
                                    layoutId="underline"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
                <button className="md:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </nav>
        </header>
    );
}

// --- Footer Component ---
// A standard footer for the bottom of the page.
function Footer() {
    return (
        <footer className="relative z-10 border-t border-gray-800/50 mt-20">
            <div className="container mx-auto px-6 py-8 text-center text-gray-500">
                <Logo small/>
                 <p className="mt-4 text-sm">
                    Connecting Cultures, One Journey at a Time.
                </p>
                <div className="mt-4 flex justify-center space-x-6">
                   <a href="#" className="hover:text-indigo-400 transition-colors">Facebook</a>
                   <a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a>
                   <a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a>
                </div>
                <p className="mt-6 text-xs">&copy; {new Date().getFullYear()} Culture Connect. All rights reserved.</p>
            </div>
        </footer>
    );
}

// --- Logo Component ---
// A reusable SVG-based logo for the company.
function Logo({ large = false, small = false }) {
    const sizeClass = large ? 'h-12' : small ? 'h-6' : 'h-8';
    return (
        <div className="flex items-center space-x-3">
            <svg className={`${sizeClass} w-auto text-indigo-400`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12ZM7.05025 7.05025C6.65973 7.44077 6.65973 8.07394 7.05025 8.46447C7.44077 8.85499 8.07394 8.85499 8.46447 8.46447C8.85499 8.07394 8.85499 7.44077 8.46447 7.05025C8.07394 6.65973 7.44077 6.65973 7.05025 7.05025ZM15.5355 15.5355C15.145 15.9261 15.145 16.5592 15.5355 16.9497C15.9261 17.3403 16.5592 17.3403 16.9497 16.9497C17.3403 16.5592 17.3403 15.9261 16.9497 15.5355C16.5592 15.145 15.9261 15.145 15.5355 15.5355ZM7.05025 16.9497C6.65973 16.5592 6.65973 15.9261 7.05025 15.5355C7.44077 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497C8.07394 17.3403 7.44077 17.3403 7.05025 16.9497ZM15.5355 8.46447C15.145 8.07394 15.145 7.44077 15.5355 7.05025C15.9261 6.65973 16.5592 6.65973 16.9497 7.05025C17.3403 7.44077 17.3403 8.07394 16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z"/>
            </svg>
            <span className={`font-bold tracking-wider ${large ? 'text-4xl' : small ? 'text-lg' : 'text-2xl'}`}>
                Culture Connect
            </span>
        </div>
    );
}

// --- Icons ---
// A collection of simple SVG icons for different services.
const FlightIcon = () => <svg className="w-8 h-8 mb-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>;
const HotelIcon = () => <svg className="w-8 h-8 mb-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>;
const TrainIcon = () => <svg className="w-8 h-8 mb-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zm-8-2c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zm16 0c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zM3 11h18v6H3v-6zm16-4V3H5v4h14z"></path></svg>;


//============================================
// 3. PAGE COMPONENTS
//============================================

// --- Home Page ---
// This is the main landing page, featuring the 3D globe and key info.
function HomePage() {
    return (
        <div className="container mx-auto px-6 pt-32">
            <HeroSection />
            <ServicesSection />
            <FeaturedDestinationsSection />
        </div>
    );
}

// --- Hero Section (on Home Page) ---
// The main attention-grabbing section with the 3D globe.
function HeroSection() {
    return (
        <section className="h-[80vh] flex flex-col md:flex-row items-center justify-between">
            <motion.div 
                className="md:w-1/2 text-center md:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    Explore the World. <br />
                    <span className="text-indigo-400">Embrace the Culture.</span>
                </h1>
                <p className="mt-6 text-lg text-gray-400 max-w-lg mx-auto md:mx-0">
                    We specialize in creating unforgettable travel experiences that connect you with the heart of each destination. Your next great adventure starts here.
                </p>
                <div className="mt-8 flex justify-center md:justify-start space-x-4">
                    <button className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-indigo-500/30">
                        Explore Destinations
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg">
                        Book Now
                    </button>
                </div>
            </motion.div>
            <div className="md:w-1/2 h-full w-full mt-8 md:mt-0">
                 <Globe />
            </div>
        </section>
    );
}

// --- 3D Globe Component ---
// This uses three.js to render an interactive globe.
function Globe() {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);
        
        // Globe geometry and material
        const geometry = new THREE.SphereGeometry(2.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x6366f1, // indigo-500
            wireframe: true,
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Point lights for a cool effect
        const light1 = new THREE.PointLight(0x818cf8, 2, 100); // indigo-400
        light1.position.set(10, 10, 10);
        scene.add(light1);
        
        const light2 = new THREE.PointLight(0x34d399, 2, 100); // teal-400
        light2.position.set(-10, -10, -5);
        scene.add(light2);

        camera.position.z = 5;

        // Mouse interaction variables
        let isMouseDown = false;
        let previousMousePosition = { x: 0, y: 0 };

        const onMouseDown = (event) => {
            isMouseDown = true;
        };

        const onMouseUp = () => {
            isMouseDown = false;
        };

        const onMouseMove = (event) => {
            if (!isMouseDown) return;

            const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y,
            };
            
            sphere.rotation.y += deltaMove.x * 0.005;
            sphere.rotation.x += deltaMove.y * 0.005;

            previousMousePosition = {
                x: event.clientX,
                y: event.clientY,
            };
        };
        
        mountRef.current.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        mountRef.current.addEventListener('mousemove', onMouseMove);

        // Animation loop
        const animate = function () {
            requestAnimationFrame(animate);
            if (!isMouseDown) {
              sphere.rotation.y += 0.001; // Auto-rotate
            }
            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mouseup', onMouseUp);
            if (mountRef.current) {
                mountRef.current.removeEventListener('mousedown', onMouseDown);
                mountRef.current.removeEventListener('mousemove', onMouseMove);
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing"/>;
}


// --- Services Section (on Home Page) ---
// Displays cards for Flights, Hotels, and Trains.
function ServicesSection() {
    const services = [
        { name: 'Flights', icon: <FlightIcon />, description: 'Book international and domestic flights with the best deals.' },
        { name: 'Hotels', icon: <HotelIcon />, description: 'Find the perfect stay from our curated list of hotels.' },
        { name: 'Trains', icon: <TrainIcon />, description: 'Explore scenic routes and cities by train.' },
    ];
    return (
        <section className="mt-20 py-20">
            <h2 className="text-3xl font-bold text-center mb-2">Discover Our Services</h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">We provide a complete solution for your travel needs, ensuring a seamless experience from start to finish.</p>
            <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={service.name}
                        className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 text-center hover:border-indigo-400/50 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        {service.icon}
                        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                        <p className="text-gray-400 text-sm">{service.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// --- Featured Destinations Section (on Home Page) ---
function FeaturedDestinationsSection() {
     const destinations = [
        { name: "Kyoto, Japan", image: "https://placehold.co/600x400/1f2937/a78bfa?text=Kyoto", description: "Experience ancient temples, beautiful gardens, and traditional geishas." },
        { name: "Santorini, Greece", image: "https://placehold.co/600x400/1f2937/a78bfa?text=Santorini", description: "Famous for its stunning sunsets, white-washed villages, and blue-domed churches." },
        { name: "Machu Picchu, Peru", image: "https://placehold.co/600x400/1f2937/a78bfa?text=Machu+Picchu", description: "Discover the mysterious and breathtaking ancient Incan citadel high in the Andes." },
    ];

    return (
        <section className="py-20">
             <h2 className="text-3xl font-bold text-center mb-12">Featured Destinations</h2>
             <div className="grid md:grid-cols-3 gap-8">
                {destinations.map((dest, index) => (
                    <motion.div 
                        key={dest.name}
                        className="rounded-xl overflow-hidden relative group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                    >
                         <img src={dest.image} alt={dest.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                         <div className="absolute bottom-0 left-0 p-6">
                            <h3 className="text-2xl font-bold">{dest.name}</h3>
                            <p className="text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{dest.description}</p>
                         </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}


// --- Booking Page ---
// A generic page for booking Flights, Hotels, or Trains.
function BookingPage({ type, icon }) {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    
    return (
        <div className="container mx-auto px-6 pt-32 pb-16 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-12">
                     <div className="flex justify-center">{icon}</div>
                    <h1 className="text-4xl font-bold">Book {type}</h1>
                    <p className="text-gray-400 mt-2">Find the best deals for your next journey.</p>
                </div>

                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 shadow-2xl">
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                           <InputField label={type === 'Hotels' ? "City or Hotel" : "From"} type="text" placeholder={type === 'Hotels' ? "e.g., New York" : "e.g., London"} value={from} onChange={e => setFrom(e.target.value)}/>
                           <InputField label={type === 'Hotels' ? "Check-in Date" : "To"} type={type === 'Hotels' ? "date" : "text"} placeholder={type === 'Hotels' ? "" : "e.g., Paris"} value={to} onChange={e => setTo(e.target.value)}/>
                        </div>
                         <InputField label={type === 'Hotels' ? "Check-out Date" : "Departure Date"} type="date" placeholder="" value={date} onChange={e => setDate(e.target.value)} />
                         {type !== 'Hotels' && <InputField label="Passengers" type="number" placeholder="1" />}

                        <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-indigo-500/30">
                            Search {type}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

// --- Input Field for Booking Forms ---
const InputField = ({ label, type, placeholder, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        <input 
            type={type} 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
    </div>
);


// --- Destinations Page ---
// A full page showcasing various destinations.
function DestinationsPage() {
    const destinations = [
        { name: "Paris, France", image: "https://placehold.co/600x800/1f2937/a78bfa?text=Paris", category: "Europe" },
        { name: "Rome, Italy", image: "https://placehold.co/600x800/1f2937/a78bfa?text=Rome", category: "Europe" },
        { name: "Bali, Indonesia", image: "https://placehold.co/600x800/1f2937/a78bfa?text=Bali", category: "Asia" },
        { name: "New York, USA", image: "https://placehold.co/600x800/1f2937/a78bfa?text=New+York", category: "North America" },
        { name: "Cairo, Egypt", image: "https://placehold.co/600x800/1f2937/a78bfa?text=Cairo", category: "Africa" },
        { name: "Rio de Janeiro, Brazil", image: "https://placehold.co/600x800/1f2937/a78bfa?text=Rio", category: "South America" },
    ];

    return (
         <div className="container mx-auto px-6 pt-32 pb-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">Explore Destinations</h1>
                <p className="text-gray-400 mt-2">Find your next adventure from our curated list of world-class locations.</p>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                 {destinations.map((dest, index) => (
                    <motion.div
                        key={index}
                        className="rounded-xl overflow-hidden relative group break-inside-avoid"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                         <img src={dest.image} alt={dest.name} className="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                         <div className="absolute bottom-0 left-0 p-6">
                            <span className="text-xs bg-indigo-500/50 text-white py-1 px-3 rounded-full">{dest.category}</span>
                            <h3 className="text-2xl font-bold mt-2">{dest.name}</h3>
                         </div>
                    </motion.div>
                 ))}
            </div>
         </div>
    );
}

// --- Profile Page ---
// A placeholder for the user profile section.
function ProfilePage() {
    return (
        <div className="container mx-auto px-6 pt-32 pb-16 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md text-center">
                 <h1 className="text-4xl font-bold mb-4">My Profile</h1>
                 <p className="text-gray-400 mb-8">This is where user information and booking history would be displayed.</p>
                 <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8">
                    <img src="https://placehold.co/128x128/1f2937/a78bfa?text=User" alt="User Avatar" className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-indigo-400" />
                    <h2 className="text-2xl font-semibold">John Doe</h2>
                    <p className="text-indigo-400">john.doe@example.com</p>
                    <button className="mt-8 w-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg">
                        Sign Out
                    </button>
                 </div>
            </div>
        </div>
    );
}


//============================================
// 4. RENDER THE APP
//============================================
// This line finds the 'root' div in your HTML and renders the main App component into it.
ReactDOM.render(<App />, document.getElementById('root'));
