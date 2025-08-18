import { DragEndEvent } from "@dnd-kit/core";
import { MissingCardError } from "../errors/missingCardError";
import {
  ActionDTO,
  BoardState,
  PlayerStateDTO,
  UndoableGameStateDTO,
} from "../models";

export default class ActionController {
  private readonly _playerState: PlayerStateDTO;
  private readonly _boardState: BoardState;

  constructor(
    private readonly _activeUser: string,
    private readonly _processAction: (action: ActionDTO) => void,
    private readonly _state: UndoableGameStateDTO,
  ) {
    this._playerState = this._state.gameState[this._activeUser];
    this._boardState = new BoardState(this._playerState);
  }

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

  public discardBoard() {
    this._processAction({
      user: this._activeUser,
      emit: true,
      type: "discardBoard",
      parameters: [this._activeUser, true],
    });
  }

  public handleCardDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && active.data.current) {
      if (over) {
        this.moveCard(
          active.id.toString(),
          active.data.current.zoneId,
          active.data.current.zoneIndex,
          over.id.toString(),
          over.data?.current?.zoneId,
          over.data?.current?.zoneIndex,
        );
      } else {
        console.warn(`DragEndevent had no over`);
      }
    } else {
      console.warn(`DragEndevent had no active`);
    }
  }

  private moveCard(
    sourceCardIdString: string,
    sourceZoneId: string,
    sourceZoneIndex: string,
    targetCardIdOrZoneId: string | undefined,
    targetZoneId: string | undefined,
    targetZoneIndex: string | undefined,
  ) {
    if (targetCardIdOrZoneId === undefined) return;

    const sourceCardId = parseInt(sourceCardIdString);

    let target: number | boolean;
    if (targetZoneId !== undefined && targetZoneIndex !== undefined) {
      // We dropped on a Pokemon
      const targetCardId = parseInt(targetCardIdOrZoneId.substring(7));
      if (targetZoneId === sourceZoneId && targetCardId == sourceCardId) {
        // We moved the same card back to where it came form
        return;
      }
      target = parseInt(targetZoneIndex);
    } else {
      // We dropped on a Zone
      targetZoneId = targetCardIdOrZoneId;
      target = false;
    }

    const action = {
      user: this._activeUser,
      emit: true,
      type: "moveCardBundle",
      parameters: [
        this._activeUser,
        sourceZoneId,
        targetZoneId,
        sourceZoneIndex,
        target,
        "move",
      ],
    };
    console.log(action);
    this._processAction(action);
  }
}
