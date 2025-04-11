import { initializeDOMEventListeners } from './initialization/document-event-listeners/initialize-document-event-listeners.js';
import { loadImportData } from './initialization/load-import-data/load-import-data.js';
import { initializeSocketEventListeners } from './initialization/socket-event-listeners/socket-event-listeners.js';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { GameStateDTO } from './models';
import { Undoable, undoableReducer, actionReducer } from './react';
import testState from '../tests/react/reducer/testData/data.json';

// const validateGameState = (gameState: Undoable<GameStateDTO>): boolean => {
//   const gs = gameState.present;
//   const selfBoardState = new BoardState(gs.self, gs.selfDeckList);
//   const oppBoardState = new BoardState(gs.opp, gs.oppDeckList);
//   return selfBoardState.validate() && oppBoardState.validate();
// };

let initialState = new Undoable<GameStateDTO>(new GameStateDTO());
// const initialState = new GameStateDTO();
const actions = testState.filter((obj) => !('version' in obj)); // Remove any objects containing version property
actions.forEach((a) => {
  const undoableActionReducer = undoableReducer(actionReducer);
  initialState = undoableActionReducer(initialState, {user: a.user, emit: a.emit, type: a.action, parameters: a.parameters });
  // actionReducer(initialState, a as ActionDTO);
  // if (
  //   !validateGameState(initialState) &&
  //   action.type !== 'loadDeckData' &&
  //   action.type !== 'setup'
  // ) {
  //   console.error(`Game state invalid`, action, initialState);
  // }
});

console.debug(`Initial state:`, initialState);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App initialState={initialState} />
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
