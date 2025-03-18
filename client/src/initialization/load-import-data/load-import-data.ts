import { acceptAction } from '../../setup/general/accept-action.js';
import { refreshBoardImages } from '../../setup/sizing/refresh-board.js';

export function loadImportData() {
  const urlParams = new URLSearchParams(window.location.search);
  const importKey = urlParams.get('importKey');

  if (importKey) {
      fetch(`/import/${importKey}`)
        .then(handleImportDataResponse)
        .catch((error) => {
          console.error('Error fetching import data:', error);
        });
      }
}

function handleImportDataResponse(response) {
  response.json()
    .then(handleImportDataJson)
    .catch((error) => {
      console.error('Error parsing import data JSON:', error);
    });
}

function handleImportDataJson(data): any {
  const actions = data.actions.filter((obj) => !('version' in obj)); // Remove any objects containing version property
  actions.forEach((action) => {
    acceptAction(action.user, action.action, action.parameters, true);
  });
  refreshBoardImages();
}

