import { Card } from '../../../models';
import CardView from '../cards/cardView';

export function Deck({ user, cards }: { user: string; cards: Array<Card> }) {
  return (
    <>
      <div id="deckCover" className="zone">
        <div id="deckText" className={`${user}-text`}>
          (<span id="deckCount">{cards.length}</span>)
        </div>
        {cards.length > 0 ? (
          <CardView card={cards[0]} faceUp={false}></CardView>
        ) : null}
      </div>
    </>
  );
}
