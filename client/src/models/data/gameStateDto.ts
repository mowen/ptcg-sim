import { immerable } from "immer";
import { PlayerStateDTO } from "./playerStateDto";

enum UserType {
  Self = "self",
  Opp = "opp",
}

class GameStateDTO {
  [immerable] = true;

  [key: string]: any;

  public activeUser: UserType = UserType.Self;
  public isTwoPlayer: boolean = false;
  public self: PlayerStateDTO = new PlayerStateDTO(UserType.Self);
  public opp: PlayerStateDTO = new PlayerStateDTO(UserType.Opp);
}

export { GameStateDTO, UserType };
