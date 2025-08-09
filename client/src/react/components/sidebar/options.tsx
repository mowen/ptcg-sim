function Options() {
  return (
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
  );
}

export default Options;
