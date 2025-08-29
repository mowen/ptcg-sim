import { Card } from "../../../models";
import CardView from "../cards/cardView";

function ViewDiscard({
  cssUser,
  cards,
  onCardClick,
  onClose,
}: {
  cssUser: string;
  cards: Array<Card>;
  onCardClick: (card: Card) => void;
  onClose: () => void;
}) {
  return (
    <div id="discard" className={`view-card-zone ${cssUser}-view`}>
      <div className="zone-button-container">
        <button id="shuffleDiscardButton" className="zone-button">
          Shuffle all to Deck
        </button>
        <button
          id="closeDiscardButton"
          className="zone-button"
          onClick={() => onClose()}
        >
          Close
        </button>
        <input type="checkbox" id="sortDiscardCheckbox" />
        <label htmlFor="sortDiscardCheckbox">Sort</label>
      </div>
      {cards.map((c: Card, i: number) => (
        <CardView
          key={i}
          card={c}
          onClick={(card) => onCardClick(card)}
        ></CardView>
      ))}
    </div>
  );
}

export { ViewDiscard };
