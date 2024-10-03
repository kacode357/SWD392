import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react'; // Import StrictMode
import Router from './router/Router.tsx'; // assuming your router file is handling your routes
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
