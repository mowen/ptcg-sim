import { Patch } from "immer";
import { GameStateDTO } from "./gameStateDto";

class UndoPatches {
  public patches: Array<Patch> = new Array<Patch>();
  public inversePatches: Array<Patch> = new Array<Patch>();
}

class UndoableGameStateDTO {
  public gameState: GameStateDTO = new GameStateDTO();
  public undoStack: Array<UndoPatches> = new Array<UndoPatches>();
  public undoStackPointer: number = -1;
}

export { UndoPatches, UndoableGameStateDTO };
