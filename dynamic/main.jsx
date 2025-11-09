// Main entry point of the React application
// This is where the app starts - React renders the App component into the HTML

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Find the root element in index.html and render the App component
// StrictMode helps catch bugs during development
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
