import { createContext } from 'react';
import { ActionDTO, UndoableGameStateDTO } from '../../models';

export const AppContext = createContext(new UndoableGameStateDTO());
export const AppDispatchContext = createContext((action: ActionDTO) => {});
