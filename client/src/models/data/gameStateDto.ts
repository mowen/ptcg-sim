import { Patch } from 'immer';
import { BoardStateDTO, CardDTO } from '..';

enum UserType {
  Self = 'self',
  Opp = 'opp',
}

enum Player {
  One = 'p1',
  Two = 'p2',
}

class PlayerStateDTO {
  public deckList: Array<CardDTO> = new Array<CardDTO>();
  public boardState: BoardStateDTO = new BoardStateDTO();
}

class UndoPatches {
  public patches: Array<Patch>;
  public inversePatches: Array<Patch>;
}

class GameStateDTO {
  public initiator: UserType = UserType.Self;
  public isTwoPlayer: boolean = false;
  public p1: PlayerStateDTO = new PlayerStateDTO();
  public p2: PlayerStateDTO = new PlayerStateDTO();
  public oppIsActive: boolean = false;
  public turn: number = 0;
  public undoStack: Array<UndoPatches> = new Array<UndoPatches>();
  public undoStackPointer = -1;
  public undoable: boolean = true;
}

export { GameStateDTO, UserType, Player, PlayerStateDTO };
