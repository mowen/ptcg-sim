import { immerable } from "immer";
import { UserType } from "./gameStateDto";
import { CardDTO } from "./cardDto";
import { BoardStateDTO } from "./boardStateDto";

export class PlayerStateDTO {
  [immerable] = true;

  public deckList: Array<CardDTO> = new Array<CardDTO>();
  public boardState: BoardStateDTO = new BoardStateDTO();

  constructor(public readonly player: UserType) {}
}
