import React from 'react';
import { AlertProvider } from 'react-alert-with-buttons';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
    
  </React.StrictMode>
);
