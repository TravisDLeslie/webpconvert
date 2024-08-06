// src/components/DimmableContainer.js
import React from 'react';

const DimmableContainer = ({ children, dim }) => {
  return (
    <div className={`transition-opacity duration-300 ${dim ? 'opacity-20' : 'opacity-100'}`}>
      {children}
    </div>
  );
};

export default DimmableContainer;
