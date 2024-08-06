// FileUploadBox.js
import React, { useRef, useState } from 'react';
import uploadIcon from '../assets/icons/imageupload.svg';

const FileUploadBox = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileSelected(file);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelected(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-10 mb-4 cursor-pointer ${
        isDragging ? 'border-green-600 bg-[FAEBE4] text-white' : 'border-[#EA552B] bg-white'
      } hover:bg-[#EA552B] hover:text-white`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <img src={uploadIcon} alt="Upload" className="mx-auto mb-4" />
      <p className="text-xl font-bold">Drag, Drop, or Click to Upload</p>
      <p className="font-medium text-lg">PNG, JPG, AVIF, HEIC</p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileUploadBox;
