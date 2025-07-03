import { applyPatches, Patch } from 'immer';
import { GameStateDTO, UndoableGameStateDTO, UndoPatches } from './data';

class UndoableGameState {
  constructor(public undoableState: UndoableGameStateDTO) {}

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

export { UndoableGameState };
