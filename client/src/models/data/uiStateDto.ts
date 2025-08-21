import { immerable } from "immer";
import { SelectedPage } from "../../react";

class SelectedCardDTO {
  [immerable] = true;

  constructor(
    public player: string,
    public id: number,
  ) {}
}

class UiStateDTO {
  [immerable] = true;

  public selectedCard?: SelectedCardDTO;
  public selectedPage: SelectedPage = SelectedPage.P1;
  public showChangelog: boolean = false;
  public showDonations: boolean = false;
  public showKeybinds: boolean = false;
  public showOptions: boolean = false;
  public showTutorial: boolean = false;
  public showAttached?: Record<string, number> = {};
}

export { UiStateDTO, SelectedCardDTO };
