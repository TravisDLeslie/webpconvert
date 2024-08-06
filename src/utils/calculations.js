// src/utils/calculations.js
export const calculateSizeReduction = (originalSize, newSize) => {
    return (((originalSize - newSize) / originalSize) * 100).toFixed(2);
  };
  
  export const calculateSizeIncrease = (originalSize, newSize) => {
    return (((originalSize - newSize) / newSize) * 100).toFixed(2);
  };
  
  export const calculateLoadTime = (fileSizeMB, networkSpeedMbps) => {
    const fileSizeBits = fileSizeMB * 1024 * 1024 * 8;
    const networkSpeedBps = networkSpeedMbps * 1024 * 1024;
    return (fileSizeBits / networkSpeedBps).toFixed(2);
  };
  