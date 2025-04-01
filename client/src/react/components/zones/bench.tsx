import { CardDTO } from '../../../models';
import CardView from '../cards/cardView';

export function Bench({ cards }: { cards: Array<CardDTO> }) {
  return (
    <>
      <div id="bench" className="outline">
        {cards.map((c: CardDTO, i: number) => (
          <CardView key={i} card={c}></CardView>
        ))}
      </div>
    </>
  );
}
