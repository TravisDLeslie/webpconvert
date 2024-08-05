// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Import the Home component
import Header from './components/Header';
import Footer from './components/Footer'; // Import the Footer component

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-[#FAEBE4]">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
