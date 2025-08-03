import { Card } from '../../../models';
import CardView from '../cards/cardView';

import './prizeCards.css';

export function PrizeCards({ cards }: { cards: Array<Card> }) {
  return (
    <div id="prizes" className="outline zone">
      {cards.map((c: Card, i) => (
        <CardView
          key={i}
          card={c}
          faceUp={false}
          className={`prize-${i}`}
        ></CardView>
      ))}
    </div>
  );
}
