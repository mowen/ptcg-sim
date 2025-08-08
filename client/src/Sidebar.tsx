import { ReactComponent as Changelog } from '../../CHANGELOG.md';

function Sidebar() {
  return (
    <>
      <div id="topButtonContainer">
        <button id="p1Button" className="selected-page">
          1P
        </button>
        <button id="p2Button" className="not-selected-page">
          2P
        </button>
        <button id="deckImportButton" className="not-selected-page">
          Import
        </button>
        <button id="settingsButton" className="not-selected-page">
          Settings
        </button>
      </div>
      <div id="greyFiller"></div>

      <div id="p1Box" className="sidebox">
        <div id="chatbox">
          <strong>Welcome to PTCG-sim!</strong>
          <p>
            <strong
              id="changelogLink"
              style={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: '#ffcc00',
                borderBottom: '1px solid #ffcc00',
              }}
            >
              v1.5.1 Ϟ(๑⚈ ․̫ ⚈๑)⋆
            </strong>
          </p>
          <p style={{ fontSize: '90%' }}>
            PTCG-sim is an{' '}
            <a href="https://github.com/xxmichaellong/ptcg-sim" target="_blank">
              open-source
            </a>{' '}
            Pokémon Trading Card Game (Pokémon TCG) tabletop simulator. It
            supports single player and online multiplayer.
          </p>
          <p style={{ fontSize: '90%' }}>
            Use the <strong>Import</strong> tab above to import your deck, then
            press <strong>Set Up</strong> to start a game.
          </p>
          <p style={{ fontSize: '90%' }}>
            Drag or use keybinds (hold <span className="shift-font">shift</span>
            ) to move cards.
          </p>
          <p style={{ fontSize: '90%' }}>
            See the <strong>Options</strong> button below to import, export, and
            replay games.
          </p>
          <p style={{ fontSize: '90%' }}> Happy testing!</p>
          <button id="tutorialButton">Watch Tutorial</button>
          <br />
          <br />
          <div id="links">
            <div id="discordLink">
              <strong>
                <a href="https://discord.gg/jMfhQa38mh" target="_blank">
                  🎮 Join our Discord
                </a>
              </strong>
            </div>
            <div id="donationsLink">🎁 Sponsors & Donations</div>
          </div>
          <div id="line"></div>
        </div>
        <div id="chatboxButtonContainer" className="chat-button-container">
          <button id="attackButton" className="self-color">
            Attack
          </button>
          <button id="passButton" className="self-color">
            Pass
          </button>
          <button id="undoButton" className="self-color">
            Undo
          </button>
          <button id="FREEBUTTON" className="self-color">
            ⚡
          </button>
        </div>
        <input
          id="messageInput"
          type="text"
          placeholder="Type your message here..."
        />
        <div id="bottomP1ButtonContainer" className="sidebox-button-container">
          <button id="setupButton" className="self-color">
            Set Up
          </button>
          <button id="resetButton" className="self-color">
            Reset
          </button>
          <button id="setupBothButton" className="neutral-color">
            Set Up Both
          </button>
          <button id="resetBothButton" className="neutral-color">
            Reset Both
          </button>
          <button id="optionsButton" className="neutral-color">
            Options
          </button>
        </div>
      </div>
      <div id="p2Box" className="sidebox">
        <div id="p2ExplanationBox">
          <strong>Online Multiplayer Mode</strong>
          <br />
          <br />
          Enter or generate a unique room ID to share with your friends. Players
          must enter the same ID (case-sensitive) to join.
        </div>
        <div id="lobby">
          <input id="nameInput" type="text" placeholder="Name" />
          <div id="roomId">
            <input id="roomIdInput" type="text" placeholder="Room ID" />
            <button id="copyButton">
              <img
                src="https://www.svgrepo.com/show/309480/copy.svg"
                alt="Copy"
              />
            </button>
            <button id="generateIdButton">Generate</button>
          </div>
          <div id="coachingModeLabel">
            <input type="checkbox" id="coachingModeCheckbox" />
            <label style={{ cursor: 'pointer' }} htmlFor="coachingModeCheckbox">
              Enable board flip
              <span style={{ fontStyle: 'italic', fontSize: 'smaller' }}>
                (both players must enable)
              </span>
            </label>
          </div>
          <div id="spectatorModeLabel">
            <input type="checkbox" id="spectatorModeCheckbox" />
            <label
              style={{ cursor: 'pointer' }}
              htmlFor="spectatorModeCheckbox"
            >
              Join as spectator
            </label>
          </div>
          <div id="joinRoomButton">Join Room</div>
        </div>
        <div id="connectedRoom">
          <div id="roomHeader">
            <div id="roomHeaderText"></div>
            <button id="roomHeaderCopyButton">
              <img
                src="https://www.svgrepo.com/show/309480/copy.svg"
                alt="Copy"
              />
            </button>
          </div>
          <div id="p2Chatbox"></div>
          <div id="p2ChatboxButtonContainer" className="chat-button-container">
            <button id="p2AttackButton" className="self-color">
              Attack
            </button>
            <button id="p2PassButton" className="self-color">
              Pass
            </button>
            <button id="p2FREEBUTTON" className="self-color">
              ⚡
            </button>
          </div>
          <input
            id="p2MessageInput"
            type="text"
            placeholder="Type your message here..."
          />
          <div
            id="p2BottomButtonContainer"
            className="sidebox-button-container"
          >
            <button id="p2SetupButton" className="self-color">
              Set Up
            </button>
            <button id="p2ResetButton" className="self-color">
              Reset
            </button>
            <button id="leaveRoomButton" className="neutral-color">
              Leave Room
            </button>
            <button id="p2OptionsButton" className="neutral-color">
              Options
            </button>
          </div>
        </div>
      </div>
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
          document.getElementById('mainDeckImportInput').placeholder = "Paste
          your main decklist here. \n\nClick the book 📖 to look through popular
          decks or click the wand 🪄 for a random deck! \n\nFor uploading custom
          images, write the quantity and name (i.e. 2 Pikachu) and click on the
          'Import' button. \n\nInternational languages are supported for cards
          using Limitless URLs.";
        </script>
        <textarea id="altDeckImportInput"></textarea>
        <script>
          document.getElementById('altDeckImportInput').placeholder = "Paste
          your alternative decklist here if you are playing against yourself.
          \n\nClick the book 📖 to look through popular decks or click the wand
          🪄 for a random deck! \n\nFor uploading custom images, write the
          quantity and name (i.e. 2 Pikachu) and click on the 'Import' button.
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
          <div
            id="decklistsContextMenu"
            className="decklists-context-menu"
          ></div>
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
            style={{ display: 'none' }}
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

      <div id="settings" className="sidebox">
        <div id="settingsToggles">
          <div>
            <input type="checkbox" id="darkModeCheckbox" />
            <label htmlFor="darkModeCheckbox">Dark mode</label>
          </div>
          <div>
            <input type="checkbox" id="showZonesCheckbox" />
            <label htmlFor="showZonesCheckbox">Hide containers</label>
          </div>
          <div>
            <input type="checkbox" id="hideHandCheckbox" />
            <label htmlFor="hideHandCheckbox">
              Hide opponent's hand (1P mode)
            </label>
          </div>
        </div>
        <button id="changeBackgroundButton" className="neutral-color">
          Change background
        </button>
        <br />
        <div id="keybindReminder">
          Hold (<span className="shift-font">shift</span>) to view keybinds
        </div>
        <div id="twitterDescription">
          <div>
            Please reach out if you have any questions, suggestions, bugs etc.!
          </div>
          <a
            href="https://twitter.com/xxmichaellong"
            target="blank"
            rel="noopener noreferrer"
          >
            <div id="twitterHandle">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png" />
              <span id="username">@xxmichaellong</span>
            </div>
          </a>
        </div>
      </div>

      <div id="optionsContextMenu">
        <div id="exitReplay" style={{ display: 'none' }}>
          Exit replay mode
        </div>
        <div id="jsonReplayDiv">
          <label
            htmlFor="jsonReplay"
            id="importReplay"
            style={{ cursor: 'pointer' }}
          >
            Enter replay mode
          </label>
          <input
            type="file"
            id="jsonReplay"
            accept=".json"
            style={{ display: 'none' }}
          />
        </div>
        <div id="jsonDiv">
          <label
            htmlFor="jsonFile"
            id="importState"
            style={{ cursor: 'pointer' }}
          >
            Import game state
          </label>
          <input
            type="file"
            id="jsonFile"
            accept=".json"
            style={{ display: 'none' }}
          />
        </div>
        <div id="exportState">Export game state</div>
        <div id="exportLog">Export battle log</div>
        <div id="clearLog">Clear battle log</div>
        <div id="fullscreenButton">Full screen</div>
      </div>

      <div id="keybindModal">
        <div className="keybind-section-container">
          <div className="keybind-section">
            <div className="keybind-column">
              <h1>Move card...</h1>
              <ul>
                <li>
                  to Hand <code>[h]</code>
                </li>
                <li>
                  to Discard <code>[d]</code>
                </li>
                <li>
                  to Bench <code>[b]</code>
                </li>
                <li>
                  to Active <code>[a]</code>
                </li>
                <li>
                  to Stadium <code>[g]</code>
                </li>
                <li>
                  to Lost Zone <code>[l]</code>
                </li>
                <li>
                  to Prizes <code>[p]</code>
                </li>
                <li>
                  to Board <code>[space]</code>
                </li>
                <li>
                  to Deck (top) <code>[↑]</code>
                </li>
                <li>
                  to Deck (bottom) <code>[↓]</code>
                </li>
                <li>
                  to Deck (switch) <code>[→]</code>
                </li>
                <li>
                  to Deck (shuffle)<code>[s]</code>
                </li>
              </ul>
            </div>
            <div className="keybind-column">
              <h1>Deck</h1>
              <ul>
                <li>
                  Shuffle deck<code>[s]</code>
                </li>
                <li>
                  Draw card(s)<code>[1-9]</code>
                </li>
                <li>
                  View top card(s)<code>[alt + 1-9]</code>
                </li>
                <li>
                  View bottom card(s)<code>[ctrl + 1-9]</code>
                </li>
                <li>
                  View <code>[v]</code>
                </li>
              </ul>
            </div>
            <div className="keybind-column">
              <h1>Hand</h1>
              <ul>
                <li>
                  Discard hand<code>[alt + d]</code>
                </li>
                <li>
                  Shuffle hand into deck <code>[alt + s]</code>
                </li>
                <li>
                  Shuffle hand to bottom <code>[alt + ↓]</code>
                </li>
              </ul>
            </div>
            <div className="keybind-column">
              <h1>Playboard</h1>
              <ul>
                <li>
                  Discard all<code>[enter]</code>
                </li>
                <li>
                  Move all to hand<code>[alt + enter]</code>
                </li>
                <li>
                  Shuffle all into deck<code>[/]</code>
                </li>
              </ul>
            </div>
          </div>
          <div className="keybind-section">
            <div className="keybind-column">
              <h1>Card actions</h1>
              <ul>
                <li>
                  Attach <code>[q]</code>
                </li>
                <li>
                  Evolve <code>[e]</code>
                </li>
                <li>
                  View (for cards in play, press twice) <code>[v]</code>
                </li>
                <li>
                  Toggle ability/effect<code>[w]</code>
                </li>
                <li>Damage counter</li>
                <ul>
                  <li>
                    Increase <code>[1-9]</code>
                  </li>
                  <li>
                    Decrease <code>[alt + 1-9]</code>
                  </li>
                  <li>
                    Remove <code>[0]</code>
                  </li>
                </ul>
                <li>Special condition</li>
                <ul>
                  <li>
                    Add/Toggle <code>[y]</code>
                  </li>
                  <li>
                    Remove <code>[alt + y]</code>
                  </li>
                </ul>
                <li>
                  Rotate card(s)<code>[r]</code>
                </li>
                <li>
                  Rotate BREAK <code>[alt + r]</code>
                </li>
                <li>
                  Look/cover card (only yourself)<code>[c]</code>
                </li>
                <li>
                  Hide card (both players)<code>[z]</code>
                </li>
                <li>
                  Reveal card (both players)<code>[alt + z]</code>
                </li>
                <li>
                  Put face-down card in active<code>[z] → [a]</code>
                </li>
                <li>Change type...</li>
                <ul>
                  <li>
                    to Tool <code>[alt + t]</code>
                  </li>
                  <li>
                    to Energy <code>[alt + e]</code>
                  </li>
                  <li>
                    to Pokémon <code>[alt + p]</code>
                  </li>
                </ul>
              </ul>
            </div>
            <div className="keybind-column">
              <h1>General</h1>
              <ul>
                <li>
                  Set up <code>[alt + n]</code>
                </li>
                <li>
                  Reset <code>[alt + r]</code>
                </li>
                <li>
                  Start turn <code>[alt + t]</code>
                </li>
                <li>
                  Flip coin <code>[f]</code>
                </li>
                <li>
                  Flip board <code>[alt + f]</code>
                </li>
                <li>
                  Announce mulligan <code>[m]</code>
                </li>
                <li>
                  Undo <code>[u]</code>
                </li>
                <li>
                  Close popups <code>[esc]</code>
                </li>
                <li>
                  Refresh images <code>[r]</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: '20px' }}>
          <p style={{ fontSize: '1.5vh' }}>
            <strong>For macOS:</strong> Use <code>option</code> instead of
            <code>alt</code>
          </p>
        </div>
      </div>

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

      <table id="selfCurrentDecklistTable" style={{ display: 'none' }}></table>
      <table id="oppCurrentDecklistTable" style={{ display: 'none' }}></table>

      <div id="videoContainer"></div>
      <div id="changelog">
        <Changelog id="changelog" />
      </div>
      <div id="donationsPage">
        <h2>Sponsors & Donations</h2>

        <p>
          Hi everyone! I'm Michael/Xiao Xiao Long. I'm a 21-year-old from
          Guelph, Canada, who started programming in the fall of 2023. I've been
          playing the Pokémon TCG for over 8 years, and I spent the last 3
          months building PTCG-sim, a free tool for the community to use to test
          and play our favorite card game.
        </p>

        <p>
          I publicly launched the sim on Christmas, and it has already grown an
          incredible community of players and developers. There's a lot more to
          do, and I could use as much help as I can get!
        </p>

        <p>
          Should you find joy in using the sim and wish to support its ongoing
          development, you can sponsor me/the project through one of the links
          below. However, please know that sponsorship is completely optional.
          Your enjoyment of the sim is contribution enough, and I'm thrilled to
          have you as part of our community 😀
        </p>

        <p>-XXL &lt;3</p>

        <h3>
          <a
            href="https://github.com/sponsors/xxmichaellong?o=esc"
            target="_blank"
            style={{ color: 'rgb(91, 91, 173)', textDecoration: 'underline' }}
          >
            Github Sponsors Link
          </a>
        </h3>
        <h3>
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=VWFSCL73GDHF4"
            target="_blank"
            style={{ color: 'rgb(91, 91, 173)', textDecoration: 'underline' }}
          >
            Paypal Donation Link
          </a>
        </h3>

        <strong>SPONSOR TIERS</strong>
        <br />
        <br />
        <strong>$5/mo - SoulSilver Tier</strong>
        <ul
          style={{
            listStyleType: 'disc',
            paddingLeft: '20px',
            marginTop: '10px',
            marginBottom: '20px',
          }}
        >
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            Custom flair on Discord & open reign on self-nicknames.
          </li>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            Access to early beta testing.
          </li>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            Shoutout in every changelog during the time you are subscribed for.
          </li>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            Get a sponsor tag on your GitHub profile (if sponsoring via GitHub,
            not applicable for sponsors through PayPal. Currently in the process
            of getting my GH sponsor page approved 😛).
          </li>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            My eternal thanks!!!!!
          </li>
        </ul>

        <strong>$25/mo - HeartGold Tier</strong>
        <ul
          style={{
            listStyleType: 'disc',
            paddingLeft: '20px',
            marginTop: '10px',
            marginBottom: '20px',
          }}
        >
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            Receive all of the benefits of the previous tiers.
          </li>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            Access to an exclusive Discord channel for priority
            suggestions/feature proposals/troubleshooting support.
          </li>
        </ul>

        <strong>$100/mo - Platinum Tier</strong>
        <ul
          style={{
            listStyleType: 'disc',
            paddingLeft: '20px',
            marginTop: '10px',
            marginBottom: '20px',
          }}
        >
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            Receive all of the benefits of the previous tiers.
          </li>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            Seriously do not think anyone will subscribe to this, but I would be
            immensely grateful.
          </li>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            Direct access to me (I will give you my phone number).
          </li>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            I'll sign, kiss, and mail you a signed bulk card of your choice (if
            I have it lol).
          </li>
        </ul>

        <strong>$15 - One-time Donation</strong>
        <ul
          style={{
            listStyleType: 'disc',
            paddingLeft: '20px',
            marginTop: '10px',
            marginBottom: '20px',
          }}
        >
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            Shoutout in the next changelog.
          </li>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}>
            My eternal thanks!!!!!
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
