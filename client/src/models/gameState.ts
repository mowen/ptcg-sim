import { BoardStateDTO, CardDTO } from '../models';

class UserType {
  public static readonly Self: string = 'self';
  public static readonly Opp: string = 'opp';
}

class GameStateDTO {
  public initiator: string = UserType.Self;
  public isTwoPlayer: boolean = false;
  public selfDeckList: Array<CardDTO> = new Array<CardDTO>();
  public self: BoardStateDTO = new BoardStateDTO();
  public oppDeckList: Array<CardDTO> = new Array<CardDTO>();
  public opp: BoardStateDTO = new BoardStateDTO();
  public oppIsActive: boolean = false;
  public turn: number = 0;
}

export { BoardStateDTO, GameStateDTO, UserType };
