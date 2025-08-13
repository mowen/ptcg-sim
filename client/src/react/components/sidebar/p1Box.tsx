function P1Box({
  selected,
  showChangelog,
  showDonations,
}: {
  selected: boolean;
  showChangelog: () => void;
  showDonations: () => void;
}) {
  return selected ? (
    <div id="p1Box" className="sidebox">
      <div id="chatbox">
        <strong>Welcome to PTCG-sim!</strong>
        <p onClick={showChangelog}>
          <strong
            id="changelogLink"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "#ffcc00",
              borderBottom: "1px solid #ffcc00",
            }}
          >
            v1.5.1 Ϟ(๑⚈ ․̫ ⚈๑)⋆
          </strong>
        </p>
        <p style={{ fontSize: "90%" }}>
          PTCG-sim is an{" "}
          <a href="https://github.com/xxmichaellong/ptcg-sim" target="_blank">
            open-source
          </a>{" "}
          Pokémon Trading Card Game (Pokémon TCG) tabletop simulator. It
          supports single player and online multiplayer.
        </p>
        <p style={{ fontSize: "90%" }}>
          Use the <strong>Import</strong> tab above to import your deck, then
          press <strong>Set Up</strong> to start a game.
        </p>
        <p style={{ fontSize: "90%" }}>
          Drag or use keybinds (hold <span className="shift-font">shift</span>)
          to move cards.
        </p>
        <p style={{ fontSize: "90%" }}>
          See the <strong>Options</strong> button below to import, export, and
          replay games.
        </p>
        <p style={{ fontSize: "90%" }}> Happy testing!</p>
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
          <div id="donationsLink" onClick={showDonations}>
            🎁 Sponsors & Donations
          </div>
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
  ) : null;
}

export default P1Box;
