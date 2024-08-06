import React from "react";
import checkIcon from '../assets/icons/check.svg'; // Ensure the path is correct

const DownloadButton = ({
  convertedFile,
  generateFileName,
  customFileName,
}) => {
  const manualDownload = () => {
    if (convertedFile) {
      const url = URL.createObjectURL(convertedFile.file);
      const newFileName = generateFileName(
        `${customFileName}-smart-convert.webp`
      );

      const a = document.createElement("a");
      a.href = url;
      a.download = newFileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex justify-end items-center w-full md:w-[610px] mx-auto px-8 py-4">
      {/* Left Section - Converted Text and Check Icon */}
      <div className="flex items-center mr-12">
        <p className="text-gray-800 text-2xl font-semibold">Converted</p>
        <img src={checkIcon} alt="Check" className="ml-2 h-6 w-6" />
      </div>

      {/* Right Section - Download Info and Button */}
      <div className="flex flex-col items-center">
        <p className="text-[#1e1e1e] mb-2">File didn't download?</p>
        <button
          onClick={manualDownload}
          className="py-2 px-4 w-full md:w-[170px] bg-[#1E1E1E] text-white font-bold uppercase rounded hover:bg-[#333333]"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default DownloadButton;
