import { immerable } from "immer";
import { SelectedPage } from "../../react";

class UiStateDTO {
  [immerable] = true;

  public selectedPage: SelectedPage = SelectedPage.P1;
  public showChangelog: boolean = false;
  public showDonations: boolean = false;
  public showKeybinds: boolean = false;
}

export { UiStateDTO };
