// src/hooks/useFileHandlers.js
import { useRef, useState } from 'react';

const useFileHandlers = (handleConversion) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleConversion(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      handleConversion(file);
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

  return {
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleUploadClick,
    isDragging,
    fileInputRef,
  };
};

export default useFileHandlers;
