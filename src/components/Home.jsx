// src/components/Home.js

import React, { useState } from 'react';
import ImageConverter from './ImageConverter';

const Home = () => {
  const [processingComplete, setProcessingComplete] = useState(false);

  return (
    <div className="flex mt-12 flex-col h-full bg-[#FAEBE4]">
      <div className="w-full w-full mt-12 max-w-[1300px] mx-auto px-4 flex-grow flex flex-col items-center justify-center">
        {/* Conditionally render the header */}
        {!processingComplete && (
          <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Effortless WebP Conversion
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-2">
              Optimize your images fast.
            </p>
          </header>
        )}

        {/* Pass a callback to set the processing complete status */}
        <ImageConverter onProcessingComplete={() => setProcessingComplete(true)} />
      </div>
    </div>
  );
};

export default Home;
