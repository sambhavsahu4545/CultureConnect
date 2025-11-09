import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { authAPI } from '../utils/api';

function ApiTestPage() {
    const [testResults, setTestResults] = useState({});
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        const results = {};

        // Test 1: Health Check
        try {
            const response = await fetch('http://localhost:5000/api/health');
            const data = await response.json();
            results.health = { success: true, data };
        } catch (error) {
            results.health = { success: false, error: error.message };
        }

        // Test 2: MongoDB Connection
        try {
            const response = await fetch('http://localhost:5000/api/test/mongodb');
            const data = await response.json();
            results.mongodb = { success: data.success, data };
        } catch (error) {
            results.mongodb = { success: false, error: error.message };
        }

        // Test 3: Registration Endpoint
        try {
            const testData = {
                name: 'Test User',
                email: `test${Date.now()}@example.com`,
                mobile: `123456789${Math.floor(Math.random() * 10)}`,
                password: 'test123'
            };
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData),
            });
            const data = await response.json();
            results.register = { success: response.ok, data };
        } catch (error) {
            results.register = { success: false, error: error.message };
        }

        setTestResults(results);
        setLoading(false);
    };

    return (
        <div className="container mx-auto px-6 pt-32 pb-16">
            <h1 className="text-4xl font-bold mb-8">API Connection Test</h1>
            
            <button
                onClick={testConnection}
                disabled={loading}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg mb-8"
            >
                {loading ? 'Testing...' : 'Test All Connections'}
            </button>

            <div className="space-y-6">
                {/* Health Check */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">1. Backend Health Check</h2>
                    {testResults.health && (
                        <div className={testResults.health.success ? 'text-green-400' : 'text-red-400'}>
                            {testResults.health.success ? '✓ Connected' : `✗ Failed: ${testResults.health.error}`}
                            {testResults.health.data && (
                                <pre className="mt-2 text-sm text-gray-300">{JSON.stringify(testResults.health.data, null, 2)}</pre>
                            )}
                        </div>
                    )}
                </div>

                {/* MongoDB Test */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">2. MongoDB Connection</h2>
                    {testResults.mongodb && (
                        <div className={testResults.mongodb.success ? 'text-green-400' : 'text-red-400'}>
                            {testResults.mongodb.success ? '✓ Connected' : `✗ Failed: ${testResults.mongodb.error}`}
                            {testResults.mongodb.data && (
                                <pre className="mt-2 text-sm text-gray-300">{JSON.stringify(testResults.mongodb.data, null, 2)}</pre>
                            )}
                        </div>
                    )}
                </div>

                {/* Registration Test */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">3. Registration Endpoint</h2>
                    {testResults.register && (
                        <div className={testResults.register.success ? 'text-green-400' : 'text-red-400'}>
                            {testResults.register.success ? '✓ Working' : `✗ Failed: ${testResults.register.error}`}
                            {testResults.register.data && (
                                <pre className="mt-2 text-sm text-gray-300">{JSON.stringify(testResults.register.data, null, 2)}</pre>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ApiTestPage;

