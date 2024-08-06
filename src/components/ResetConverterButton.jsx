// src/components/ResetConverterButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ResetConverterButton = ({ onReset }) => {
  const navigate = useNavigate();  // Create an instance of useNavigate

  const handleReset = () => {
    if (onReset) onReset();    // Call the reset function if it exists
    navigate('/');             // Navigate to the homepage
  };

  return (
    <button
      onClick={handleReset}
      className="block mx-auto mb-4 py-2 px-6 bg-[#A9A9A9] text-white font-semibold rounded hover:bg-[#1e1e1e]"
    >
      Convert Another File
    </button>
  );
};

export default ResetConverterButton;
