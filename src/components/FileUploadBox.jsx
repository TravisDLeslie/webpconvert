// src/components/FileUploadBox.js

import React, { useRef, useState } from 'react';

const FileUploadBox = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-10 mb-4 cursor-pointer ${
        isDragging ? 'border-green-600 bg-[#F2EEFC]' : 'border-[#EA552B] bg-[white]'
      } hover:bg-[#EA552B]`}
      style={{ width: '600px' }}
      onClick={handleUploadClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="">
        <p className="text-center text-xl font-bold mb-4">Drag, Drop or Click to Upload</p>
        <p className="text-center font-medium text-lg mb-4">PNG, JPG, AVIF, HEIC</p>
        <p className="text-center text-gray-500 text-xs mt-2">Convert iPhone files to use on Webflow, Shopify, Figma, etc.</p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept=".png, .jpg, .jpeg, .avif, .heic, .heif, image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
    </div>
  );
};

export default FileUploadBox;
