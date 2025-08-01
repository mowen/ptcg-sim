export function ViewCards({ user }: { user: string }) {
  return (
    <div id="viewCards" className={`${user}-view`}>
      <div id="viewCardsHeader" className={`header ${user}-header`}>
        Looking at cards...
      </div>
      <div
        id="viewCardsButtonContainer"
        className={`${user}-zone-button-container`}
      >
        <button id="discardViewCardsButton" className="zone-button">
          Discard all
        </button>
        <button id="shuffleViewCardsButton" className="zone-button">
          Shuffle all
        </button>
        <button id="shuffleBottomViewCardsButton" className="zone-button">
          Shuffle to bottom
        </button>
        <button id="lostZoneViewCardsButton" className="zone-button">
          Lost Zone all
        </button>
        <button id="handViewCardsButton" className="zone-button">
          To Hand
        </button>
      </div>
    </div>
  );
}
