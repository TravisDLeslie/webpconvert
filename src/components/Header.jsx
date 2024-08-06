// src/components/Header.js

import React, { useState } from 'react';
import logo from '../assets/icons/webpconvert.svg'; // Ensure the logo file exists
import menuIcon from '../assets/icons/menu.svg'; // Ensure the menu icon file exists
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full fixed top-0 bg-white px-4 md:px-12 py-4 flex justify-between items-center z-50 shadow-xs">
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-4">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <button className="md:hidden flex items-center" onClick={toggleMobileMenu}>
        <img src={menuIcon} alt="Menu" className="h-6 w-6" />
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-1 justify-between items-center">
        <div></div> {/* Left placeholder for alignment */}
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}>
          <div className="fixed top-0 right-0 bg-white w-64 h-full z-50 shadow-lg">
            <div className="flex justify-end p-4">
              <button onClick={toggleMobileMenu} className="text-xl">✕</button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              <Link to="/file-types" className="text-lg text-[#1e1e1e] hover:text-zinc-900 hover:font-semibold" onClick={toggleMobileMenu}>File Types</Link>
              <Link to="/pricing" className="text-lg text-[#1e1e1e] hover:text-zinc-900 hover:font-semibold" onClick={toggleMobileMenu}>Pricing</Link>
              <Link to="/" className="text-lg text-[#1e1e1e] hover:text-zinc-900 hover:font-semibold" onClick={toggleMobileMenu}>Convert</Link>
              <Link to="/login" className="bg-transparent border border-gray-400 text-[#1e1e1e] hover:text-gray-900 rounded-md text-lg font-Poppins px-4 py-2" onClick={toggleMobileMenu}>Log In</Link>
              <Link to="/signup" className="bg-[#EA552B] text-white text-lg font-Poppins px-4 py-2 rounded-md hover:bg-orange-600" onClick={toggleMobileMenu}>Sign Up</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
