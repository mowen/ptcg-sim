function P2Box({ selected }: { selected: boolean }) {
  return selected ? (
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
          <label style={{ cursor: 'pointer' }} htmlFor="spectatorModeCheckbox">
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
        <div id="p2BottomButtonContainer" className="sidebox-button-container">
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
  ) : null;
}

export default P2Box;
