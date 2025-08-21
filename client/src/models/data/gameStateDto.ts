import { immerable } from "immer";
import { BoardStateDTO, CardDTO } from "..";

enum UserType {
  Self = "self",
  Opp = "opp",
}

class PlayerStateDTO {
  [immerable] = true;

  public player: UserType = UserType.Self;
  public deckList: Array<CardDTO> = new Array<CardDTO>();
  public boardState: BoardStateDTO = new BoardStateDTO();
}

class GameStateDTO {
  [immerable] = true;

  [key: string]: any;

  public activeUser: UserType = UserType.Self;
  public isTwoPlayer: boolean = false;
  public self: PlayerStateDTO = new PlayerStateDTO();
  public opp: PlayerStateDTO = new PlayerStateDTO();
}

export { GameStateDTO, UserType, PlayerStateDTO };
