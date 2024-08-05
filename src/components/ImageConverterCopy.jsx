// src/components/ImageConverter.js

import React, { useRef, useState, useEffect } from 'react';
import { convertToWebP } from '../utils/fileUtils';
import ProcessingIndicator from './ProcessingIndicator';
import VideoAds from './VideoAds';
import useProcessingSettings from '../hooks/useProcessingSettings';
import useFilePrefix from '../hooks/useFilePrefix';
import checkmark from '../assets/icons/check.svg';
import defaultImageIcon from '../assets/icons/defaultimage.svg';
import RenameFile from './RenameFile';

const ImageConverter = ({ onProcessingComplete }) => {
  const [convertedFile, setConvertedFile] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [customFileName, setCustomFileName] = useState('');
  const [renameOption, setRenameOption] = useState(false);
  const fileInputRef = useRef(null);

  const { messages, duration } = useProcessingSettings(fileSize);
  const { prefix, setPrefix, generateFileName } = useFilePrefix();

  useEffect(() => {
    if (originalFile) {
      const loadingTimeout = setTimeout(() => {
        setOriginalFile(originalFile);
      }, 1000);

      return () => clearTimeout(loadingTimeout);
    }
  }, [originalFile]);

  const handleConversion = async (file) => {
    try {
      setError('');
      setConvertedFile(null);
      setIsProcessing(true);
      setFileName(file.name);
      setFileSize(file.size / 1024 / 1024);
      setOriginalFile(file);
      setCustomFileName(file.name.replace(/\.[^/.]+$/, ''));

      setTimeout(async () => {
        const webPFile = await convertToWebP(file);
        if (webPFile) {
          const fileData = { file: webPFile, originalName: file.name };
          setConvertedFile(fileData);
          setRenameOption(true);
          triggerDownload(fileData);
          onProcessingComplete(); // Notify processing completion
        } else {
          setError('Failed to convert the image.');
        }
        setIsProcessing(false);
      }, duration);
    } catch (error) {
      setError('Error converting image.');
      setIsProcessing(false);
    }
  };

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

  const triggerDownload = (fileData) => {
    const url = URL.createObjectURL(fileData.file);
    const newFileName = generateFileName(`${customFileName}-smart-convert.webp`);

    const a = document.createElement('a');
    a.href = url;
    a.download = newFileName;
    a.click();
    URL.revokeObjectURL(url);
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

  const resetConverter = () => {
    setConvertedFile(null);
    setOriginalFile(null);
    setError('');
    setFileName('');
    setFileSize(0);
    setCustomFileName('');
    setPrefix('');
    setRenameOption(false);
  };

  const calculateSizeReduction = (originalSize, newSize) => {
    return (((originalSize - newSize) / originalSize) * 100).toFixed(2);
  };

  const calculateLoadTime = (fileSizeMB, networkSpeedMbps) => {
    const fileSizeBits = fileSizeMB * 1024 * 1024 * 8;
    const networkSpeedBps = networkSpeedMbps * 1024 * 1024;
    return (fileSizeBits / networkSpeedBps).toFixed(2);
  };

  const originalLoadTime = calculateLoadTime(originalFile ? originalFile.size / 1024 / 1024 : 0, 5);
  const convertedLoadTime = calculateLoadTime(convertedFile ? convertedFile.file.size / 1024 / 1024 : 0, 5);

  const handleImageError = (event) => {
    event.target.src = defaultImageIcon;
    event.target.style.width = '80px';
  };

  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
      {!isProcessing && convertedFile && (
        <p className="text-center text-xl text-[#EA552B] mb-2 font-semibold">Convert another file</p>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-10 mb-4 cursor-pointer ${
          isDragging ? 'border-green-600 bg-[FAEBE4] text-white' : 'border-[#EA552B] bg-white'
        } hover:bg-[#EA552B] hover:text-white`}
        style={{ width: convertedFile ? '100%' : '600px' }}
        onClick={handleUploadClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="">
          <p className="text-center text-xl font-bold mb-4">Drag, Drop or Click to Upload</p>
          <p className="text-center font-medium text-lg mb-4">PNG, JPG, AVIF, HEIC</p>
          <p className="text-center text-xs mt-2">Convert iPhone files to use on Webflow, Shopify, Figma, etc.</p>
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

      {fileName && (
        <p className="text-center text-gray-600 text-sm mb-4">Converting: {fileName}</p>
      )}

      {isProcessing && (
        <>
          <VideoAds />
          <ProcessingIndicator
            messages={messages}
            duration={duration}
            fileSize={fileSize}
          />
        </>
      )}

      {!isProcessing && renameOption && (
        <div className="flex flex-col md:flex-row justify-between mt-12 space-x-0 md:space-x-4">
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
              <div className="mt-4 flex justify-center">
                <div className="text-center mx-4">
                  <h3 className="text-gray-700 font-medium mb-2">Original Image</h3>
                  <img
                    src={
                      originalFile
                        ? URL.createObjectURL(originalFile)
                        : defaultImageIcon
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
                        : defaultImageIcon
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

          <div className="md:w-2/5 md:order-2 order-1">
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
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImageConverter;
