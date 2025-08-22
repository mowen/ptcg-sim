import { Card, UiActionDTO } from "../models";
import { SelectedPage } from "../react";

export default class UiController {
  constructor(
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

  public showOptions() {
    this._processUiAction({ type: "showOptions" });
  }

  public showTutorial() {
    this._processUiAction({ type: "showTutorial" });
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

  public showAttached(card: Card) {
    this._processUiAction({
      type: "showAttached",
      user: card.player,
      parameters: [card.id],
    });
  }

  public selectCard(card: Card) {
    console.debug(`selected ${card.toString()}`);
    this._processUiAction({
      type: "selectCard",
      user: card.player,
      parameters: [card.id],
    });
  }

  public clearSelectedCard() {
    this._processUiAction({
      type: "clearSelectedCard",
    });
  }
}
