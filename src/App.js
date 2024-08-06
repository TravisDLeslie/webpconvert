// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { HeaderProvider, useHeaderContext } from './context/HeaderContext'; // Import the HeaderProvider

function App() {
  return (
    <HeaderProvider> {/* Wrap the app with HeaderProvider to provide context */}
      <div className="min-h-screen flex flex-col">
        <HeaderWrapper />
        <div className="flex-grow flex items-center justify-center bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add other routes here if needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </HeaderProvider>
  );
}

// HeaderWrapper component to conditionally render the Header
const HeaderWrapper = () => {
  const { isHeaderVisible } = useHeaderContext(); // Use the custom hook within a component inside the provider
  return isHeaderVisible ? <Header /> : null;
};

export default App;
