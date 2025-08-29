import { CardView } from "../..";
import { Card } from "../../../models";

function ViewDeck({
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
    <div id="deck" className={`view-card-zone ${cssUser}-view`}>
      <div className="zone-button-container">
        <button id="shuffleDeckButton" className="zone-button">
          Shuffle
        </button>
        <button
          id="closeDeckButton"
          className="zone-button"
          onClick={() => onClose()}
        >
          Close
        </button>
        <input type="checkbox" id="sortDeckCheckbox" />
        <label htmlFor="sortDeckCheckbox">Sort</label>
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

export { ViewDeck };
