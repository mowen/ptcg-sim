import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { ActionDTO } from './models';
import testState from '../tests/react/reducer/testData/data.json';

const actions = testState
  .filter((obj) => !('version' in obj))
  .map(
    (a) =>
      ({
        user: a.user,
        emit: a.emit,
        type: a.action,
        parameters: a.parameters,
      } as ActionDTO)
  ); // Remove any objects containing version property

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App initialActions={actions} />
  </StrictMode>
);
