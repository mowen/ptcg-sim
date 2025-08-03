import { CSSProperties } from 'react';
import { Card } from '../../../models';
import CardView from '../cards/cardView';

import './prizeCards.css';

export function PrizeCards({ cards }: { cards: Array<Card> }) {
  const prizeStyle = (i: number): CSSProperties => ({
    zIndex: i,
    left: `${i * 2.5}em`,
  });

  return (
    <div id="prizes" className="zone">
      {cards.map((c: Card, i) => (
        <CardView
          key={i}
          card={c}
          faceUp={false}
          style={prizeStyle(i)}
        ></CardView>
      ))}
    </div>
  );
}
