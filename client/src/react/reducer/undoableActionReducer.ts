import { applyPatches, enablePatches, Patch, produceWithPatches } from 'immer';
import { ActionDTO, GameStateDTO } from '../../models';
import actionReducer from './actionReducer';

enablePatches(); // enable immer patches feature for undo/redo

class UndoPatches {
  public patches: Array<Patch>;
  public inversePatches: Array<Patch>;
}

const undoStack: Array<UndoPatches> = new Array<UndoPatches>();
let undoStackPointer: number = -1;

export const undoableActionReducer = (
  currentState: GameStateDTO,
  action: ActionDTO
): GameStateDTO => {
  console.debug(`In undoableActionReducer`, currentState, action);

  switch (action.type) {
    case 'undo': {
      if (undoStackPointer < 0) return currentState;
      const patches = undoStack[undoStackPointer].inversePatches;
      undoStackPointer--;
      return applyPatches(currentState, patches);
    }
    case 'redo': {
      if (undoStackPointer === undoStack.length - 1) return currentState;
      undoStackPointer++;
      const patches = undoStack[undoStackPointer].patches;
      return applyPatches(currentState, patches);
    }
    default: {
      const actionReducerWithPatches = produceWithPatches(actionReducer);
      const [nextState, patches, inversePatches] = actionReducerWithPatches(
        currentState,
        action
      );
      const pointer = ++undoStackPointer;
      undoStack.length = pointer;
      undoStack[pointer] = { patches, inversePatches };
      return nextState;
    }
  }
};
