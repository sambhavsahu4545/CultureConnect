import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeftIcon } from '../components/Icons';

// --- Destination Detail Page ---
// Shows detailed information about a selected destination
function DestinationDetailPage({ destination, setCurrentPage }) {
    const { t } = useLanguage();
    // Detailed information for each destination
    const destinationInfo = {
        goa: {
            title: "Goa - The Beach Paradise",
            description: "Goa is India's smallest state and is known for its pristine beaches, vibrant nightlife, and Portuguese-influenced architecture. It's a perfect blend of sun, sand, and culture.",
            highlights: [
                "Famous Beaches: Calangute, Baga, Anjuna, Vagator",
                "Portuguese Heritage: Old Goa churches and architecture",
                "Water Sports: Parasailing, jet skiing, scuba diving",
                "Spice Plantations: Explore aromatic spice farms",
                "Wildlife Sanctuaries: Bhagwan Mahavir and Cotigao"
            ],
            bestTime: "November to February (winter season)",
            attractions: [
                "Dudhsagar Falls - Spectacular four-tiered waterfall",
                "Basilica of Bom Jesus - UNESCO World Heritage Site",
                "Aguada Fort - 17th-century Portuguese fort",
                "Anjuna Flea Market - Shopping and local crafts",
                "Spice Plantations - Guided tours of spice gardens"
            ],
            activities: "Beach activities, water sports, sightseeing, nightlife, temple visits",
            cuisine: "Goan Fish Curry, Bebinca, Feni, Prawn Balchão, Sorpotel"
        },
        jaipur: {
            title: "Jaipur - The Pink City",
            description: "Jaipur, the capital of Rajasthan, is known as the Pink City due to the distinctive color of its buildings. It's a city of palaces, forts, and rich royal heritage.",
            highlights: [
                "Amber Fort - Majestic hilltop fort with intricate architecture",
                "City Palace - Royal residence with museums and courtyards",
                "Hawa Mahal - Iconic palace of winds with 953 windows",
                "Jantar Mantar - Ancient astronomical observatory",
                "Nahargarh Fort - Overlooking the entire city"
            ],
            bestTime: "October to March (pleasant weather)",
            attractions: [
                "Amber Fort - UNESCO World Heritage Site with stunning views",
                "City Palace Complex - Blend of Rajput and Mughal architecture",
                "Jantar Mantar - Largest stone astronomical observatory",
                "Hawa Mahal - Five-story palace built for royal women",
                "Jaigarh Fort - Houses the world's largest cannon on wheels"
            ],
            activities: "Palace tours, fort visits, shopping at local markets, camel rides, cultural shows",
            cuisine: "Dal Baati Churma, Gatte Ki Sabzi, Laal Maas, Ker Sangri, Ghevar"
        },
        varanasi: {
            title: "Varanasi - The Spiritual Capital",
            description: "Varanasi, one of the oldest continuously inhabited cities in the world, is the spiritual capital of India. Situated on the banks of the Ganges, it's a city of temples, ghats, and enlightenment.",
            highlights: [
                "Ganga Aarti - Mesmerizing evening ritual on the ghats",
                "Kashi Vishwanath Temple - One of the most sacred Shiva temples",
                "Sarnath - Buddhist pilgrimage site where Buddha gave his first sermon",
                "Boat Rides - Sunrise and sunset cruises on the Ganges",
                "Ancient Ghats - 88 ghats along the river for rituals and meditation"
            ],
            bestTime: "October to March (cool weather, ideal for spiritual visits)",
            attractions: [
                "Dashashwamedh Ghat - Main ghat with spectacular Ganga Aarti",
                "Kashi Vishwanath Temple - Golden temple dedicated to Lord Shiva",
                "Sarnath - Ancient Buddhist site with stupas and monasteries",
                "Ramnagar Fort - 18th-century fort with a museum",
                "Bharat Mata Mandir - Temple with a relief map of India"
            ],
            activities: "Ganga Aarti, temple visits, boat rides, meditation, yoga, silk shopping",
            cuisine: "Kachori Sabzi, Choora Matar, Malaiyyo, Baati Chokha, Lassi"
        },
        kerala: {
            title: "Kerala Backwaters - God's Own Country",
            description: "Kerala's backwaters are a network of interconnected canals, rivers, lakes, and inlets. This serene network provides a unique ecosystem and a tranquil way to experience South Indian culture.",
            highlights: [
                "Houseboat Stays - Overnight stays on traditional Kettuvallams",
                "Alleppey Backwaters - Most popular backwater destination",
                "Kumarakom - Bird sanctuary and luxury resorts",
                "Kuttanad - Rice bowl of Kerala with paddy fields",
                "Traditional Villages - Experience local life and culture"
            ],
            bestTime: "November to February (pleasant climate, ideal for backwater cruises)",
            attractions: [
                "Alleppey (Alappuzha) - Venice of the East with extensive canals",
                "Kumarakom Bird Sanctuary - Home to migratory and resident birds",
                "Vembanad Lake - Longest lake in India",
                "Kuttanad - Unique below-sea-level farming region",
                "Marari Beach - Pristine beach near backwaters"
            ],
            activities: "Houseboat cruises, canoe rides, village tours, bird watching, ayurvedic treatments",
            cuisine: "Kerala Sadya, Appam with Stew, Karimeen Pollichathu, Puttu and Kadala, Fish Curry"
        },
        rishikesh: {
            title: "Rishikesh - Yoga Capital of the World",
            description: "Rishikesh, nestled in the foothills of the Himalayas, is renowned as the yoga capital of the world. It's a spiritual hub with ashrams, temples, and adventure sports on the Ganges.",
            highlights: [
                "Yoga Ashrams - World-famous centers for yoga and meditation",
                "Lakshman Jhula - Iconic suspension bridge over the Ganges",
                "River Rafting - Thrilling white-water rafting experiences",
                "Beatles Ashram - Where the Beatles stayed in 1968",
                "Ganga Aarti - Evening prayers by the river"
            ],
            bestTime: "March to April and September to November (ideal weather for activities)",
            attractions: [
                "Lakshman Jhula and Ram Jhula - Historic suspension bridges",
                "Triveni Ghat - Main ghat for Ganga Aarti",
                "Neelkanth Mahadev Temple - Sacred temple dedicated to Shiva",
                "Beatles Ashram (Chaurasi Kutia) - Abandoned ashram with Beatles history",
                "Kunjapuri Temple - Sunrise views of the Himalayas"
            ],
            activities: "Yoga and meditation, river rafting, bungee jumping, trekking, temple visits",
            cuisine: "Sattvic Food, Aloo Puri, Kachori, Lassi, Fresh Fruit Juices, Organic Meals"
        },
        agra: {
            title: "Agra - City of the Taj Mahal",
            description: "Agra is home to one of the Seven Wonders of the World - the Taj Mahal. This Mughal-era city is rich in history and architectural marvels from the golden age of the Mughal Empire.",
            highlights: [
                "Taj Mahal - Iconic marble mausoleum, symbol of eternal love",
                "Agra Fort - Massive red sandstone fort and UNESCO World Heritage Site",
                "Fatehpur Sikri - Abandoned Mughal city with stunning architecture",
                "Itmad-ud-Daulah - Baby Taj, a precursor to the Taj Mahal",
                "Mehtab Bagh - Perfect spot for Taj Mahal sunset views"
            ],
            bestTime: "October to March (cool weather, clear skies for Taj Mahal views)",
            attractions: [
                "Taj Mahal - UNESCO World Heritage Site and one of the New Seven Wonders",
                "Agra Fort - Red sandstone fort with palaces and mosques",
                "Fatehpur Sikri - Ghost city with beautiful Mughal architecture",
                "Itmad-ud-Daulah's Tomb - Often called the Jewel Box",
                "Akbar's Tomb - Final resting place of Emperor Akbar"
            ],
            activities: "Monument visits, heritage walks, marble inlay shopping, photography, cultural shows",
            cuisine: "Agra Petha, Mughlai Cuisine, Bedai and Jalebi, Dalmoth, Tandoori Chicken"
        },
        darjeeling: {
            title: "Darjeeling - Queen of the Hills",
            description: "Darjeeling, nestled in the Eastern Himalayas, is famous for its tea plantations, stunning mountain views, and the iconic Darjeeling Himalayan Railway. It offers breathtaking views of Mount Kanchenjunga.",
            highlights: [
                "Toy Train - UNESCO World Heritage narrow-gauge railway",
                "Tiger Hill - Sunrise views of Mount Kanchenjunga and Mount Everest",
                "Tea Plantations - Visit famous tea estates and learn tea processing",
                "Darjeeling Zoo - Home to red pandas and Himalayan animals",
                "Peace Pagoda - Buddhist stupa with panoramic views"
            ],
            bestTime: "March to May and September to November (clear skies, pleasant weather)",
            attractions: [
                "Tiger Hill - Famous sunrise point with mountain views",
                "Darjeeling Himalayan Railway - UNESCO World Heritage toy train",
                "Tea Gardens - Stroll through lush tea plantations",
                "Padmaja Naidu Himalayan Zoological Park - Red panda conservation",
                "Ghoom Monastery - Oldest Tibetan Buddhist monastery"
            ],
            activities: "Toy train ride, sunrise viewing, tea garden tours, trekking, shopping for tea and handicrafts",
            cuisine: "Momos, Thukpa, Darjeeling Tea, Wai Wai Noodles, Churpee, Sael Roti"
        },
        mumbai: {
            title: "Mumbai - The City of Dreams",
            description: "Mumbai, India's financial capital, is a bustling metropolis that never sleeps. It's a city of contrasts - from colonial architecture to modern skyscrapers, from Bollywood to street food.",
            highlights: [
                "Gateway of India - Iconic monument and meeting point",
                "Marine Drive - Queen's Necklace, beautiful sea-facing promenade",
                "Bollywood - Film city tours and studio visits",
                "Elephanta Caves - Ancient rock-cut cave temples",
                "Colaba Causeway - Shopping and dining hub"
            ],
            bestTime: "November to February (pleasant weather, ideal for sightseeing)",
            attractions: [
                "Gateway of India - Historical monument built in 1924",
                "Marine Drive - 3.6 km long boulevard along the Arabian Sea",
                "Elephanta Caves - UNESCO World Heritage Site with ancient sculptures",
                "Chhatrapati Shivaji Maharaj Terminus - UNESCO World Heritage railway station",
                "Haji Ali Dargah - Mosque located on an islet"
            ],
            activities: "City tours, Bollywood studio visits, street food tours, shopping, nightlife, beach visits",
            cuisine: "Vada Pav, Pav Bhaji, Bhel Puri, Seafood, Misal Pav, Ragda Pattice"
        },
        amritsar: {
            title: "Amritsar - The Golden City",
            description: "Amritsar is the spiritual and cultural center of the Sikh religion. Home to the magnificent Golden Temple, it's a city that embodies peace, harmony, and the rich Sikh heritage.",
            highlights: [
                "Golden Temple - Holiest Sikh shrine, stunning architecture",
                "Wagah Border - Ceremonial border closing ceremony",
                "Jallianwala Bagh - Historical memorial of the 1919 massacre",
                "Partition Museum - Documents the partition of India",
                "Guru-ka-Langar - Community kitchen serving free meals"
            ],
            bestTime: "October to March (pleasant weather, ideal for temple visits)",
            attractions: [
                "Harmandir Sahib (Golden Temple) - Most sacred Sikh shrine",
                "Jallianwala Bagh - Memorial park with historical significance",
                "Wagah Border - Daily flag-lowering ceremony",
                "Partition Museum - First museum dedicated to partition",
                "Akal Takht - One of the five seats of power in Sikhism"
            ],
            activities: "Temple visits, langar experience, border ceremony, historical tours, shopping for handicrafts",
            cuisine: "Amritsari Kulcha, Lassi, Makke di Roti and Sarson da Saag, Tandoori Chicken, Phirni"
        },
        puri: {
            title: "Puri - Abode of Lord Jagannath",
            description: "Puri is one of the four sacred Char Dham pilgrimage sites and home to the famous Jagannath Temple. It's a major spiritual destination on the eastern coast of India with beautiful beaches and ancient temples.",
            highlights: [
                "Jagannath Temple - One of the Char Dham pilgrimage sites",
                "Rath Yatra - Famous chariot festival attracting millions",
                "Puri Beach - Golden sand beach perfect for relaxation",
                "Konark Sun Temple - UNESCO World Heritage Site nearby",
                "Chilika Lake - Largest brackish water lagoon in Asia"
            ],
            bestTime: "October to February (pleasant weather for temple visits)",
            attractions: [
                "Jagannath Temple - 12th-century temple dedicated to Lord Jagannath",
                "Puri Beach - Popular beach with golden sands and clear waters",
                "Chilika Lake - Famous for migratory birds and Irrawaddy dolphins",
                "Konark Sun Temple - Architectural marvel shaped like a chariot",
                "Gundicha Temple - Garden house of Lord Jagannath"
            ],
            activities: "Temple darshan, beach activities, bird watching, boating in Chilika, witnessing Rath Yatra",
            cuisine: "Mahaprasad, Chhena Poda, Rasabali, Dalma, Pakhala Bhata"
        },
        udaipur: {
            title: "Udaipur - City of Lakes",
            description: "Udaipur, known as the Venice of the East, is famous for its beautiful lakes, magnificent palaces, and rich Rajput heritage. It's a romantic city with stunning architecture and scenic beauty.",
            highlights: [
                "Lake Pichola - Iconic artificial lake with palaces",
                "City Palace - Largest palace complex in Rajasthan",
                "Jag Mandir - Island palace on Lake Pichola",
                "Monsoon Palace - Hilltop palace with panoramic views",
                "Traditional Rajasthani Culture - Rich heritage and art"
            ],
            bestTime: "September to March (pleasant weather, ideal for sightseeing)",
            attractions: [
                "City Palace - Grand palace complex overlooking Lake Pichola",
                "Lake Pichola - Scenic lake with boat rides and palace views",
                "Jag Mandir - Beautiful island palace in the lake",
                "Monsoon Palace (Sajjangarh) - Hilltop fort with city views",
                "Saheliyon Ki Bari - Beautiful garden with fountains and kiosks"
            ],
            activities: "Palace tours, boat rides, shopping for handicrafts, cultural shows, photography",
            cuisine: "Dal Baati Churma, Gatte Ki Sabzi, Laal Maas, Ker Sangri, Kesar Kulfi"
        },
        khajuraho: {
            title: "Khajuraho - Temple City of India",
            description: "Khajuraho is famous for its group of Hindu and Jain temples, known for their intricate erotic sculptures. These UNESCO World Heritage Sites are masterpieces of Indian architecture and art.",
            highlights: [
                "Khajuraho Temples - UNESCO World Heritage Site with intricate carvings",
                "Kandariya Mahadev Temple - Largest and most ornate temple",
                "Chitragupta Temple - Dedicated to the Sun God",
                "Archaeological Museum - Collection of sculptures and artifacts",
                "Sound and Light Show - Evening cultural presentation"
            ],
            bestTime: "October to March (cool weather, ideal for temple visits)",
            attractions: [
                "Kandariya Mahadev Temple - Most magnificent temple with 900 sculptures",
                "Lakshmana Temple - Well-preserved temple with beautiful carvings",
                "Vishvanatha Temple - Shiva temple with impressive architecture",
                "Chitragupta Temple - Unique temple dedicated to Surya (Sun God)",
                "Archaeological Museum - Houses ancient sculptures and artifacts"
            ],
            activities: "Temple tours, photography, museum visits, sound and light shows, local shopping",
            cuisine: "Dal Baati Churma, Poha, Kachori, Lassi, Traditional Madhya Pradesh thali"
        },
        hampi: {
            title: "Hampi - Ruins of Vijayanagara Empire",
            description: "Hampi is a UNESCO World Heritage Site and the ruins of the ancient Vijayanagara Empire. It's a vast archaeological site with stunning temples, palaces, and monuments set against a dramatic landscape of boulders.",
            highlights: [
                "Virupaksha Temple - Living temple dedicated to Lord Shiva",
                "Vittala Temple - Famous for stone chariot and musical pillars",
                "Hampi Bazaar - Ancient market street",
                "Lotus Mahal - Beautiful palace with lotus-like architecture",
                "Sunrise and Sunset Views - Spectacular views from Matanga Hill"
            ],
            bestTime: "October to March (pleasant weather for exploration)",
            attractions: [
                "Virupaksha Temple - Active temple and main shrine of Hampi",
                "Vittala Temple - Architectural marvel with musical pillars",
                "Hampi Bazaar - Long street with ancient structures",
                "Lotus Mahal - Unique palace resembling a lotus flower",
                "Elephant Stables - Impressive domed structures for royal elephants"
            ],
            activities: "Temple visits, photography, coracle rides, rock climbing, cycling tours",
            cuisine: "South Indian Thali, Dosa, Idli, Bisi Bele Bath, Filter Coffee"
        },
        mysore: {
            title: "Mysore - City of Palaces",
            description: "Mysore is known for its grand palaces, especially the magnificent Mysore Palace, and the famous Dasara festival. It's a city of royal heritage, art, and culture in Karnataka.",
            highlights: [
                "Mysore Palace - Magnificent royal residence with Indo-Saracenic architecture",
                "Dasara Festival - Grand 10-day festival celebration",
                "Chamundi Hill - Sacred hill with temple and panoramic views",
                "Brindavan Gardens - Beautiful terraced gardens with musical fountains",
                "Mysore Silk - Famous for its quality silk sarees"
            ],
            bestTime: "October to March (pleasant weather, Dasara festival in October)",
            attractions: [
                "Mysore Palace - Stunning palace illuminated on Sundays and during Dasara",
                "Chamundi Hill - Sacred hill with Chamundeshwari Temple and Nandi statue",
                "Brindavan Gardens - Terraced gardens with musical fountain shows",
                "St. Philomena's Church - Neo-Gothic church with beautiful architecture",
                "Jaganmohan Palace - Art gallery and cultural center"
            ],
            activities: "Palace tours, temple visits, shopping for silk, garden walks, cultural shows",
            cuisine: "Mysore Masala Dosa, Bisi Bele Bath, Mysore Pak, Ragi Mudde, Filter Coffee"
        },
        tirupati: {
            title: "Tirupati - Abode of Lord Venkateswara",
            description: "Tirupati is home to the famous Tirumala Venkateswara Temple, one of the richest and most visited Hindu temples in the world. It's a major pilgrimage destination in South India.",
            highlights: [
                "Tirumala Venkateswara Temple - Most visited and richest temple in India",
                "Tirumala Hills - Scenic hills with multiple viewpoints",
                "Silathoranam - Natural rock arch formation",
                "Sri Padmavathi Temple - Temple dedicated to Goddess Padmavathi",
                "Akasa Ganga - Beautiful waterfall in Tirumala"
            ],
            bestTime: "October to March (pleasant weather for pilgrimage)",
            attractions: [
                "Tirumala Venkateswara Temple - Sacred temple of Lord Balaji",
                "Silathoranam - Natural arch formation, unique geological wonder",
                "Sri Padmavathi Ammavari Temple - Temple of the divine consort",
                "Akasa Ganga - Scenic waterfall near the temple",
                "Tirupati Balaji Museum - Museum showcasing temple history"
            ],
            activities: "Temple darshan, hill trekking, temple visits, shopping for laddu prasadam",
            cuisine: "Tirupati Laddu, Pongal, Dosa, Traditional Andhra meals, Pulihora"
        },
        dwarka: {
            title: "Dwarka - Kingdom of Lord Krishna",
            description: "Dwarka is one of the Char Dham pilgrimage sites and one of the Sapta Puri (seven holy cities). It's believed to be the ancient kingdom of Lord Krishna and holds immense spiritual significance.",
            highlights: [
                "Dwarkadhish Temple - Main temple dedicated to Lord Krishna",
                "Bet Dwarka - Island temple accessible by boat",
                "Rukmini Temple - Temple dedicated to Krishna's consort",
                "Nageshwar Jyotirlinga - One of the 12 Jyotirlingas",
                "Gomti Ghat - Sacred ghat for rituals and ceremonies"
            ],
            bestTime: "October to March (pleasant weather for temple visits)",
            attractions: [
                "Dwarkadhish Temple - Ancient temple also known as Jagat Mandir",
                "Bet Dwarka - Island with temple dedicated to Lord Krishna",
                "Rukmini Temple - Beautiful temple 2 km from main temple",
                "Nageshwar Jyotirlinga - One of the sacred 12 Jyotirlingas",
                "Gomti Ghat - Sacred ghat for taking holy dip"
            ],
            activities: "Temple darshan, boat rides to Bet Dwarka, beach visits, spiritual activities",
            cuisine: "Gujarati Thali, Dhokla, Fafda, Khandvi, Traditional Gujarati sweets"
        },
        badrinath: {
            title: "Badrinath - Sacred Char Dham Site",
            description: "Badrinath is one of the four Char Dham pilgrimage sites and is dedicated to Lord Vishnu. Located in the Garhwal Himalayas, it's one of the most important pilgrimage destinations for Hindus.",
            highlights: [
                "Badrinath Temple - Sacred temple dedicated to Lord Vishnu",
                "Tapt Kund - Hot water spring for ritual bath",
                "Mana Village - Last village before Tibet border",
                "Vasudhara Falls - Beautiful waterfall near Mana village",
                "Brahma Kapal - Sacred platform for performing last rites"
            ],
            bestTime: "May to June and September to October (temple open during these months)",
            attractions: [
                "Badrinath Temple - Main temple with black stone idol of Lord Vishnu",
                "Tapt Kund - Natural hot water spring with therapeutic properties",
                "Mana Village - Last inhabited village on Indo-Tibet border",
                "Vasudhara Falls - Scenic waterfall 5 km from Mana village",
                "Charan Paduka - Rock with footprints of Lord Vishnu"
            ],
            activities: "Temple darshan, trekking, visiting nearby villages, spiritual activities",
            cuisine: "Simple vegetarian meals, Local Garhwali cuisine, Prashad from temple"
        },
        kedarnath: {
            title: "Kedarnath - Abode of Lord Shiva",
            description: "Kedarnath is one of the Char Dham and one of the 12 Jyotirlingas. Located at an altitude of 3,583 meters, it's one of the most sacred Shiva temples and requires a challenging trek to reach.",
            highlights: [
                "Kedarnath Temple - Sacred Jyotirlinga temple of Lord Shiva",
                "Trekking Route - 16 km trek from Gaurikund",
                "Gandhi Sarovar - Beautiful glacial lake",
                "Vasuki Tal - High altitude lake",
                "Shankaracharya Samadhi - Final resting place of Adi Shankaracharya"
            ],
            bestTime: "May to June and September to October (temple open during these months)",
            attractions: [
                "Kedarnath Temple - Ancient stone temple dedicated to Lord Shiva",
                "Gandhi Sarovar - Serene lake with crystal clear water",
                "Vasuki Tal - High altitude lake at 4,135 meters",
                "Shankaracharya Samadhi - Memorial of the great philosopher",
                "Bhairav Temple - Temple of Bhairavnath, protector of Kedarnath"
            ],
            activities: "Temple darshan, trekking, photography, spiritual activities, visiting nearby lakes",
            cuisine: "Simple vegetarian meals, Garhwali thali, Prashad from temple"
        },
        somnath: {
            title: "Somnath - First Among Twelve Jyotirlingas",
            description: "Somnath Temple is one of the 12 Jyotirlingas and is considered the first among them. Located on the western coast, it has been destroyed and rebuilt several times, symbolizing resilience and faith.",
            highlights: [
                "Somnath Temple - First of the 12 Jyotirlingas",
                "Prabhas Patan - Ancient name of the area",
                "Triveni Sangam - Confluence of three rivers",
                "Beach - Beautiful beach near the temple",
                "Sound and Light Show - Evening cultural presentation"
            ],
            bestTime: "October to March (pleasant weather for temple visits)",
            attractions: [
                "Somnath Temple - Magnificent temple by the Arabian Sea",
                "Triveni Sangam - Confluence of Hiran, Kapila, and Saraswati rivers",
                "Somnath Beach - Scenic beach perfect for relaxation",
                "Prabhas Patan Museum - Museum with temple history",
                "Junagadh Gate - Historical gate near the temple"
            ],
            activities: "Temple darshan, beach visits, sound and light show, photography",
            cuisine: "Gujarati Thali, Dhokla, Khandvi, Fafda, Traditional Gujarati sweets"
        },
        mathura: {
            title: "Mathura - Birthplace of Lord Krishna",
            description: "Mathura is the birthplace of Lord Krishna and one of the Sapta Puri. It's a major pilgrimage destination with numerous temples dedicated to Krishna and is closely associated with the divine pastimes of the Lord.",
            highlights: [
                "Krishna Janmabhoomi - Birthplace of Lord Krishna",
                "Dwarkadhish Temple - Beautiful temple with intricate carvings",
                "Vishram Ghat - Sacred ghat on Yamuna River",
                "Gita Mandir - Temple with Bhagavad Gita inscriptions",
                "Kusum Sarovar - Beautiful pond with historical significance"
            ],
            bestTime: "October to March (pleasant weather, especially during festivals)",
            attractions: [
                "Krishna Janmabhoomi - Sacred birthplace complex",
                "Dwarkadhish Temple - Ornate temple with beautiful architecture",
                "Vishram Ghat - Sacred ghat for ritual baths",
                "Gita Mandir - Temple with verses from Bhagavad Gita",
                "Kusum Sarovar - Scenic pond with architectural beauty"
            ],
            activities: "Temple visits, Yamuna aarti, visiting Vrindavan nearby, shopping for religious items",
            cuisine: "Pedas, Kachori, Samosa, Lassi, Traditional Braj cuisine"
        },
        ayodhya: {
            title: "Ayodhya - Birthplace of Lord Rama",
            description: "Ayodhya is the birthplace of Lord Rama and one of the Sapta Puri. It's an ancient city with deep religious significance and is believed to be the capital of the legendary Kosala Kingdom.",
            highlights: [
                "Ram Janmabhoomi - Birthplace of Lord Rama",
                "Hanuman Garhi - Temple dedicated to Lord Hanuman",
                "Kanak Bhavan - Palace-turned-temple",
                "Nageshwarnath Temple - Ancient Shiva temple",
                "Saryu River - Sacred river for rituals and ceremonies"
            ],
            bestTime: "October to March (pleasant weather, especially during festivals)",
            attractions: [
                "Ram Janmabhoomi - Sacred birthplace of Lord Rama",
                "Hanuman Garhi - Prominent Hanuman temple on a hillock",
                "Kanak Bhavan - Beautiful temple with golden idols",
                "Nageshwarnath Temple - Ancient temple dedicated to Shiva",
                "Saryu Ghat - Sacred ghat on Saryu River"
            ],
            activities: "Temple visits, river aarti, attending religious ceremonies, shopping",
            cuisine: "Traditional Awadhi cuisine, Lassi, Pedas, Kachori, Local sweets"
        },
        konark: {
            title: "Konark - Sun Temple",
            description: "Konark is famous for the magnificent Sun Temple, a UNESCO World Heritage Site. The temple is designed as a massive chariot with 24 wheels and is one of India's most spectacular architectural achievements.",
            highlights: [
                "Sun Temple - UNESCO World Heritage Site shaped like a chariot",
                "Chariot Wheels - Intricately carved 24 wheels",
                "Natya Mandap - Dance hall with exquisite sculptures",
                "Archaeological Museum - Collection of sculptures",
                "Chandrabhaga Beach - Beautiful beach nearby"
            ],
            bestTime: "October to March (pleasant weather for temple visits)",
            attractions: [
                "Sun Temple - Architectural marvel representing the chariot of the Sun God",
                "Chariot Wheels - 24 intricately carved wheels with detailed work",
                "Natya Mandap - Dance hall with beautiful sculptures",
                "Chandrabhaga Beach - Scenic beach perfect for sunset views",
                "Archaeological Museum - Houses temple artifacts and sculptures"
            ],
            activities: "Temple tours, photography, museum visits, beach visits, sound and light shows",
            cuisine: "Pakhala Bhata, Dalma, Chhena Poda, Rasabali, Traditional Odisha cuisine"
        },
        mahabalipuram: {
            title: "Mahabalipuram - Shore Temple",
            description: "Mahabalipuram is a UNESCO World Heritage Site known for its group of monuments, including the famous Shore Temple. It showcases the excellence of Pallava architecture and sculpture.",
            highlights: [
                "Shore Temple - Ancient temple by the Bay of Bengal",
                "Pancha Rathas - Five monolithic rock-cut temples",
                "Arjuna's Penance - Massive bas-relief sculpture",
                "Descent of the Ganges - Famous open-air bas-relief",
                "Beach - Beautiful beach with temple views"
            ],
            bestTime: "October to March (pleasant weather for exploration)",
            attractions: [
                "Shore Temple - 8th-century temple dedicated to Shiva and Vishnu",
                "Pancha Rathas - Five rathas (chariots) carved from single rocks",
                "Arjuna's Penance - Massive bas-relief depicting scenes from Mahabharata",
                "Descent of the Ganges - Largest open-air bas-relief in the world",
                "Mahabalipuram Beach - Scenic beach with temple backdrop"
            ],
            activities: "Monument tours, photography, beach activities, shopping for stone sculptures",
            cuisine: "South Indian Thali, Dosa, Idli, Filter Coffee, Seafood"
        },
        thanjavur: {
            title: "Thanjavur - Great Living Chola Temples",
            description: "Thanjavur is home to the magnificent Brihadeeswarar Temple, part of the Great Living Chola Temples UNESCO World Heritage Site. It's famous for its Dravidian architecture and cultural heritage.",
            highlights: [
                "Brihadeeswarar Temple - UNESCO World Heritage Site",
                "Thanjavur Palace - Royal residence with museum",
                "Saraswati Mahal Library - Ancient library with rare manuscripts",
                "Art Gallery - Collection of Chola bronzes and paintings",
                "Tamil Culture - Rich cultural heritage and traditions"
            ],
            bestTime: "October to March (pleasant weather for temple visits)",
            attractions: [
                "Brihadeeswarar Temple - Grand 11th-century temple with massive vimana",
                "Thanjavur Palace - Royal palace complex with museums",
                "Saraswati Mahal Library - Ancient library with rare palm leaf manuscripts",
                "Art Gallery - Houses magnificent Chola bronze sculptures",
                "Sivaganga Park - Beautiful park near the temple"
            ],
            activities: "Temple visits, museum tours, library visits, shopping for Thanjavur paintings",
            cuisine: "South Indian Thali, Pongal, Dosa, Idli, Filter Coffee, Traditional Tamil cuisine"
        },
        madurai: {
            title: "Madurai - Temple City of South",
            description: "Madurai is known as the Athens of the East and is home to the magnificent Meenakshi Amman Temple. It's one of the oldest continuously inhabited cities and a major cultural center of Tamil Nadu.",
            highlights: [
                "Meenakshi Amman Temple - Magnificent temple with colorful gopurams",
                "Thirumalai Nayakkar Palace - 17th-century palace",
                "Gandhi Museum - Museum dedicated to Mahatma Gandhi",
                "Vandiyur Mariamman Teppakulam - Large temple tank",
                "Tamil Culture - Rich heritage and traditional arts"
            ],
            bestTime: "October to March (pleasant weather, especially during festivals)",
            attractions: [
                "Meenakshi Amman Temple - Iconic temple with 14 colorful gopurams",
                "Thirumalai Nayakkar Palace - Beautiful Indo-Saracenic palace",
                "Gandhi Museum - Museum showcasing Gandhi's life and teachings",
                "Vandiyur Mariamman Teppakulam - Large temple tank with mandapam",
                "Alagar Kovil - Temple dedicated to Lord Vishnu"
            ],
            activities: "Temple visits, palace tours, shopping for silk sarees, attending festivals",
            cuisine: "Madurai Jigarthanda, Kari Dosa, Idli, Pongal, Filter Coffee, Traditional Tamil meals"
        },
        pushkar: {
            title: "Pushkar - Sacred Lake City",
            description: "Pushkar is one of the oldest cities in India and home to the only Brahma Temple in the world. The sacred Pushkar Lake and annual camel fair make it a unique destination.",
            highlights: [
                "Brahma Temple - Only temple dedicated to Lord Brahma",
                "Pushkar Lake - Sacred lake with 52 ghats",
                "Pushkar Camel Fair - World's largest camel fair",
                "Savitri Temple - Temple on hilltop with panoramic views",
                "Spiritual Atmosphere - Peaceful and meditative environment"
            ],
            bestTime: "October to March (pleasant weather, camel fair in November)",
            attractions: [
                "Brahma Temple - Rare temple dedicated to the creator Brahma",
                "Pushkar Lake - Sacred lake surrounded by 52 ghats",
                "Savitri Temple - Temple on Ratnagiri Hill with stunning views",
                "Pushkar Camel Fair - Annual fair with camels, cultural events, and competitions",
                "Varaha Temple - Temple dedicated to Lord Vishnu's boar incarnation"
            ],
            activities: "Temple visits, lake rituals, camel fair attendance, camel rides, shopping",
            cuisine: "Rajasthani Thali, Dal Baati Churma, Gatte Ki Sabzi, Kachori, Lassi"
        },
        haridwar: {
            title: "Haridwar - Gateway to the Gods",
            description: "Haridwar is one of the seven holiest places in India and is where the Ganges enters the plains. It's a major pilgrimage destination known for the Ganga Aarti and spiritual atmosphere.",
            highlights: [
                "Har Ki Pauri - Most sacred ghat with evening Ganga Aarti",
                "Chandi Devi Temple - Temple on Neel Parvat hill",
                "Mansa Devi Temple - Temple accessible by cable car",
                "Kumbh Mela - One of the four Kumbh Mela sites",
                "Spiritual Ghats - Multiple ghats for rituals and ceremonies"
            ],
            bestTime: "October to March (pleasant weather, Kumbh Mela periodically)",
            attractions: [
                "Har Ki Pauri - Sacred ghat where Ganga Aarti is performed",
                "Chandi Devi Temple - Temple dedicated to Goddess Chandi on hilltop",
                "Mansa Devi Temple - Temple accessible by ropeway with city views",
                "Maya Devi Temple - Ancient temple and one of the Shakti Peethas",
                "Bharat Mata Mandir - Temple with relief map of India"
            ],
            activities: "Ganga Aarti, temple visits, cable car rides, taking holy dip, spiritual activities",
            cuisine: "Kachori, Aloo Puri, Chole Bhature, Lassi, Traditional North Indian meals"
        },
        shirdi: {
            title: "Shirdi - Abode of Sai Baba",
            description: "Shirdi is famous for the Shirdi Sai Baba Temple, one of India's most visited religious places. Devotees from all over the world visit to seek blessings of Sai Baba.",
            highlights: [
                "Shirdi Sai Baba Temple - Main shrine of Sai Baba",
                "Dwarkamai - Mosque where Sai Baba lived",
                "Chavadi - Place where Sai Baba used to sleep",
                "Samadhi Mandir - Final resting place of Sai Baba",
                "Spiritual Atmosphere - Peaceful and devotional environment"
            ],
            bestTime: "October to March (pleasant weather for temple visits)",
            attractions: [
                "Shirdi Sai Baba Temple - Main temple with beautiful architecture",
                "Dwarkamai - Sacred mosque where Sai Baba spent time",
                "Chavadi - Historical place where Sai Baba slept on alternate nights",
                "Gurusthan - Sacred neem tree under which Sai Baba meditated",
                "Shani Shingnapur - Famous temple dedicated to Lord Shani nearby"
            ],
            activities: "Temple darshan, attending aarti, meditation, shopping for prasadam",
            cuisine: "Simple vegetarian meals, Prashad from temple, Traditional Maharashtrian food"
        },
        vaishnodevi: {
            title: "Vaishno Devi - Holy Cave Shrine",
            description: "Vaishno Devi is one of the most revered Hindu pilgrimage sites, located in the Trikuta Mountains. The shrine is dedicated to Goddess Vaishno Devi and requires a challenging trek to reach.",
            highlights: [
                "Vaishno Devi Temple - Sacred cave temple in Trikuta Mountains",
                "Trekking Route - 13.5 km trek from Katra",
                "Bhairavnath Temple - Temple of Bhairavnath at the summit",
                "Holy Cave - Natural cave with three forms of the goddess",
                "Spiritual Journey - Challenging pilgrimage with deep devotion"
            ],
            bestTime: "March to October (pleasant weather for trekking, avoid monsoon)",
            attractions: [
                "Vaishno Devi Temple - Sacred cave shrine in the mountains",
                "Bhairavnath Temple - Temple at the summit, part of the pilgrimage",
                "Ardhkuwari - Halfway point with temple and resting area",
                "Sanjichhat - Viewpoint with stunning mountain vistas",
                "Banganga - Sacred stream where Mata Vaishno Devi quenched her thirst"
            ],
            activities: "Trekking, temple darshan, photography, spiritual activities, helicopter rides",
            cuisine: "Simple vegetarian meals, Prashad from temple, Traditional North Indian food"
        },
        vrindavan: {
            title: "Vrindavan - Land of Lord Krishna",
            description: "Vrindavan is closely associated with Lord Krishna's childhood pastimes. It's a major pilgrimage destination with thousands of temples dedicated to Krishna and Radha, creating a spiritual and devotional atmosphere.",
            highlights: [
                "Banke Bihari Temple - Most famous temple of Lord Krishna",
                "ISKCON Temple - Beautiful temple of the Hare Krishna movement",
                "Prem Mandir - Magnificent temple with white marble architecture",
                "Radha Raman Temple - Ancient temple with original deity",
                "Krishna's Pastimes - Sites associated with Lord Krishna's life"
            ],
            bestTime: "October to March (pleasant weather, especially during festivals)",
            attractions: [
                "Banke Bihari Temple - Most revered temple with beautiful deity",
                "ISKCON Temple - Grand temple complex with beautiful architecture",
                "Prem Mandir - Stunning white marble temple with intricate carvings",
                "Radha Raman Temple - 16th-century temple with original deity",
                "Krishna Balaram Mandir - ISKCON's main temple in Vrindavan"
            ],
            activities: "Temple visits, attending aarti and kirtan, parikrama (circumambulation), shopping",
            cuisine: "Pedas, Kachori, Samosa, Lassi, Traditional Braj cuisine, Prashad from temples"
        }
    };

    const info = destinationInfo[destination?.id] || {
        title: destination?.name || "Destination",
        description: "Explore this beautiful destination in India.",
        highlights: [],
        bestTime: "Year-round",
        attractions: [],
        activities: "",
        cuisine: ""
    };

    const handleBack = () => {
        setCurrentPage('destinations');
    };

    return (
        <div className="container mx-auto px-6 pt-32 pb-16">
            {/* Back Button */}
            <motion.button
                onClick={handleBack}
                className="mb-8 flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                whileHover={{ x: -5 }}
            >
                <ArrowLeftIcon />
                <span>{t('backToDestinations')}</span>
            </motion.button>

            {/* Hero Section with Image */}
            <motion.div
                className="relative h-[60vh] rounded-2xl overflow-hidden mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <img
                    src={destination?.image}
                    alt={destination?.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-sm bg-indigo-500/80 text-white py-2 px-4 rounded-full font-medium">
                            {destination?.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mt-4 text-white">
                            {info.title}
                        </h1>
                        <p className="text-xl text-gray-200 mt-2">{destination?.state}</p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Content Sections */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    {/* Description */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">{t('about') || 'About'}</h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {info.description}
                        </p>
                    </motion.section>

                    {/* Highlights */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">{t('keyHighlights') || 'Key Highlights'}</h2>
                        <ul className="space-y-3">
                            {info.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-indigo-400 mt-1">✓</span>
                                    <span className="text-gray-300">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* Top Attractions */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">{t('topAttractions') || 'Top Attractions'}</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {info.attractions.map((attraction, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-indigo-500/50 transition-colors"
                                >
                                    <p className="text-gray-300">{attraction}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Best Time to Visit */}
                    <motion.div
                        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-xl font-bold mb-3">{t('bestTimeToVisit') || 'Best Time to Visit'}</h3>
                        <p className="text-gray-300">{info.bestTime}</p>
                    </motion.div>

                    {/* Activities */}
                    <motion.div
                        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="text-xl font-bold mb-3">{t('activities') || 'Activities'}</h3>
                        <p className="text-gray-300">{info.activities}</p>
                    </motion.div>

                    {/* Local Cuisine */}
                    <motion.div
                        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-xl font-bold mb-3">{t('localCuisine') || 'Local Cuisine'}</h3>
                        <p className="text-gray-300">{info.cuisine}</p>
                    </motion.div>

                    {/* Book Now Button */}
                    <motion.button
                        onClick={() => setCurrentPage('flights')}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('bookYourTrip') || 'Book Your Trip'}
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default DestinationDetailPage;

