// src/components/DownloadButton.jsx

import React from "react";
import checkIcon from '../assets/icons/check.svg'; // Ensure the path is correct

const DownloadButton = ({
  convertedFile,
  generateFileName,
  customFileName,
  triggerDownload, // Ensure triggerDownload is being used


  
}) => {

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-end items-center w-full md:w-1/2  mx-auto px-8">
      {/* Left Section - Converted Text and Check Icon */}
      <div className="flex items-center mb-4 md:mb-0 md:mr-12">
        <p className="text-gray-800 text-base font-bold">Converted</p>
        <img src={checkIcon} alt="Check" className="ml-2 h-6 w-6" />
      </div>

      {/* Right Section - Download Info and Button */}
      <div className="flex flex-col items-center text-center">
        <p className="text-[#1e1e1e] text-sm mb-2 order-1 md:order-none">File didn't download?</p>
        <button
          onClick={() => triggerDownload(convertedFile)} // Use triggerDownload prop
          className="py-2 px-4 w-full md:w-[170px] bg-[#1E1E1E]  text-white font-bold uppercase rounded hover:bg-[#333333] order-2 md:order-none"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default DownloadButton;
