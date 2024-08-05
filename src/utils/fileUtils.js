// src/utils/fileUtils.js

import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

export const convertToWebP = async (file) => {
  try {
    // Check if the file is in HEIC format
    if (file.type === 'image/heic' || file.type === 'image/heif') {
      const blob = await heic2any({
        blob: file,
        toType: 'image/webp',
        quality: 0.8,
      });

      // Ensure the output file is under 1MB
      if (blob.size / 1024 > 1000) {
        // Further compress the blob if it's larger than 1MB
        const compressedBlob = await imageCompression(blob, {
          maxSizeMB: 1,
          fileType: 'image/webp',
          useWebWorker: true,
        });
        return compressedBlob;
      }

      return blob;
    } else {
      // Use browser-image-compression for other formats
      const options = {
        maxSizeMB: 1, // Target size is 1MB
        maxWidthOrHeight: 1920, // Resize if necessary
        useWebWorker: true,
        fileType: 'image/webp',
      };

      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    }
  } catch (error) {
    console.error('Error converting image:', error);
    return null;
  }
};
