// src/components/Home.js

import React from 'react';
import ImageConverter from './ImageConverter';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAEBE4] px-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Effortless WebP Conversion</h1>
        <p className="text-lg text-gray-600 mt-2">Optimize your images fast.</p>
      </header>

      {/* Include the ImageConverter component */}
      <ImageConverter />

    
    </div>
  );
};

export default Home;
