import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './router/router.tsx'; // assuming your router file is handling your routes
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
