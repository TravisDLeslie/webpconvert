// src/components/Pricing.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Pricing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-[#1e1e1e] mb-8">Pricing Plans</h1>
      <div className="flex gap-12">
        {/* Free Plan */}
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-[#1e1e1e] mb-4">Free</h2>
          <p className="text-lg text-[#1e1e1e] mb-4">Enjoy basic features with our free plan.</p>
          <ul className="text-left mb-6 space-y-2">
            <li>✔️ 1 Conversion at a Time</li>
            <li>✔️ SEO Friendly File Name</li>
            <li>✔️ Best Image Compression</li>
          </ul>
          <Link to="/" className="bg-[#EA552B] text-white px-6 py-2 rounded hover:bg-orange-600 inline-block">
            Get Started
          </Link>
        </div>

        {/* Paid Plan */}
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-semibold text-[#1e1e1e]">Paid</h2>
            <span className="text-xl font-medium text-[#1e1e1e] ml-2">$9/mo</span>
          </div>
          <p className="text-lg text-[#1e1e1e] mb-4">Access premium features and support.</p>
          <ul className="text-left mb-6 space-y-2">
            <li>✔️ Batch Conversion at Once</li>
            <li>✔️ SEO Friendly File Name</li>
            <li>✔️ Priority Support</li>
            <li>✔️ File Storage</li>
            <li>✔️ Optimized Image Compression</li>
          </ul>
          <button className="bg-gray-300 text-gray-600 px-6 py-2 rounded cursor-not-allowed" disabled>
            Coming Soon!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
