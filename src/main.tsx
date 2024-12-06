import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { seedDatabase } from './lib/seed';

// Initialize and seed the database
seedDatabase()
  .then(() => {
    console.log('Database initialization complete');
  })
  .catch(error => {
    console.error('Failed to seed database:', error);
  });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);