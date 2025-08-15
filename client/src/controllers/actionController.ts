import { MissingCardError } from "../errors/missingCardError";
import {
  ActionDTO,
  BoardState,
  PlayerStateDTO,
  UndoableGameStateDTO,
} from "../models";

export default class ActionController {
  constructor(
    private readonly _activeUser: string,
    private readonly _processAction: (action: ActionDTO) => void,
    private readonly _state: UndoableGameStateDTO,
  ) {}

  public attack() {
    this._processAction({
      user: this._activeUser,
      emit: true,
      type: "attack",
      parameters: [this._activeUser],
    });
  }

  public pass() {
    this._processAction({
      user: this._activeUser,
      emit: true,
      type: "pass",
      parameters: [this._activeUser],
    });
  }

  public takeTurn() {
    this._processAction({
      user: this._activeUser,
      emit: true,
      type: "takeTurn",
      parameters: [this._activeUser],
    });
  }

  public undo() {
    this._processAction({
      user: this._activeUser,
      emit: true,
      type: "undo",
      parameters: [],
    });
  }

  public redo() {
    this._processAction({
      user: this._activeUser,
      emit: true,
      type: "redo",
      parameters: [],
    });
  }

  public moveCardTo(cardIdString: string, zoneId?: string) {
    if (zoneId === undefined) return;

    const playerState = this._state.gameState[this._activeUser];
    const boardState = new BoardState(playerState);

    const cardId = parseInt(cardIdString);
    const currentZoneId = boardState.zoneIdForCardId(cardId);
    if (currentZoneId === undefined)
      throw new MissingCardError(
        `${cardId} was not found in any of ${this._activeUser}'s zones`,
      );

    const zoneArray = playerState.boardState[currentZoneId] as Array<number>;
    console.log(zoneArray, cardId);
    const sourceZoneIndex = zoneArray.indexOf(cardId);

    this._processAction({
      user: this._activeUser,
      emit: true,
      type: "moveCardBundle",
      parameters: [
        this._activeUser,
        currentZoneId,
        zoneId,
        sourceZoneIndex,
        false,
        "move",
      ],
    });
  }
}
