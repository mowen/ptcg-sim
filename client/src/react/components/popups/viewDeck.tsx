function ViewDeck({ cssUser }: { cssUser: string }) {
  return (
    <div id="deck" className={`${cssUser}-view`}>
      <div className="zone-button-container">
        <button id="shuffleDeckButton" className="zone-button">
          Shuffle
        </button>
        <button id="closeDeckButton" className="zone-button">
          Close
        </button>
        <input type="checkbox" id="sortDeckCheckbox" />
        <label htmlFor="sortDeckCheckbox">Sort</label>
      </div>
    </div>
  );
}

export { ViewDeck };
