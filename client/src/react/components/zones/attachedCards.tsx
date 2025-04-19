import { Card } from '../../../models';
import CardView from '../cards/cardView';

export function AttachedCards({
  cssUser,
  cards,
  onClose = () => {},
}: {
  cssUser: string;
  cards: Array<Card>;
  onClose: () => void;
}) {
  return (
    <div id="attachedCards" className={`${cssUser}-view`}>
      <div id="attachedCardsHeader" className={`header ${cssUser}-header`}>
        Move attached cards
      </div>
      <div
        id="attachedCardsButtonContainer"
        className={`${cssUser}-zone-button-container`}
      >
        <button
          id="discardAttachedCardsButton"
          className="zone-button"
          onClick={onClose}
        >
          Discard all
        </button>
        <button
          id="shuffleAttachedCardsButton"
          className="zone-button"
          onClick={onClose}
        >
          Shuffle all
        </button>
        <button
          id="lostZoneAttachedCardsButton"
          className="zone-button"
          onClick={onClose}
        >
          Lost Zone all
        </button>
        <button
          id="handAttachedCardsButton"
          className="zone-button"
          onClick={onClose}
        >
          To Hand
        </button>
        <button
          id="leaveAttachedCardsButton"
          className="zone-button"
          onClick={onClose}
        >
          Leave in play
        </button>
      </div>
      {cards.map((c: Card, i: number) => (
        <CardView key={i} card={c}></CardView>
      ))}
    </div>
  );
}
