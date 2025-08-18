function Settings() {
  return (
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
  );
}

export default Settings;
