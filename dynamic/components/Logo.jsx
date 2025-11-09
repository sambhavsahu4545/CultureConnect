// Logo component - displays the company logo
// Can be shown in different sizes (large, small, or default)

import React from 'react';

function Logo({ large = false, small = false }) {
    // Choose size class based on props
    const sizeClass = large ? 'h-12' : small ? 'h-6' : 'h-8';
    return (
        <div className="flex items-center space-x-3">
            {/* SVG logo icon */}
            <svg className={`${sizeClass} w-auto text-indigo-400`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12ZM7.05025 7.05025C6.65973 7.44077 6.65973 8.07394 7.05025 8.46447C7.44077 8.85499 8.07394 8.85499 8.46447 8.46447C8.85499 8.07394 8.85499 7.44077 8.46447 7.05025C8.07394 6.65973 7.44077 6.65973 7.05025 7.05025ZM15.5355 15.5355C15.145 15.9261 15.145 16.5592 15.5355 16.9497C15.9261 17.3403 16.5592 17.3403 16.9497 16.9497C17.3403 16.5592 17.3403 15.9261 16.9497 15.5355C16.5592 15.145 15.9261 15.145 15.5355 15.5355ZM7.05025 16.9497C6.65973 16.5592 6.65973 15.9261 7.05025 15.5355C7.44077 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497C8.07394 17.3403 7.44077 17.3403 7.05025 16.9497ZM15.5355 8.46447C15.145 8.07394 15.145 7.44077 15.5355 7.05025C15.9261 6.65973 16.5592 6.65973 16.9497 7.05025C17.3403 7.44077 17.3403 8.07394 16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z"/>
            </svg>
            {/* Company name text */}
            <span className={`font-bold tracking-wider ${large ? 'text-4xl' : small ? 'text-lg' : 'text-2xl'}`}>
                Culture Connect
            </span>
        </div>
    );
}

export default Logo;
