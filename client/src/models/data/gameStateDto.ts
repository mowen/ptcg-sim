import { immerable } from 'immer';
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
  [immerable] = true;

  public deckList: Array<CardDTO> = new Array<CardDTO>();
  public boardState: BoardStateDTO = new BoardStateDTO();
}

class GameStateDTO {
  [immerable] = true;

  public initiator: UserType = UserType.Self;
  public isTwoPlayer: boolean = false;
  public p1: PlayerStateDTO = new PlayerStateDTO();
  public p2: PlayerStateDTO = new PlayerStateDTO();
}

export { GameStateDTO, UserType, Player, PlayerStateDTO };
