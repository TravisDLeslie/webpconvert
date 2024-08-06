// src/components/ConvertedFileDisplay.js
import React from 'react';
import { calculateSizeReduction, calculateLoadTime, calculateSizeIncrease } from '../utils/calculations';

const ConvertedFileDisplay = ({
  convertedFile,
  originalFile,
  checkmark,
  defaultImageIcon,
  customFileName,
  generateFileName,
}) => {
  const originalLoadTime = calculateLoadTime(originalFile ? originalFile.size / 1024 / 1024 : 0, 5);
  const convertedLoadTime = calculateLoadTime(convertedFile ? convertedFile.file.size / 1024 / 1024 : 0, 5);
  const loadTimeDifference = (originalLoadTime / convertedLoadTime).toFixed(2);

  const sizeIncrease = convertedFile && originalFile 
    ? calculateSizeIncrease(originalFile.size, convertedFile.file.size)
    : 0;

  const handleImageError = (event) => {
    event.target.src = defaultImageIcon;
    event.target.style.width = '80px';
  };

  const manualDownload = () => {
    if (convertedFile) {
      const url = URL.createObjectURL(convertedFile.file);
      const newFileName = generateFileName(`${customFileName}-smart-convert.webp`);

      const a = document.createElement('a');
      a.href = url;
      a.download = newFileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="md:w-3/5 md:order-1 order-2 text-center border border-[#EA552B] rounded-lg p-4 relative">
      <p className="text-[#EA552B] font-bold text-2xl ">
        Converted
      </p>
      <img
        src={checkmark}
        alt="Converted"
        className="absolute top-[-12px] right-[-12px] h-12 w-12"
      />
      <div className="mt-4">
        <p className="text-gray-600 mb-4">
          File didn't download? Download below:
        </p>
        <button
          onClick={manualDownload}
          className="py-2  px-4 bg-[#EA552B] text-white font-bold uppercase rounded hover:bg-[#1e1e1e]"
        >
          Download
        </button>
        <div className="mt-4 flex flex-col items-center">
          <div className="text-center mb-6">
            <h3 className="text-gray-700 font-bold mb-2">Converted Image</h3>
            <img
              src={
                convertedFile
                  ? URL.createObjectURL(convertedFile.file)
                  : defaultImageIcon
              }
              onError={handleImageError}
              alt="Converted file"
              className="w-80 h-auto mx-auto border-4 border-[#7CCA83] rounded object-contain"
            />
            <p className="text-sm text-gray-600 mt-2">
              Size: {(convertedFile.file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <p className="text-sm text-green-600 mt-1">
              File reduced by{' '}
              <span className="font-bold">
                {calculateSizeReduction(
                  originalFile.size,
                  convertedFile.file.size
                )}
                %
              </span>
            </p>
            <p className="text-sm text-green-600 mt-1">
              Loads approximately{' '}
              <span className="font-bold">
                {loadTimeDifference}x
              </span>{' '}
              faster
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-gray-700 font-medium mb-2">Original Image</h3>
            <img
              src={
                originalFile
                  ? URL.createObjectURL(originalFile)
                  : defaultImageIcon
              }
              onError={handleImageError}
              alt="Original file"
              className={`w-80 h-auto mx-auto border border-gray-300 rounded object-contain progressive-load`}
            />
            <p className="text-sm text-gray-600 mt-2">
              Size: {(originalFile?.size / 1024 / 1024).toFixed(2) || 'N/A'} MB
            </p>
            <p className="text-sm font-semibold text-red-600 mt-1">
              {sizeIncrease}% bigger
            </p>
            <p className="text-sm font-semibold text-red-600 mt-1">
              Loads {loadTimeDifference}x slower
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertedFileDisplay;
