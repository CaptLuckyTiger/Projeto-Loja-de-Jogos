import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './view/App';
import ErrorBoundary from './view/components/ErrorBoundary';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
