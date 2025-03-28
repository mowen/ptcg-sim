export function AttachedCards({ user }: { user: string }) {
  return (
    <div id="attachedCards" className={`${user}-view`}>
      <div id="attachedCardsHeader" className={`header ${user}-header`}>
        Move attached cards
      </div>
      <div
        id="attachedCardsButtonContainer"
        className={`${user}-zone-button-container`}
      >
        <button id="discardAttachedCardsButton" className="zone-button">
          Discard all
        </button>
        <button id="shuffleAttachedCardsButton" className="zone-button">
          Shuffle all
        </button>
        <button id="lostZoneAttachedCardsButton" className="zone-button">
          Lost Zone all
        </button>
        <button id="handAttachedCardsButton" className="zone-button">
          To Hand
        </button>
        <button id="leaveAttachedCardsButton" className="zone-button">
          Leave in play
        </button>
      </div>
    </div>
  );
}
