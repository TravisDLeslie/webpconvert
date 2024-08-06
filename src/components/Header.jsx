// src/components/Header.js

import React from 'react';
import logo from '../assets/icons/webpconvert.svg'; // Ensure the logo file exists
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
  return (
    <header className="w-full fixed top-0 bg-white px-12 py-4 flex justify-between items-center z-50 shadow-xs" style={{ paddingLeft: '50px', paddingRight: '50px' }}>
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-4"> {/* Clicking the logo will navigate to home */}
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </Link>
      </div>
      <nav className="flex-1 flex justify-between items-center">
        <div> {/* Left placeholder for alignment */}
        </div>
        <div className="flex gap-12 justify-center">
          <Link to="/file-types" className="text-lg text-[#1e1e1e] hover:text-zinc-900 hover:font-semibold">File Types</Link>
          <Link to="/pricing" className="text-lg text-[#1e1e1e] hover:text-zinc-900 hover:font-semibold">Pricing</Link>
          <Link to="/" className="text-lg text-[#1e1e1e] hover:text-zinc-900 hover:font-semibold">Convert</Link>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="bg-transparent border border-gray-400 text-[#1e1e1e] hover:text-gray-900 rounded-md text-lg font-Poppins px-4 py-2">Log In</Link>
          <Link to="/signup" className="bg-[#EA552B] text-white text-lg font-Poppins px-4 py-2 rounded-md hover:bg-orange-600">Sign Up</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
