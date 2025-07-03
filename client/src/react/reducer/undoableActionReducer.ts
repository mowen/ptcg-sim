import { applyPatches, enablePatches, Patch, produceWithPatches } from 'immer';
import {
  ActionDTO,
  CardDTO,
  BoardStateDTO,
  GameStateDTO,
  PlayerStateDTO,
  BoardState,
  UndoableGameStateDTO,
  UndoPatches,
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

class UndoableGameState {
  constructor(public undoableState: UndoableGameStateDTO) {}

  get gameState(): GameStateDTO {
    return this.undoableState.gameState;
  }

  get newState(): UndoableGameStateDTO {
    return {
      gameState: this.undoableState.gameState,
      undoStack: this.undoableState.undoStack,
      undoStackPointer: this.undoableState.undoStackPointer,
    };
  }

  public undo(): Array<Patch> {
    if (this.undoableState.undoStackPointer < 0) return;
    const inversePatches =
      this.undoableState.undoStack[this.undoableState.undoStackPointer]
        .inversePatches;
    this.undoableState.undoStackPointer--;
    this.undoableState.gameState = applyPatches(
      this.undoableState.gameState,
      inversePatches
    );
    return inversePatches;
  }

  public redo(): Array<Patch> {
    if (
      this.undoableState.undoStackPointer ===
      this.undoableState.undoStack.length - 1
    )
      return;
    this.undoableState.undoStackPointer++;
    const patches =
      this.undoableState.undoStack[this.undoableState.undoStackPointer].patches;
    this.undoableState.gameState = applyPatches(
      this.undoableState.gameState,
      patches
    );
    return patches;
  }

  public apply(gameState: GameStateDTO, undoPatches: UndoPatches) {
    this.undoableState.undoStackPointer++;
    this.undoableState.undoStack.length = this.undoableState.undoStackPointer;
    this.undoableState.undoStack[this.undoableState.undoStackPointer] =
      undoPatches;
    this.undoableState.gameState = gameState;
  }
}

export const undoableActionReducer = (
  undoableState: UndoableGameStateDTO,
  action: ActionDTO
): UndoableGameStateDTO => {
  const undoableGameState = new UndoableGameState(undoableState);

  switch (action.type) {
    case 'undo': {
      const currentState = undoableState;
      const patches = undoableGameState.undo();
      logAction(action, currentState, undoableState, patches);
      return undoableGameState.newState;
    }
    case 'redo': {
      const currentState = undoableState;
      const patches = undoableGameState.redo();
      logAction(action, currentState, undoableState, patches);
      return undoableGameState.newState;
    }
    // I'm making the assumption that undo/redo will never throw exceptions,
    // as their patches have already been applied successfully.
    default: {
      try {
        const currentState = undoableState;
        const actionReducerWithPatches = produceWithPatches(actionReducer);
        const [nextState, patches, inversePatches] = actionReducerWithPatches(
          undoableState.gameState,
          action
        );
        undoableGameState.apply(nextState, { patches, inversePatches });
        logAction(
          action,
          currentState,
          undoableGameState.undoableState,
          patches
        );
        return undoableGameState.newState;
      } catch (err: unknown) {
        console.error(
          `${action.user} ${action.type}`,
          debugDump(action, undoableState, null, null, err as Error)
        );
      }
    }
  }
};
