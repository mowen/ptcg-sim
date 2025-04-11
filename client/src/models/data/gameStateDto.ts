import { BoardStateDTO, CardDTO } from '..';

enum UserType {
  Self = 'self',
  Opp = 'opp',
}

enum Player {
  One = 'p1',
  Two = 'p2',
}

class PlayerStateDto {
  public deckList: Array<CardDTO> = new Array<CardDTO>();
  public boardState: BoardStateDTO = new BoardStateDTO();
}

class GameStateDTO {
  public initiator: UserType = UserType.Self;
  public isTwoPlayer: boolean = false;
  public p1: PlayerStateDto = new PlayerStateDto();
  public p2: PlayerStateDto = new PlayerStateDto();
  public oppIsActive: boolean = false;
  public turn: number = 0;
}

export { GameStateDTO, UserType, Player };
