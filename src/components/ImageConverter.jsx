import React, { useState } from 'react';
import { convertToWebP } from '../utils/fileUtils';
import ProcessingIndicator from './ProcessingIndicator';
import FileUploader from './FileUploader';
import useProcessingSettings from '../hooks/useProcessingSettings';
import useFileHandlers from '../hooks/useFileHandlers';
import useFilePrefix from '../hooks/useFilePrefix';
import ImageConversionResults from './ImageConversionResults';
import fallbackImage from '../assets/images/fallback.png';

const ImageConverter = ({ onProcessingComplete, setIsProcessing, onReset }) => {
  const [convertedFile, setConvertedFile] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [originalFileUrl, setOriginalFileUrl] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setInternalProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [customFileName, setCustomFileName] = useState('');
  const [altText, setAltText] = useState(''); // State for alt text
  const [renameOption, setRenameOption] = useState(false);
  const [removeSmartConvert, setRemoveSmartConvert] = useState(false); // State to track removal

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
      setAltText(file.name); // Initialize alt text with the file name or any metadata

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

  const triggerDownload = ({ file, fileName }) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; // Use the fileName passed to it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 w-full md:w-full max-w-5xl mx-auto">
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
            src={originalFileUrl || fallbackImage}
            alt={altText || "Processing"} // Use alt text
            className="object-cover rounded-xl"
            style={{
              width: '100%',
              maxWidth: '540px',
              height: '365px'
            }}
            onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }} // Fallback if image fails to load
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
          resetHandler={onReset}
          removeSmartConvert={removeSmartConvert}
          toggleSmartConvert={() => setRemoveSmartConvert(prev => !prev)}
          altText={altText} // Pass alt text to ImageConversionResults
          setAltText={setAltText} // Pass function to update alt text
        />
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImageConverter;
