import { Card } from '../../../models';
import CardView from '../cards/cardView';

export function Bench({ cards }: { cards: Array<Card> }) {
  return (
    <>
      <div id="bench" className="outline zone">
        {cards.map((c: Card, i: number) => (
          <CardView key={i} card={c}></CardView>
        ))}
      </div>
    </>
  );
}
