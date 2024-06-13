import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './assets/styles/index.scss';
import { ExchangeRateProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <ExchangeRateProvider>
      <App />
    </ExchangeRateProvider>
  </React.StrictMode>
);
