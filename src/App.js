// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import only Routes and Route
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-white">
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home route */}
          {/* Add other routes here if needed */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
