import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

console.log('main: Starting application initialization');

const root = document.getElementById('root');
if (!root) {
  console.error('Root element not found!');
  throw new Error('Root element not found');
}

console.log('main: Root element found, rendering app');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

console.log('main: App rendered'); 