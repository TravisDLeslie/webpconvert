// src/hooks/useProcessingSettings.js

import { useEffect, useState } from 'react';

const useProcessingSettings = (fileSize) => {
  const [messages, setMessages] = useState([]);
  const [duration, setDuration] = useState(5000); // Default duration

  useEffect(() => {
    if (fileSize < 1) {
      // Small file (< 1MB)
      setMessages([
        'Quickly converting your  file...',
        'Almost done...',
      ]);
      setDuration(8000); // 8 seconds for small files
    } else if (fileSize < 5) {
      // Medium file (1MB - 5MB)
      setMessages([
        'Converting your file...',
        'Optimizing it...',
        'Make sure quality is the same...',
        'Almost done...',
        'Just touching it up...',
      ]);
      setDuration(22000); // 16 seconds for medium files
    } else {
      // Large file (>= 5MB)
      setMessages([
        'Converting your  file...',
        'This might take a just a little longer...',
        'Ensuring quality remains high...',
        'Almost done...',
        'Just touching it up...',
      ]);
      setDuration(24000); // 24 seconds for large files
    }
  }, [fileSize]);

  return { messages, duration };
};

export default useProcessingSettings;
