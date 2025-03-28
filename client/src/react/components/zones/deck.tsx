import { Card } from '../../../models';
import CardView from '../cards/cardView';

export function Deck({ user, cards }: { user: string; cards: Array<Card> }) {
  return (
    <>
      <div id="deckCover" className="outline">
        {cards.length > 0 ? (
          <CardView card={cards[0]} faceUp={false}></CardView>
        ) : null}
      </div>

      <div id="deckText" className={`${user}-text`}>
        (<span id="deckCount">{cards.length}</span>)
      </div>

      <div id="deck" className={`zone ${user}-view`}>
        <div className="zone-button-container">
          <button id="shuffleDeckButton" className="zone-button">
            Shuffle
          </button>
          <button id="closeDeckButton" className="zone-button">
            Close
          </button>
          <input type="checkbox" id="sortDeckCheckbox" />
          <label htmlFor="sortDeckCheckbox">Sort</label>
        </div>
      </div>
    </>
  );
}
