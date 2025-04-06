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
      <div id="lostZoneCover" className="outline">
        {cards.map((c: Card, i) => (
          <CardView key={i} card={c}></CardView>
        ))}
      </div>

      <div id="lostZoneText" className={`${user}-text`}>
        (<span id="lostZoneCount">{cards.length}</span>)
      </div>

      <div id="lostZone" className={`zone ${user}-view`}>
        <div className="zone-button-container">
          <button id="closeLostZoneButton" className="zone-button">
            Close
          </button>
          <input type="checkbox" id="sortLostZoneCheckbox" />
          <label htmlFor="sortLostZoneCheckbox">Sort</label>
        </div>
      </div>
    </>
  );
}
