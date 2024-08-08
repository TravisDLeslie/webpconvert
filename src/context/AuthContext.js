import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [conversionCount, setConversionCount] = useState(0);
  const [isPaidUser, setIsPaidUser] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setConversionCount(0);
  };

  const incrementConversionCount = () => {
    setConversionCount((prevCount) => prevCount + 1);
  };

  const subscribe = () => setIsPaidUser(true);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        conversionCount,
        incrementConversionCount,
        isPaidUser,
        subscribe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
