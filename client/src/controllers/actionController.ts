import { ActionDTO } from "../models";

export default class ActionController {
  constructor(
    private readonly _activeUser: string,
    private readonly _processAction: (action: ActionDTO) => void,
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
}
