import { Card } from '../../../models';
import CardView from '../cards/cardView';

export function Discard({ user, cards }: { user: string; cards: Array<Card> }) {
  return (
    <>
      <div id="discardCover" className="outline">
        {cards.length > 0 ? <CardView card={cards[0]}></CardView> : null}
      </div>

      <div id="discardText" className={`${user}-text`}>
        (<span id="discardCount">{cards.length}</span>)
      </div>

      <div id="discard" className={`zone ${user}-view`}>
        <div className="zone-button-container">
          <button id="shuffleDiscardButton" className="zone-button">
            Shuffle all to Deck
          </button>
          <button id="closeDiscardButton" className="zone-button">
            Close
          </button>
          <input type="checkbox" id="sortDiscardCheckbox" />
          <label htmlFor="sortDiscardCheckbox">Sort</label>
        </div>
      </div>
    </>
  );
}
