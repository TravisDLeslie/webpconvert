// src/components/Header.js

import React from 'react';
import logo from '../assets/icons/webpconvert.svg'; // Ensure you have a logo file

const Header = () => {
  return (
    <header className="w-full fixed top-0 bg-[#FAEBE4] shadow-[0_4px_4px_0_rgba(0,0,0,0.75)] px-6 py-4 flex justify-between items-center z-10">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
        <h1 className="text-xl font-bold text-gray-800 ml-2"></h1>
      </div>
      
    </header>
  );
};

export default Header;
