import { useCallback, useEffect, useState } from "react";
import { Sidebar, TableTop } from "./react";
import { AppContext, AppDispatchContext, undoableActionReducer } from "./react";
import {
  ActionDTO,
  UiActionDTO,
  UiStateDTO,
  UndoableGameStateDTO,
} from "./models";
import { UiContext, UiDispatchContext } from "./react/context/uiContext";
import { uiActionReducer } from "./react/reducer/uiReducer";

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
  const [uiState, setUiState] = useState(new UiStateDTO());

  const processAction = useCallback(
    (action: ActionDTO) =>
      setState((currentState) => undoableActionReducer(currentState, action)),
    [],
  );

  const processUiAction = useCallback(
    (action: UiActionDTO) =>
      setUiState((currentState) => uiActionReducer(currentState, action)),
    [],
  );

  useEffect(() => {
    const loadImportData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const importKey = urlParams.get("importKey");

      if (importKey) {
        let importDataResponse: Response;
        try {
          importDataResponse = await fetch(`/import/${importKey}`);
          const importDataJson =
            (await importDataResponse.json()) as ImportData;
          const actions = importDataJson.actions.filter(
            (obj) => !("version" in obj),
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
          console.error("Error fetching import data:", error);
        }
      }
    };
    loadImportData();
  }, [processAction]);

  return (
    <UiContext.Provider value={uiState}>
      <UiDispatchContext.Provider value={processUiAction}>
        <AppContext.Provider value={state}>
          <AppDispatchContext.Provider value={processAction}>
            <TableTop state={state} uiState={uiState} />
            <Sidebar state={state} uiState={uiState} />
          </AppDispatchContext.Provider>
        </AppContext.Provider>
      </UiDispatchContext.Provider>
    </UiContext.Provider>
  );
}
