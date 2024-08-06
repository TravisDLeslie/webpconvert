// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Pricing from './components/Pricing'; // Import Pricing component
import FileTypes from './components/FileTypes'; // Import the FileTypes component
import Login from './components/Login'; // Import Login component
import SignUp from './components/SignUp'; // Import SignUp component
import { HeaderProvider, useHeaderContext } from './context/HeaderContext'; // Import the HeaderProvider

function App() {
  return (
    <HeaderProvider> {/* Wrap the app with HeaderProvider to provide context */}
      <div className="min-h-screen w-full flex flex-col">
        <HeaderWrapper />
        <div className="flex-grow flex items-center justify-center bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/file-types" element={<FileTypes />} /> {/* Add the FileTypes route */}
            <Route path="/pricing" element={<Pricing />} /> {/* Add the FileTypes route */}
            <Route path="/login" element={<Login />} /> {/* Add Login route */}
            <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
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
