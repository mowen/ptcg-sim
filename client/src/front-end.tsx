export * from './initialization/global-variables/global-variables.js'; // Initialize all globally accessible variables

import { initializeDOMEventListeners } from './initialization/document-event-listeners/initialize-document-event-listeners.js';
import { loadImportData } from './initialization/load-import-data/load-import-data.js';
import { initializeSocketEventListeners } from './initialization/socket-event-listeners/socket-event-listeners.js';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

initializeSocketEventListeners(); // Initializes all event listeners for socket events
initializeDOMEventListeners(); // Initializes all event listeners for user's actions on html elements and the window
loadImportData(); // get the importData (if there is any), and load the content.
