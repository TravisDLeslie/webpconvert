// src/components/VideoAds.js

import React from 'react';

const VideoAds = () => {
  return (
    <div className="mb-4 md:w[800px]">
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" // Add autoplay and mute parameters
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full rounded"
      ></iframe>
    </div>
  );
};

export default VideoAds;
