function DeckImport() {
  return (
    <div id="deckImport" className="sidebox">
      <div>
        <button id="deckBuilderButton">Deck Builder</button>
        <button id="importExportGameStateButton">Import/Export Game</button>
      </div>
      <div id="importButtonContainer">
        <button id="mainImportHeaderButton" className="main-select">
          Main
        </button>
        <button id="altImportHeaderButton">Alt (1P only)</button>
      </div>
      <textarea id="mainDeckImportInput"></textarea>
      <script>
        document.getElementById('mainDeckImportInput').placeholder = "Paste your
        main decklist here. \n\nClick the book 📖 to look through popular decks
        or click the wand 🪄 for a random deck! \n\nFor uploading custom images,
        write the quantity and name (i.e. 2 Pikachu) and click on the 'Import'
        button. \n\nInternational languages are supported for cards using
        Limitless URLs.";
      </script>
      <textarea id="altDeckImportInput"></textarea>
      <script>
        document.getElementById('altDeckImportInput').placeholder = "Paste your
        alternative decklist here if you are playing against yourself. \n\nClick
        the book 📖 to look through popular decks or click the wand 🪄 for a
        random deck! \n\nFor uploading custom images, write the quantity and
        name (i.e. 2 Pikachu) and click on the 'Import' button.
        \n\nInternational languages are supported for cards using Limitless
        URLs.";
      </script>
      <div id="importBottom">
        <button id="decklistsButton">📖</button>
        <button id="importButton">Import</button>
        <button id="confirmButton">Confirm</button>
        <button id="cancelButton">Cancel</button>
        <button id="saveButton" className="neutral-color">
          Save
        </button>
        <div id="decklistsContextMenu" className="decklists-context-menu"></div>
        <button id="randomButton">🪄</button>
        <div id="successText">Success!</div>
        <div id="failedText">Error!</div>
        <div id="loadingText"></div>
        <div id="invalidText">Not allowed!</div>
      </div>
      <div id="uploadButtonsContainer">
        <label htmlFor="csvFile" id="uploadFileButton" className="self-color">
          Upload File
        </label>
        <input
          type="file"
          id="csvFile"
          accept=".csv"
          style={{ display: "none" }}
        />
        <button id="changeCardBackButton" className="self-color">
          Change Card Back
        </button>
        <div className="language-container">
          <button id="changeLanguageButton" className="neutral-color">
            Language: English
          </button>
          <div id="languageDropdown">
            <ul>
              <li>English</li>
              <li>French</li>
              <li>German</li>
              <li>Italian</li>
              <li>Portuguese</li>
              <li>Spanish</li>
            </ul>
          </div>
        </div>
      </div>
      <button id="saveCurrentButton" className="self-color">
        Save Current Deck
      </button>
    </div>
  );
}

export default DeckImport;
