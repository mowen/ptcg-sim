import { enablePatches, Patch, produceWithPatches } from 'immer';
import {
  ActionDTO,
  CardDTO,
  BoardStateDTO,
  GameStateDTO,
  PlayerStateDTO,
  BoardState,
  UndoableGameStateDTO,
  UndoableGameState,
} from '../../models';
import actionReducer from './actionReducer';

enablePatches(); // enable immer patches feature for undo/redo

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
  currentState: UndoableGameStateDTO,
  nextState: UndoableGameStateDTO,
  patches: Array<Patch>,
  error: Error = null
): Dump {
  const currentPlayerState = currentState.gameState[
    action.user
  ] as PlayerStateDTO;
  const nextPlayerState = nextState
    ? (nextState.gameState[action.user] as PlayerStateDTO)
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
  currentState: UndoableGameStateDTO,
  nextState: UndoableGameStateDTO,
  patches: Array<Patch>
): void {
  const boardStateError = hasBoardStateError(action, nextState.gameState);
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
  undoableState: UndoableGameStateDTO,
  action: ActionDTO
): UndoableGameStateDTO => {
  const undoableGameState = new UndoableGameState(undoableState);

  let patches: Array<Patch> = new Array<Patch>();
  switch (action.type) {
    case 'undo': {
      patches = undoableGameState.undo();
      break;
    }
    case 'redo': {
      patches = undoableGameState.redo();
      break;
    }
    // I'm making the assumption that undo/redo will never throw exceptions,
    // as their patches have already been applied successfully.
    default: {
      try {
        const actionReducerWithPatches = produceWithPatches(actionReducer);
        const [nextState, patches, inversePatches] = actionReducerWithPatches(
          undoableState.gameState,
          action
        );
        undoableGameState.apply(nextState, { patches, inversePatches });
      } catch (err: unknown) {
        console.error(
          `${action.user} ${action.type}`,
          debugDump(action, undoableState, null, patches, err as Error)
        );
        return undoableState;
      }
    }
  }
  logAction(action, undoableState, undoableGameState.newState, patches);
  return undoableGameState.newState;
};
