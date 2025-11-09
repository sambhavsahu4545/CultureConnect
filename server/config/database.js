// Database connection file - handles connecting to MongoDB
import mongoose from 'mongoose';

// Connect to MongoDB database
// This runs when the server starts
const connectDB = async () => {
    try {
        // Make sure we have a connection string in .env file
        if (!process.env.MONGODB_URI) {
            console.error('❌ MongoDB URI is not defined in environment variables');
            // In production, crash if we can't connect (better than running without DB)
            if (process.env.NODE_ENV === 'production') {
                process.exit(1);
            }
            return false;
        }

        // Check if connection string looks valid (should start with mongodb:// or mongodb+srv://)
        if (!process.env.MONGODB_URI.startsWith('mongodb://') && 
            !process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
            console.error('❌ Invalid MongoDB connection string format');
            if (process.env.NODE_ENV === 'production') {
                process.exit(1);
            }
            return false;
        }

        // Connection options for security and performance
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Don't wait forever to connect
            socketTimeoutMS: 45000, // Close connection if no activity for 45 seconds
            maxPoolSize: 10, // Maximum 10 connections at once
            minPoolSize: 5, // Keep at least 5 connections ready
            retryWrites: true, // Retry failed writes
            w: 'majority', // Wait for majority of servers to confirm writes
        };

        // Actually connect to the database
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`✅ Database: ${conn.connection.name}`);

        // Listen for connection errors
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        // Listen for disconnection
        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️  MongoDB disconnected');
        });

        // When app shuts down (Ctrl+C), close database connection cleanly
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to application termination');
            process.exit(0);
        });

        return true;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error(`⚠️  Make sure MongoDB is running or check your connection string in .env file`);
        
        // In production, don't run without database
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
        
        return false;
    }
};

export default connectDB;
