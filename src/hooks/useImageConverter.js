import { useState } from 'react';
import { convertToWebP } from '../utils/fileUtils';

export const useImageConverter = () => {
  const [convertedImage, setConvertedImage] = useState(null);

  const convertImage = async (file) => {
    const result = await convertToWebP(file);
    setConvertedImage(result);
  };

  return { convertedImage, convertImage };
};
