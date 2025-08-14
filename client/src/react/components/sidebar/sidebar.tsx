import { useContext } from "react";
import {
  Changelog,
  DeckImport,
  Donations,
  Options,
  P1Box,
  P2Box,
  Settings,
} from "../..";
import { UiStateDTO, UndoableGameStateDTO } from "../../../models";
import { UiDispatchContext } from "../../context/uiContext";
import { UiController } from "../../../controllers";

enum SelectedPage {
  P1,
  P2,
  DeckImport,
  Settings,
}

function Sidebar({
  state,
  uiState,
}: {
  state: UndoableGameStateDTO;
  uiState: UiStateDTO;
}) {
  const processUiAction = useContext(UiDispatchContext);
  const uiController = new UiController(
    state.gameState.activeUser,
    processUiAction,
  );

  const selectedPageClass = (selected: boolean) =>
    selected ? "selected-page" : "not-selected-page";

  const selectedPage = uiState.selectedPage;
  const buttonClasses = {
    p1: selectedPageClass(selectedPage == SelectedPage.P1),
    p2: selectedPageClass(selectedPage == SelectedPage.P2),
    deckImport: selectedPageClass(selectedPage == SelectedPage.DeckImport),
    settings: selectedPageClass(selectedPage == SelectedPage.Settings),
  };

  return (
    <>
      <div id="topButtonContainer">
        <button
          id="p1Button"
          className={buttonClasses.p1}
          onClick={() => uiController.selectPage(SelectedPage.P1)}
        >
          1P
        </button>
        <button
          id="p2Button"
          className={buttonClasses.p2}
          onClick={() => uiController.selectPage(SelectedPage.P2)}
        >
          2P
        </button>
        <button
          id="deckImportButton"
          className={buttonClasses.deckImport}
          onClick={() => uiController.selectPage(SelectedPage.DeckImport)}
        >
          Import
        </button>
        <button
          id="settingsButton"
          className={buttonClasses.settings}
          onClick={() => uiController.selectPage(SelectedPage.Settings)}
        >
          Settings
        </button>
      </div>
      <div id="greyFiller"></div>

      <P1Box
        selected={selectedPage == SelectedPage.P1}
        showChangelog={() => uiController.showChangelog()}
        showDonations={() => uiController.showDonations()}
      />
      <P2Box selected={selectedPage == SelectedPage.P2} />
      <DeckImport selected={selectedPage == SelectedPage.DeckImport} />
      <Settings selected={selectedPage == SelectedPage.Settings} />

      <Options />

      <table id="decklistTable">
        <thead>
          <tr>
            <th>QTY</th>
            <th>Name</th>
            <th>Type</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <table id="selfCurrentDecklistTable" style={{ display: "none" }}></table>
      <table id="oppCurrentDecklistTable" style={{ display: "none" }}></table>

      <div id="videoContainer"></div>

      <Changelog show={uiState.showChangelog} />
      <Donations show={uiState.showDonations} />
    </>
  );
}

export { Sidebar, SelectedPage };
