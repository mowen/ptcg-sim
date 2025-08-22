import { produce } from "immer";
import {
  SelectedCardDTO,
  UiActionDTO,
  UiStateDTO,
  UserType,
} from "../../models";
import { SelectedPage } from "../components/sidebar/sidebar";

function clearModal(uiState: UiStateDTO): void {
  uiState.showChangelog = false;
  uiState.showDonations = false;
  uiState.showKeybinds = false;
  uiState.showOptions = false;
  uiState.showTutorial = false;
  uiState.showAttached = {};
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
      case "showOptions":
        clearModal(draft);
        draft.showOptions = true;
        break;
      case "showTutorial":
        clearModal(draft);
        draft.showTutorial = true;
        break;
      case "showAttached":
        if (
          action.user === undefined ||
          action.parameters === undefined ||
          draft.showAttached === undefined
        )
          return;
        clearModal(draft);
        let cardId = action.parameters[0] as number;
        draft.showAttached[action.user] = cardId;
        break;
      case "selectPage":
        if (action.parameters === undefined) return;
        draft.selectedPage = action.parameters[0] as SelectedPage;
        break;
      case "selectCard":
        if (action.user === undefined || action.parameters === undefined) {
          return;
        }
        const player = action.user as UserType;
        const selectedCardId = action.parameters[0] as number;
        draft.selectedCard = new SelectedCardDTO(player, selectedCardId);
        break;
      case "clearSelectedCard":
        delete draft.selectedCard;
        break;
      case "clearModal": // Rename to include clearing selected card
        clearModal(draft);
        delete draft.selectedCard;
        break;
      default:
        console.warn(`Didn't handle UiAction Type ${action.type}`);
        return;
    }
  });
};
