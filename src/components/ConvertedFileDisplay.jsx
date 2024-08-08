import React from 'react';
import { calculateSizeReduction, calculateLoadTime, calculateSizeIncrease } from '../utils/calculations';
import checkIcon from '../assets/icons/check.svg'; // Ensure the path is correct
import defaultImage from '../assets/images/default.png'; // Ensure the path is correct

const ConvertedFileDisplay = ({
  convertedFile,
  originalFile,
  customFileName,
  generateFileName,
  altText // Receive alt text prop
}) => {
  const originalLoadTime = calculateLoadTime(originalFile ? originalFile.size / 1024 / 1024 : 0, 5);
  const convertedLoadTime = calculateLoadTime(convertedFile ? convertedFile.file.size / 1024 / 1024 : 0, 5);
  const loadTimeDifference = (originalLoadTime / convertedLoadTime).toFixed(2);

  const sizeIncrease = convertedFile && originalFile 
    ? calculateSizeIncrease(originalFile.size, convertedFile.file.size)
    : 0;

  const handleImageError = (event) => {
    event.target.src = defaultImage;
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
    <div className="md:w-3/5 md:order-1 order-2 text-center p-4 relative">
      <div className="mt-4 flex flex-col items-center relative">
        <div className="text-center mb-6 relative">
          <h3 className="text-gray-700 font-bold mb-3">Converted Image</h3>
          <div className="relative">
            <img
              src={
                convertedFile
                  ? URL.createObjectURL(convertedFile.file)
                  : defaultImage
              }
              onError={handleImageError}
              alt={altText} // Use alt text prop
              className="w-80 md:min-w-[400px] h-auto mx-auto rounded-2xl object-contain"
            />
            <img src={checkIcon} alt="Checkmark" className="absolute top-[-10px] right-[-10px] h-10 w-10" />
          </div>
          <p className="text-sm text-[#1e1e1e] font-regular mt-2">
            New Size: {(convertedFile.file.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <p className="text-sm text-[#1e1e1e] mt-1">
            File reduced by{' '}
            <span className="text-[#51C82A] font-bold">
              {calculateSizeReduction(
                originalFile.size,
                convertedFile.file.size
              )}
              %
            </span>
          </p>
          <p className="text-sm text-[#1e1e1e] mt-1">
            Loads approximately{' '}
            <span className="text-[#51C82A] font-bold">
              {loadTimeDifference}x faster
            </span>
          </p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-300 my-6"></div>

        <div className="text-center">
          <h3 className="text-[#1e1e1e] font-bold mb-3">Original Image</h3>
          <img
            src={
              originalFile
                ? URL.createObjectURL(originalFile)
                : defaultImage
            }
            onError={handleImageError}
            alt={altText} // Use alt text prop
            className={`w-80 md:min-w-[400px] h-auto mx-auto rounded-2xl object-contain progressive-load`}
          />
          <p className="text-sm text-gray-600 mt-2">
            Old Size: {(originalFile?.size / 1024 / 1024).toFixed(2) || 'N/A'} MB
          </p>
          <p className="text-sm font-semibold text-red-600 mt-1">
            File is {sizeIncrease}% bigger
          </p>
          <p className="text-sm font-semibold text-red-600 mt-1">
            Loads {loadTimeDifference}x slower
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConvertedFileDisplay;
