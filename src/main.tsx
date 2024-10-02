import { createRoot } from 'react-dom/client';
import Router from './router/Router.tsx'; // assuming your router file is handling your routes
import './index.css';

createRoot(document.getElementById('root')!).render(
  <Router />
);
