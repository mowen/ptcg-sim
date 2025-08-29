import { useState } from "react";
import { Card } from "../../../models";
import { CardView, ViewDeck } from "../..";

export function Deck({
  user,
  cards,
  onCardClick,
}: {
  user: string;
  cards: Array<Card>;
  onCardClick: (card: Card) => void;
}) {
  const [showDeck, setShowDeck] = useState(false);
  return (
    <>
      <div id="deckCover" className="zone" onClick={() => setShowDeck(true)}>
        <div id="deckText" className={`${user}-text`}>
          (<span id="deckCount">{cards.length}</span>)
        </div>
        {cards.length > 0 ? (
          <CardView card={cards[0]} faceUp={false}></CardView>
        ) : null}
      </div>
      {showDeck && (
        <ViewDeck
          cards={cards}
          onClose={() => setShowDeck(false)}
          cssUser={user}
          onCardClick={(card) => onCardClick(card)}
        ></ViewDeck>
      )}
    </>
  );
}
