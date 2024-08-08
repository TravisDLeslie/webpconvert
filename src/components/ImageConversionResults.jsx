import React, { useState } from 'react';
import ConvertedFileDisplay from './ConvertedFileDisplay';
import RenameFile from './RenameFile';
import checkmark from '../assets/icons/check.svg';
import defaultImage from '../assets/images/default.png';
import DownloadButton from './DownloadButton';
import ResetConverterButton from './ResetConverterButton';
import DropdownIcon from '../assets/icons/dropdownwhite.svg';

const ImageConversionResults = ({
  convertedFile,
  originalFile,
  customFileName,
  setCustomFileName,
  prefix,
  setPrefix,
  triggerDownload,
  generateFileName,
  resetHandler,
  altText, // Receive alt text
  setAltText // Receive function to update alt text
}) => {
  // State to manage the dropdown visibility for mobile
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col items-center mt-1 md:mt-2 md:space-y-8 w-full max-w-5xl mx-auto">
      {/* Top Row for Desktop - Reset Button and Download Section */}
      <div className="hidden md:flex justify-between items-center w-full mb-4 px-4">
        <ResetConverterButton onReset={resetHandler} />
        <DownloadButton 
          convertedFile={convertedFile} 
          generateFileName={generateFileName} 
          customFileName={customFileName}
          triggerDownload={triggerDownload}
        />
      </div>

      {/* Download Button for Mobile */}
      <div className="w-full max-w-xs md:hidden">
        <DownloadButton 
          convertedFile={convertedFile} 
          generateFileName={generateFileName} 
          customFileName={customFileName}
          triggerDownload={triggerDownload}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between w-full space-x-0 md:space-x-4">
        {/* Left Column - Converted File Display */}
        <div className="flex-1">
          {/* Mobile Dropdown for File Comparison */}
          <div className="md:hidden mb-4">
            <button 
              className="w-full py-2 mt-4 px-4 text-white text-center bg-[#2C5FF1] rounded-md flex items-center justify-center"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              {isDropdownOpen ? 'Hide File Comparison' : 'View File Comparison'}
              <img
                src={DropdownIcon}
                alt="Dropdown Icon"
                className={`ml-2 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
            {isDropdownOpen && (
              <ConvertedFileDisplay
                convertedFile={convertedFile}
                originalFile={originalFile}
                checkmark={checkmark}
                defaultImageIcon={defaultImage}
                customFileName={customFileName}
                generateFileName={generateFileName}
                altText={altText} // Pass alt text
              />
            )}
          </div>
          
          {/* Desktop View - Always Show */}
          <div className="hidden md:block">
            <ConvertedFileDisplay
              convertedFile={convertedFile}
              originalFile={originalFile}
              checkmark={checkmark}
              defaultImageIcon={defaultImage}
              customFileName={customFileName}
              generateFileName={generateFileName}
              altText={altText} // Pass alt text
            />
          </div>
        </div>
        
        {/* Right Column - Rename and Download */}
        <div className="flex-1 flex flex-col space-y-4">
          <RenameFile
            customFileName={customFileName}
            setCustomFileName={setCustomFileName}
            prefix={prefix}
            setPrefix={setPrefix}
            triggerDownload={triggerDownload}
            convertedFile={convertedFile}
            generateFileName={generateFileName}
            altText={altText} // Pass alt text
            setAltText={setAltText} // Pass function to update alt text
          />
        </div>
      </div>
    </div>
  );
};

export default ImageConversionResults;
