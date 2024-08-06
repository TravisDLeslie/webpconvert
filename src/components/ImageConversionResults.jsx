// src/components/ImageConversionResults.jsx

import React from 'react';
import ConvertedFileDisplay from './ConvertedFileDisplay';
import RenameFile from './RenameFile';
import checkmark from '../assets/icons/check.svg';
import defaultImageIcon from '../assets/icons/defaultimage.svg';
import DownloadButton from './DownloadButton';
import ResetConverterButton from './ResetConverterButton';
import Header from './Header';

const ImageConversionResults = ({
  convertedFile,
  originalFile,
  customFileName,
  setCustomFileName,
  prefix,
  setPrefix,
  triggerDownload, // Ensure this prop is being passed
  generateFileName,
  resetHandler  // Expecting this prop from the parent component
}) => {
  return (
    <div className="flex flex-col items-center mt-12 space-y-8">
      {/* Centered Reset Button */}
      <ResetConverterButton onReset={resetHandler} />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-5xl space-x-0 md:space-x-4">
        {/* Left Column - Converted File Display */}
        <div className="flex-1">
          <ConvertedFileDisplay
            convertedFile={convertedFile}
            originalFile={originalFile}
            checkmark={checkmark}
            defaultImageIcon={defaultImageIcon}
            customFileName={customFileName}
            generateFileName={generateFileName}
          />
        </div>
        
        {/* Right Column - Rename and Download */}
        <div className="flex-1 flex flex-col space-y-4">
          <div className="self-start mb-4">
            <DownloadButton 
              convertedFile={convertedFile} 
              generateFileName={generateFileName} 
              customFileName={customFileName}
              triggerDownload={triggerDownload} // Pass triggerDownload to DownloadButton
            />
          </div>
          <RenameFile
            customFileName={customFileName}
            setCustomFileName={setCustomFileName}
            prefix={prefix}
            setPrefix={setPrefix}
            triggerDownload={triggerDownload}
            convertedFile={convertedFile}
            generateFileName={generateFileName}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageConversionResults;
