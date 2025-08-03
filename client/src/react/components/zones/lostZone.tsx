import { Card } from '../../../models';
import CardView from '../cards/cardView';

export function LostZone({
  user,
  cards,
}: {
  user: string;
  cards: Array<Card>;
}) {
  return (
    <>
      <div id="lostZoneCover" className="zone">
        <div id="lostZoneText" className={`${user}-text`}>
          (<span id="lostZoneCount">{cards.length}</span>)
        </div>
        {cards.map((c: Card, i) => (
          <CardView key={i} card={c}></CardView>
        ))}
      </div>
    </>
  );
}
