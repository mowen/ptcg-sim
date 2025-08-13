import { useState } from "react";
import {
  Changelog,
  DeckImport,
  Donations,
  Options,
  P1Box,
  P2Box,
  Settings,
} from "../..";

enum Page {
  P1,
  P2,
  DeckImport,
  Settings,
}

function Sidebar() {
  const [selectedPage, setSelectedPage] = useState(Page.P1);
  const [showChangelog, setShowChangelog] = useState(false);
  const [showDonations, setDonations] = useState(false);

  const selectedPageClass = (selected: boolean) =>
    selected ? "selected-page" : "not-selected-page";

  const buttonClasses = {
    p1: selectedPageClass(selectedPage == Page.P1),
    p2: selectedPageClass(selectedPage == Page.P2),
    deckImport: selectedPageClass(selectedPage == Page.DeckImport),
    settings: selectedPageClass(selectedPage == Page.Settings),
  };

  return (
    <>
      <div id="topButtonContainer">
        <button
          id="p1Button"
          className={buttonClasses.p1}
          onClick={() => setSelectedPage(Page.P1)}
        >
          1P
        </button>
        <button
          id="p2Button"
          className={buttonClasses.p2}
          onClick={() => setSelectedPage(Page.P2)}
        >
          2P
        </button>
        <button
          id="deckImportButton"
          className={buttonClasses.deckImport}
          onClick={() => setSelectedPage(Page.DeckImport)}
        >
          Import
        </button>
        <button
          id="settingsButton"
          className={buttonClasses.settings}
          onClick={() => setSelectedPage(Page.Settings)}
        >
          Settings
        </button>
      </div>
      <div id="greyFiller"></div>

      <P1Box
        selected={selectedPage == Page.P1}
        showChangelog={() => setShowChangelog(true)}
        showDonations={() => setDonations(true)}
      />
      <P2Box selected={selectedPage == Page.P2} />
      <DeckImport selected={selectedPage == Page.DeckImport} />
      <Settings selected={selectedPage == Page.Settings} />

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

      <Changelog show={showChangelog} />
      <Donations show={showDonations} />
    </>
  );
}

export default Sidebar;
