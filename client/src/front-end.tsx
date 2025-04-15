import { initializeDOMEventListeners } from './initialization/document-event-listeners/initialize-document-event-listeners.js';
import { loadImportData } from './initialization/load-import-data/load-import-data.js';
import { initializeSocketEventListeners } from './initialization/socket-event-listeners/socket-event-listeners.js';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { ActionDTO } from './models';
import testState from '../tests/react/reducer/testData/data.json';

const actions = testState.filter((obj) => !('version' in obj))
                         .map(a => ({user: a.user, emit: a.emit, type: a.action, parameters: a.parameters }) as ActionDTO); // Remove any objects containing version property

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App initialActions={actions} />
  </StrictMode>
);

initializeSocketEventListeners(); // Initializes all event listeners for socket events
initializeDOMEventListeners(); // Initializes all event listeners for user's actions on html elements and the window
loadImportData(); // get the importData (if there is any), and load the content.

export const selfContainer = new HTMLIFrameElement();
selfContainer.innerHTML =
  "<html><body><div id='selfContainer'></div></body></html>";
export const selfContainerDocument =
  document.getElementById('selfContainer')!.ownerDocument;
export const oppContainer = new HTMLIFrameElement();
oppContainer.innerHTML =
  "<html><body><div id='oppContainer'></div></body></html>";
export const oppContainerDocument =
  document.getElementById('oppContainer')!.ownerDocument;
// eslint-disable-next-line react-refresh/only-export-components
export * from './initialization/global-variables/global-variables.js'; // Initialize all globally accessible variables
