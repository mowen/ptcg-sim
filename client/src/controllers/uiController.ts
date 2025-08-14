import { Card, UiActionDTO } from "../models";
import { SelectedPage } from "../react";

export default class UiController {
  constructor(
    private readonly _activeUser: string,
    private readonly _processUiAction: (action: UiActionDTO) => void,
  ) {}

  public showKeybinds() {
    this._processUiAction({ type: "showKeybinds" });
  }

  public showChangelog() {
    this._processUiAction({ type: "showChangelog" });
  }

  public showDonations() {
    this._processUiAction({ type: "showDonations" });
  }

  public clearModal() {
    this._processUiAction({ type: "clearModal" });
  }

  public selectPage(selectedPage: SelectedPage) {
    this._processUiAction({
      type: "selectPage",
      parameters: [selectedPage],
    });
  }

  public showAttached(user: string, card: Card) {
    this._processUiAction({
      type: "showAttached",
      user: user,
      parameters: [card.id],
    });
  }
}
