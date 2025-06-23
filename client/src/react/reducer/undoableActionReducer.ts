import { applyPatches, enablePatches, Patch, produceWithPatches } from 'immer';
import {
  ActionDTO,
  CardDTO,
  BoardStateDTO,
  GameStateDTO,
  PlayerStateDTO,
  BoardState,
} from '../../models';
import actionReducer from './actionReducer';

enablePatches(); // enable immer patches feature for undo/redo

class UndoPatches {
  public patches: Array<Patch>;
  public inversePatches: Array<Patch>;
}

const undoStack: Array<UndoPatches> = new Array<UndoPatches>();
let undoStackPointer: number = -1;

type Dump = {
  action: ActionDTO;
  deckList: Array<CardDTO>;
  currentBoard: BoardStateDTO;
  nextBoard: BoardStateDTO;
  patches?: Array<Patch>;
  error: Error;
};

function debugDump(
  action: ActionDTO,
  currentState: GameStateDTO,
  nextState: GameStateDTO,
  patches: Array<Patch>,
  error: Error = null
): Dump {
  const currentPlayerState = currentState[action.user] as PlayerStateDTO;
  const nextPlayerState = nextState
    ? (nextState[action.user] as PlayerStateDTO)
    : null;

  const dump: Dump = {
    action,
    deckList: currentPlayerState.deckList,
    currentBoard: currentPlayerState.boardState,
    nextBoard: nextPlayerState?.boardState,
    patches,
    error,
  };

  return dump;
}

function hasBoardStateError(
  action: ActionDTO,
  gameState: GameStateDTO
): Error | null {
  const playerState = gameState[action.user];
  try {
    new BoardState(playerState);
    return null;
  } catch (err: unknown) {
    return err as Error;
  }
}

function logAction(
  action: ActionDTO,
  currentState: GameStateDTO,
  nextState: GameStateDTO,
  patches: Array<Patch>
): void {
  const boardStateError = hasBoardStateError(action, nextState);
  if (boardStateError) {
    console.error(
      `${action.user} ${action.type}`,
      debugDump(action, currentState, nextState, patches, boardStateError)
    );
  } else {
    console.debug(
      `${action.user} ${action.type}`,
      debugDump(action, currentState, nextState, patches, boardStateError)
    );
  }
}

export const undoableActionReducer = (
  currentState: GameStateDTO,
  action: ActionDTO
): GameStateDTO => {
  switch (action.type) {
    case 'undo': {
      if (undoStackPointer < 0) return currentState;
      const patches = undoStack[undoStackPointer].inversePatches;
      undoStackPointer--;
      const nextState = applyPatches(currentState, patches);
      logAction(action, currentState, nextState, patches);
      return nextState;
    }
    case 'redo': {
      if (undoStackPointer === undoStack.length - 1) return currentState;
      undoStackPointer++;
      const patches = undoStack[undoStackPointer].patches;
      const nextState = applyPatches(currentState, patches);
      logAction(action, currentState, nextState, patches);
      return nextState;
    }
    // I'm making the assumption that undo/redo will never throw exceptions,
    // as their patches have already been applied successfully.
    default: {
      try {
        const actionReducerWithPatches = produceWithPatches(actionReducer);
        const [nextState, patches, inversePatches] = actionReducerWithPatches(
          currentState,
          action
        );
        const pointer = ++undoStackPointer;
        undoStack.length = pointer;
        undoStack[pointer] = { patches, inversePatches };
        logAction(action, currentState, nextState, patches);
        return nextState;
      } catch (err: unknown) {
        console.error(
          `${action.user} ${action.type}`,
          debugDump(action, currentState, null, null, err as Error)
        );
      }
    }
  }
};
