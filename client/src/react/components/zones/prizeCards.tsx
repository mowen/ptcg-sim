import { CardDTO } from '../../../models';
import CardView from '../cards/cardView';

export function PrizeCards({ cards }: { cards: Array<CardDTO> }) {
  const classList =
    cards.length <= 6 ? 'prizes-normal-size' : 'prizes-small-size';

  return (
    <div id="prizes" className="outline">
      {cards.map((c: CardDTO, i) => (
        <CardView
          key={i}
          card={c}
          faceUp={false}
          className={classList}
        ></CardView>
      ))}
    </div>
  );
}
