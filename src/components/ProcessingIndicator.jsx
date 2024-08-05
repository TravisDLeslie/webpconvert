// src/components/ProcessingIndicator.js

import React, { useEffect, useState } from 'react';

const ProcessingIndicator = ({ messages, duration }) => {
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
    setProgress(100);

    // Cleanup interval on component unmount
    return () => clearInterval(messageInterval);
  }, [duration, messages]);

  return (
    <div className="mb-4">
      <p className="text-center text-green-600 mb-2">{message}</p>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
          <div
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-800"
            style={{ width: `${progress}%`, transition: `width ${duration}ms linear` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;
