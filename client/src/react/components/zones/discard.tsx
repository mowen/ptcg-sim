import { Card } from '../../../models';
import CardView from '../cards/cardView';

export function Discard({ user, cards }: { user: string; cards: Array<Card> }) {
  return (
    <>
      <div id="discardCover" className="outline">
        <div id="discardText" className={`${user}-text`}>
          (<span id="discardCount">{cards.length}</span>)
        </div>
        {cards.length > 0 ? <CardView card={cards[0]}></CardView> : null}
      </div>
    </>
  );
}
