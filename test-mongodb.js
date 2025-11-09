// MongoDB connection test script
// Run this to verify MongoDB is working correctly
// Usage: node test-mongodb.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from server/.env
dotenv.config({ path: './server/.env' });

const testConnection = async () => {
    console.log('🔍 Testing MongoDB Connection...');
    console.log(`📡 Connection URI: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/culture-connect'}`);
    console.log('');

    try {
        // Try to connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/culture-connect', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Give up after 5 seconds if can't connect
        });

        console.log('✅ SUCCESS: MongoDB Connected!');
        console.log(`   Host: ${conn.connection.host}`);
        console.log(`   Database: ${conn.connection.name}`);
        console.log(`   Port: ${conn.connection.port}`);
        console.log(`   Ready State: ${conn.connection.readyState} (1 = connected)`);
        console.log('');
        console.log('🎉 MongoDB is ready to use!');
        
        // List all collections in the database
        const db = conn.connection.db;
        const collections = await db.listCollections().toArray();
        console.log(`📊 Collections in database: ${collections.length}`);
        if (collections.length > 0) {
            console.log('   Collections:', collections.map(c => c.name).join(', '));
        }
        
        // Close connection
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ FAILED: MongoDB Connection Error');
        console.error(`   Error: ${error.message}`);
        console.error('');
        console.error('💡 Troubleshooting:');
        console.error('   1. Make sure MongoDB is installed and running');
        console.error('   2. For local MongoDB: Start MongoDB service (net start MongoDB)');
        console.error('   3. For MongoDB Atlas: Check your connection string');
        console.error('   4. Verify the MONGODB_URI in server/.env file');
        console.error('');
        process.exit(1);
    }
};

testConnection();

