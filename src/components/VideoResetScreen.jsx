// src/components/VideoResetScreen.jsx

import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import { useHeaderContext } from '../context/HeaderContext'; // Import the custom hook

const VideoResetScreen = ({ onVideoEnd }) => {
  const [showUploader, setShowUploader] = useState(false);
  const [countdown, setCountdown] = useState(15); // Start countdown from 15
  const { setIsHeaderVisible } = useHeaderContext(); // Destructure the setIsHeaderVisible function

  useEffect(() => {
    // Hide the header when the component mounts
    setIsHeaderVisible(false);

    // Countdown logic
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Set a timeout to enable the file uploader after 15 seconds
    const timer = setTimeout(() => {
      setShowUploader(true);
      if (onVideoEnd) onVideoEnd(); // Notify parent component that the video has ended
      setIsHeaderVisible(true); // Show the header once the video ends
    }, 15000); // 15 seconds

    // Clean up the timer and interval when the component unmounts
    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [onVideoEnd, setIsHeaderVisible]);

  // Warn the user not to refresh the page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Show a warning when the user tries to leave the page
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!showUploader && (
        <>
          <p className="mt-4 text-xl mb-8 text-center">Please wait {countdown} seconds...</p>
          <div className="relative w-full md:w-[800px] aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" // Replace with your YouTube video ID
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </>
      )}
      {showUploader && (
        <div className="mt-8">
          <FileUploader />
        </div>
      )}
    </div>
  );
};

export default VideoResetScreen;
