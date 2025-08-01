import { Card } from '../../../models';
import CardView from '../cards/cardView';

export function Active({ user, cards }: { user: string; cards: Array<Card> }) {
  return (
    <div id="active" className={`${user}-active outline zone`}>
      {cards.map((c: Card, i: number) => (
        <CardView key={i} card={c}></CardView>
      ))}
    </div>
  );
}
