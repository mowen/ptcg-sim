import { BoardStateDTO, CardDTO } from '..';

enum UserType {
  Self = 'self',
  Opp = 'opp',
}

class GameStateDTO {
  public initiator: UserType = UserType.Self;
  public isTwoPlayer: boolean = false;
  public selfDeckList: Array<CardDTO> = new Array<CardDTO>();
  public self: BoardStateDTO = new BoardStateDTO();
  public oppDeckList: Array<CardDTO> = new Array<CardDTO>();
  public opp: BoardStateDTO = new BoardStateDTO();
  public oppIsActive: boolean = false;
  public turn: number = 0;
}

export { GameStateDTO, UserType };
