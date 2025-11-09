// Reusable input field component for forms
// Used in booking forms, login, registration, etc.

import React from 'react';

// Input field with label
// label: Text to show above the input
// type: Input type (text, date, email, password, etc.)
// placeholder: Hint text inside the input
// value: Current value (controlled component)
// onChange: Function called when user types
const InputField = ({ label, type, placeholder, value, onChange }) => (
    <div>
        {/* Label text */}
        <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        {/* Input field with dark theme styling */}
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
    </div>
);

export default InputField; // Export the component for reuse in forms
