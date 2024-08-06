// src/components/Header.js
import React from 'react';
import logo from '../assets/icons/webpconvert.svg'; // Ensure the logo file exists

const Header = ({ resetConverter }) => {
  return (
    <header className="w-full fixed top-0 bg-white px-12 py-4 flex justify-between items-center z-50 shadow-xs" style={{ paddingLeft: '50px', paddingRight: '50px' }}>
      <div className="flex items-center">
        <button onClick={resetConverter} className="flex items-center mr-4"> {/* Clicking the logo will reset converter */}
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </button>
      </div>
      <nav className="flex-1 flex justify-between items-center">
        <div> {/* Left placeholder for alignment */}
        </div>
        <div className="flex gap-12 justify-center">
          <a href="#" className="text-lg text-[#1e1e1e] hover:text-zinc-900 hover:font-semibold">File Types</a>
          <a href="#" className="text-lg text-[#1e1e1e] hover:text-zinc-900 hover:font-semibold">Pricing</a>
          <a href="#" className="text-lg text-[#1e1e1e] hover:text-zinc-900 hover:font-semibold">Contact</a>
        </div>
        <div className="flex gap-4">
          <a href="/login" className="bg-transparent border border-gray-400 text-[#1e1e1e] hover:text-gray-900 rounded-md text-lg font-Poppins px-4 py-2">Log In</a>
          <button className="bg-[#EA552B] text-white text-lg font-Poppins px-4 py-2 rounded-md hover:bg-orange-600">Sign Up</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
