// src/components/ImageConverter.jsx
import React, { useState } from 'react';
import { convertToWebP } from '../utils/fileUtils';
import ProcessingIndicator from './ProcessingIndicator';
import VideoAds from './VideoAds';
import useProcessingSettings from '../hooks/useProcessingSettings';
import useFileHandlers from '../hooks/useFileHandlers';
import useFilePrefix from '../hooks/useFilePrefix';
import checkmark from '../assets/icons/check.svg';
import defaultImageIcon from '../assets/icons/defaultimage.svg';
import RenameFile from './RenameFile';
import FileUploader from './FileUploader';
import ConvertedFileDisplay from './ConvertedFileDisplay';

const ImageConverter = ({ onProcessingComplete }) => {
  const [convertedFile, setConvertedFile] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [customFileName, setCustomFileName] = useState('');
  const [renameOption, setRenameOption] = useState(false);

  const { messages, duration } = useProcessingSettings(fileSize);
  const { prefix, setPrefix, generateFileName } = useFilePrefix();

  // Define handleConversion function
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

  // Call useFileHandlers with handleConversion as an argument
  const {
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleUploadClick,
    isDragging,
    fileInputRef,
  } = useFileHandlers(handleConversion);

  const triggerDownload = (fileData) => {
    const url = URL.createObjectURL(fileData.file);
    const newFileName = generateFileName(`${customFileName}-smart-convert.webp`);

    const a = document.createElement('a');
    a.href = url;
    a.download = newFileName;
    a.click();
    URL.revokeObjectURL(url);
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

  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
      {!isProcessing && convertedFile && (
        <button
          onClick={resetConverter}
          className="block mx-auto mb-4 py-2 px-6 bg-[#8E8E8E] text-white font-semibold rounded hover:bg-[#1e1e1e]"
        >
          Convert Another File
        </button>
      )}

      {!isProcessing && !convertedFile && (
        <FileUploader
          handleUploadClick={handleUploadClick}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          isDragging={isDragging}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />
      )}

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
          <ConvertedFileDisplay
            convertedFile={convertedFile}
            originalFile={originalFile}
            checkmark={checkmark}
            defaultImageIcon={defaultImageIcon}
            customFileName={customFileName}
            generateFileName={generateFileName}
          />
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
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImageConverter;
