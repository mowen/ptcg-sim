import { createContext } from "react";
import { ActionDTO, UndoableGameStateDTO } from "../../models";

export const AppContext = createContext<UndoableGameStateDTO | undefined>(
  undefined,
);
export const AppDispatchContext = createContext((action: ActionDTO) => {});
