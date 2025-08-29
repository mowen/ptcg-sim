import { useState } from "react";
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
  // const [cardList, setCardList] = useState(cards);

  const sortCards = (cards: Array<Card>): Array<Card> => {
    return cards.sort((a, b) => {
      const keyFunc = (c: Card) => `${c.type}_${c.name}`;
      const aKey = keyFunc(a);
      const bKey = keyFunc(b);
      return aKey.localeCompare(bKey);
    });
  };
  const cardList = sortCards(cards);

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
      {cardList.map((c: Card, i: number) => (
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
