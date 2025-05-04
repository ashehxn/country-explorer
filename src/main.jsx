// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SessionProvider } from './context/SessionProvider.jsx';
import { ThemeProviderWrapper } from './context/ThemeContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <SessionProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </SessionProvider>
    </ThemeProviderWrapper>
  </React.StrictMode>
);
