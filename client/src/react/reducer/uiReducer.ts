import { produce } from "immer";
import { UiActionDTO, UiStateDTO } from "../../models";
import { SelectedPage } from "../components/sidebar/sidebar";

function clearModal(uiState: UiStateDTO): void {
  uiState.showChangelog = false;
  uiState.showDonations = false;
  uiState.showKeybinds = false;
}

export const uiActionReducer = (
  uiState: UiStateDTO,
  action: UiActionDTO,
): UiStateDTO => {
  return produce(uiState, (draft) => {
    switch (action.type) {
      case "showKeybinds":
        clearModal(draft);
        draft.showKeybinds = true;
        break;
      case "showDonations":
        clearModal(draft);
        draft.showDonations = true;
        break;
      case "showChangelog":
        clearModal(draft);
        draft.showChangelog = true;
        break;
      case "selectPage":
        if (action.parameters === undefined) return;
        draft.selectedPage = action.parameters[0] as SelectedPage;
        break;
      case "clearModal":
        clearModal(draft);
        break;
      default:
        console.warn(`Didn't handle UiAction Type ${action.type}`);
        return;
    }
  });
};
