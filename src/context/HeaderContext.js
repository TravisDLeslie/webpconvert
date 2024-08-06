// src/context/HeaderContext.js

import React, { createContext, useContext, useState } from 'react';

// Create a context for managing the header visibility
const HeaderContext = createContext();

// Custom hook to use the Header context
export const useHeaderContext = () => {
  return useContext(HeaderContext);
};

// Provider component
export const HeaderProvider = ({ children }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // Default is visible

  return (
    <HeaderContext.Provider value={{ isHeaderVisible, setIsHeaderVisible }}>
      {children}
    </HeaderContext.Provider>
  );
};
