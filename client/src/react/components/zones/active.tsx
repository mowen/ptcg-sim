import { CardDTO } from '../../../models';
import CardView from '../cards/cardView';

export function Active({
  user,
  cards,
}: {
  user: string;
  cards: Array<CardDTO>;
}) {
  return (
    <div id="active" className={`${user}-active outline`}>
      {cards.map((c: CardDTO, i: number) => (
        <CardView key={i} card={c}></CardView>
      ))}
    </div>
  );
}
