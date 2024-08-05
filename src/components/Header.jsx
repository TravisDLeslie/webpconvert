// src/components/Header.js

import React from 'react';
import logo from '../assets/icons/webpconvert.svg'; // Ensure you have a logo file

const Header = ({ resetConverter }) => { // Accept resetConverter as a prop
  return (
    <header className="w-full fixed top-0 bg-[#FAEBE4] shadow-[0_4px_4px_0_rgba(0,0,0,0.75)] px-6 py-4 flex justify-center items-center z-10">
      <div className="flex align-center">
        <button onClick={resetConverter} className="flex items-center"> {/* Use button and call resetConverter */}
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </button>
      </div>
    </header>
  );
};

export default Header;
