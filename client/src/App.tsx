import { useCallback, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import TableTop from './TableTop';
import { AppContext, AppDispatchContext, undoableActionReducer } from './react';
import { ActionDTO, UndoableGameStateDTO } from './models';

type ImportAction = {
  user: string;
  action: string;
  parameters: Array<unknown>;
  emit: boolean;
};

type ImportData = {
  actions: Array<{ version: string } | ImportAction>;
};

export function App() {
  const [state, setState] = useState(new UndoableGameStateDTO());

  const processAction = useCallback(
    (action: ActionDTO) =>
      setState((currentState) => undoableActionReducer(currentState, action)),
    []
  );

  useEffect(() => {
    const loadImportData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const importKey = urlParams.get('importKey');

      if (importKey) {
        let importDataResponse: Response;
        try {
          importDataResponse = await fetch(`/import/${importKey}`);
          const importDataJson =
            (await importDataResponse.json()) as ImportData;
          const actions = importDataJson.actions.filter(
            (obj) => !('version' in obj)
          ) as Array<ImportAction>; // Remove any objects containing version property
          actions.forEach((action: ImportAction) => {
            processAction({
              user: action.user,
              type: action.action,
              parameters: action.parameters,
              emit: action.emit,
            });
          });
        } catch (error) {
          console.error('Error fetching import data:', error);
        }
      }
    };
    loadImportData();
  }, [processAction]);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={processAction}>
        <TableTop state={state} />
        <Sidebar />
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}
