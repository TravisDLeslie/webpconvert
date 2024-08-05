// src/App.js

import React from 'react';
import Home from './components/Home'; // Import the Home component
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#FAEBE4] flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;
