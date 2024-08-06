// src/components/FileTypes.jsx

import React from 'react';

const FileTypes = () => {
  const fileTypes = [
    'JPEG (.jpg, .jpeg)',
    'PNG (.png)',
    'GIF (.gif)',
    'TIFF (.tiff)',
    'BMP (.bmp)',
    'SVG (.svg)',
    'HEIC (.heic)',
    'AVIF (.avif)',

  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">File Types Supported for WebP Conversion</h1>
      <ul className="list-disc list-inside text-lg text-center">
        {fileTypes.map((type, index) => (
          <li key={index} className="mb-2">{type}</li>
        ))}
      </ul>
      <p className="text-center text-gray-600 mt-4">
        These file types can be easily converted to WebP format, offering improved compression and image quality.
      </p>
    </div>
  );
};

export default FileTypes;
