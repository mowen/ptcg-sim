function ViewDiscard({ cssUser }: { cssUser: string }) {
  return (
    <div id="discard" className={`${cssUser}-view`}>
      <div className="zone-button-container">
        <button id="shuffleDiscardButton" className="zone-button">
          Shuffle all to Deck
        </button>
        <button id="closeDiscardButton" className="zone-button">
          Close
        </button>
        <input type="checkbox" id="sortDiscardCheckbox" />
        <label htmlFor="sortDiscardCheckbox">Sort</label>
      </div>
    </div>
  );
}

export { ViewDiscard };
