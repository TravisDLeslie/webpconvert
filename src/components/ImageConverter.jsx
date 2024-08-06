// src/components/ImageConverter.jsx

import React, { useState } from 'react';
import { convertToWebP } from '../utils/fileUtils';
import ProcessingIndicator from './ProcessingIndicator';
import FileUploader from './FileUploader';
import useProcessingSettings from '../hooks/useProcessingSettings';
import useFileHandlers from '../hooks/useFileHandlers';
import useFilePrefix from '../hooks/useFilePrefix';
import ImageConversionResults from './ImageConversionResults';

const ImageConverter = ({ onProcessingComplete, setIsProcessing, onReset }) => { // Accept onReset prop
  const [convertedFile, setConvertedFile] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [originalFileUrl, setOriginalFileUrl] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setInternalProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [customFileName, setCustomFileName] = useState('');
  const [renameOption, setRenameOption] = useState(false);

  const { messages, duration } = useProcessingSettings(fileSize);
  const { prefix, setPrefix, generateFileName } = useFilePrefix();

  const handleConversion = async (file) => {
    try {
      const fileUrl = URL.createObjectURL(file);
      setOriginalFileUrl(fileUrl);
      setError('');
      setConvertedFile(null);
      setInternalProcessing(true);
      setIsProcessing(true);
      setFileName(file.name);
      setFileSize(file.size / 1024 / 1024);
      setOriginalFile(file);

      setTimeout(async () => {
        const webPFile = await convertToWebP(file);
        if (webPFile) {
          const fileData = { file: webPFile, originalName: file.name };
          setConvertedFile(fileData);
          setRenameOption(true);
          onProcessingComplete();
        } else {
          setError('Failed to convert the image.');
        }
        setInternalProcessing(false);
        setIsProcessing(false);
      }, duration);
    } catch (error) {
      setError('Error converting image.');
      setInternalProcessing(false);
      setIsProcessing(false);
    }
  };

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

  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
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

      {isProcessing && (
        <div className="flex flex-col items-center w-full">
          <img
            src={originalFileUrl}
            alt="Processing"
            className="object-cover rounded-xl"
            style={{
              width: '100%',
              maxWidth: '540px',
              height: '365px'
            }}
          />
          <div className="mt-4 w-[320px] flex justify-center">
            <ProcessingIndicator
              messages={messages}
              duration={duration}
              filename={fileName}
            />
          </div>
        </div>
      )}

      {!isProcessing && convertedFile && renameOption && (
        <ImageConversionResults
          convertedFile={convertedFile}
          originalFile={originalFile}
          customFileName={customFileName}
          setCustomFileName={setCustomFileName}
          prefix={prefix}
          setPrefix={setPrefix}
          triggerDownload={triggerDownload}
          generateFileName={generateFileName}
          resetHandler={onReset} // Pass onReset to ImageConversionResults
        />
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImageConverter;
