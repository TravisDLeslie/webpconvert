// src/components/FileInformation.js
import React from 'react';
import defaultImageIcon from '../assets/icons/defaultimage.svg';

const FileInformation = ({ file, title, sizeIncrease, handleImageError, isConverted }) => {
  return (
    <div className="text-center">
      <h3 className="text-gray-700 font-medium mb-2">{title}</h3>
      <img
        src={file ? URL.createObjectURL(file) : defaultImageIcon}
        onError={handleImageError}
        alt={`${title} file`}
        className={`w-80 h-auto mx-auto border ${isConverted ? 'border-4 border-[#7CCA83]' : 'border-gray-300'} rounded object-contain`}
      />
      <p className="text-sm text-gray-600 mt-2">
        Size: {(file?.size / 1024 / 1024).toFixed(2) || 'N/A'} MB
      </p>
      {isConverted ? (
        <p className="text-sm text-green-600 mt-1">
          File reduced by{' '}
          <span className="font-bold">
            {sizeIncrease}%
          </span>
        </p>
      ) : (
        <p className="text-sm font-semibold text-red-600 mt-1">
          {sizeIncrease}% bigger
        </p>
      )}
    </div>
  );
};

export default FileInformation;
