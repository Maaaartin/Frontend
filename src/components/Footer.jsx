import React from 'react';

/**
 * Creates styled footer
 */
const Footer = ({ children }) => (
    <footer className='relativepb-6 mb-2' >
        <div className="container mx-auto px-4">
            <hr className="mb-6 border-b-1 border-gray-700" />
            <div>{children}</div>
        </div>
    </footer>
)

export default Footer;