// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { HeaderProvider } from './context/HeaderContext'; // Import the HeaderProvider
import './index.css';
import './styles/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HeaderProvider> {/* Wrap the app with HeaderProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HeaderProvider>
  </React.StrictMode>
);
