// src/components/SignUp.js

import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-[#1e1e1e] mb-8">Sign Up</h1>
      <p className="text-lg text-[#1e1e1e] mb-4">This feature is coming soon!</p>
      <Link to="/" className="bg-[#EA552B] text-white px-6 py-2 rounded hover:bg-orange-600">
        Go Home
      </Link>
    </div>
  );
};

export default SignUp;
