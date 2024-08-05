// src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tailwind.css';
import App from './App';

// Find the root element in the HTML
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
