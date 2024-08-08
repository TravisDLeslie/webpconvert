// src/components/ConversionResults.js

import React from 'react';
import checkmark from '../assets/icons/check.svg'; // Ensure correct path
import defaultImage from '../assets/images/default.png'; // Ensure correct path

const ConversionResults = ({
  originalFile,
  convertedFile,
  calculateSizeReduction,
  originalLoadTime,
  convertedLoadTime,
  manualDownload,
  handleImageError
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mt-12 space-x-0 md:space-x-4">
      <div className="md:w-3/5 order-2 md:order-1 text-center border border-[#EA552B] rounded-lg p-4 relative">
        <p className="text-[#EA552B] font-bold text-2xl">
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
            className="py-2 px-4 bg-[#EA552B] text-white font-bold uppercase rounded hover:bg-[#1e1e1e]"
          >
            Download
          </button>
          <div className="mt-4 flex justify-center">
            <div className="text-center mx-4">
              <h3 className="text-gray-700 font-medium mb-2">Original Image</h3>
              <img
                src={
                  originalFile
                    ? URL.createObjectURL(originalFile)
                    : defaultImage
                }
                onError={handleImageError}
                alt="Original file"
                className={`w-40 h-40 mx-auto border border-gray-300 rounded object-contain progressive-load`}
                style={{
                  width: originalFile ? '160px' : '80px',
                  height: '160px',
                }}
              />
              <p className="text-sm text-gray-600 mt-2">
                Size: {(originalFile?.size / 1024 / 1024).toFixed(2) || 'N/A'} MB
              </p>
            </div>
            <div className="text-center mx-4">
              <h3 className="text-gray-700 font-bold mb-2">Converted Image</h3>
              <img
                src={
                  convertedFile
                    ? URL.createObjectURL(convertedFile.file)
                    : defaultImage
                }
                onError={handleImageError}
                alt="Converted file"
                className="w-40 h-40 mx-auto border-4 border-[#EA552B] rounded object-contain"
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
                  {(originalLoadTime / convertedLoadTime).toFixed(2)}x
                </span>{' '}
                faster
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionResults;
