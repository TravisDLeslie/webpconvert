// src/components/ProcessingIndicator.js

import React, { useEffect, useState } from 'react';

const ProcessingIndicator = ({ messages, duration, filename }) => {
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageIntervalDuration = duration / messages.length;

    let currentMessageIndex = 0;

    // Set initial message
    setMessage(messages[currentMessageIndex]);
    currentMessageIndex += 1;

    // Update messages at regular intervals
    const messageInterval = setInterval(() => {
      if (currentMessageIndex < messages.length) {
        setMessage(messages[currentMessageIndex]);
        currentMessageIndex += 1;
      } else {
        clearInterval(messageInterval);
      }
    }, messageIntervalDuration);

    // Animate the progress bar from 0% to 100% over the full duration
    const progressInterval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + (100 / (duration / 1000)));
      } else {
        clearInterval(progressInterval);
      }
    }, 1000);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [duration, messages, progress]);

  return (
    <div className="w-full max-w-lg mx-auto p-2 bg-white rounded-lg shadow-md flex flex-col items-center"> {/* Adjust max-width as needed */}
      <p className="text-center text-base font-medium mb-2">{message}</p>
      <p className="text-center text-sm text-[#1e1e1e] font-light mb-2">{filename}</p> {/* Display the filename */}
      <div className="relative w-full h-2.5 bg-[#DFE5E0] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#00DB37] rounded-full"
          style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
        ></div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;
