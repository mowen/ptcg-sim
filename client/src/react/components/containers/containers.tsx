import { useRef } from 'react';
import useMutationObserver from '../../hooks/useMutationObserver';
import { adjustAlignment } from '../../../setup/sizing/adjust-alignment';
import GxVStarButton from '../buttons/GxVStarButton';

import './containers.css';
import CardView from '../cardView';
import { Card, BoardState } from '../../../models';

const scrollToBottom = (element) => {
  element.scrollTop = element.scrollHeight;
};

const handleBoardMutations = (element, mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      scrollToBottom(element);
    }
  });
};

const handleHandMutations = (element, mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      adjustAlignment(element);
    }
  });
};

function Prizes({ prizeCards }: { prizeCards: Array<Card> }) {
  const classList =
    prizeCards.length <= 6 ? 'prizes-normal-size' : 'prizes-small-size';

  return (
    <div id="prizes" className="outline">
      {prizeCards.map((c: Card) => (
        <CardView
          name={c.name}
          imageUrl={c.imageUrl}
          className={classList}
        ></CardView>
      ))}
    </div>
  );
}

function Containers({
  user,
  deckList,
  state,
}: {
  user: string;
  deckList: Array<Card>;
  state: BoardState;
}) {
  const boardRef = useRef<HTMLDivElement>(null);
  useMutationObserver(boardRef, handleBoardMutations, {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: false,
  });

  const handRef = useRef<HTMLDivElement>(null);
  useMutationObserver(handRef, handleHandMutations, {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: false,
  });

  const filterCards = (indices: number[]) =>
    indices?.map((i) => deckList[i]) ?? [];
  const deckCards = filterCards(state.deck);
  const activeCards = filterCards(state.active);
  const handCards = filterCards(state.hand);
  const benchCards = filterCards(state.bench);
  const prizeCards = filterCards(state.prize);
  const discardCards = filterCards(state.discard);
  const boardCards = filterCards(state.board);
  const lostZoneCards = filterCards(state.lostZone);

  return (
    <div id={`${user}Container`} className={user}>
      <div id="boardCenterDesign">
        <div id="boardCircle"></div>
        <div id="innerCircle"></div>
      </div>

      <div id="deckText" className={`${user}-text`}>
        (<span id="deckCount">{deckCards.length}</span>)
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
      <div id="discardText" className={`${user}-text`}>
        (<span id="discardCount">{discardCards.length}</span>)
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
      <div id="lostZoneText" className={`${user}-text`}>
        (<span id="lostZoneCount">{lostZoneCards.length}</span>)
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

      <div id="handLabel">
        <input
          type="checkbox"
          id="sortHandCheckbox"
          className={`${user}-text`}
        />
        <label style={{ cursor: 'pointer' }} htmlFor="sortHandCheckbox">
          <div
            id="sortHandText"
            className={`${user}-text`}
            style={{ display: 'inline-block' }}
          >
            Sort
          </div>
        </label>
      </div>
      <div id="handText" className={`${user}-text`}>
        (<span id="handCount">{handCards.length}</span>)
      </div>
      <div id="hand" ref={handRef}>
        {handCards.map((c: Card) => (
          <CardView name={c.name} imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <div id="discardCover" className="outline">
        {discardCards.map((c: Card) => (
          <CardView name={c.name} imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <div id="deckCover" className="outline">
        {deckCards.map((c: Card) => (
          <CardView name={c.name} imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <div id="lostZoneCover" className="outline">
        {lostZoneCards.map((c: Card) => (
          <CardView name={c.name} imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <div id="bench" className="outline">
        {benchCards.map((c: Card) => (
          <CardView name={c.name} imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <div id="active" className="outline">
        {activeCards.map((c: Card) => (
          <CardView name={c.name} imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <Prizes prizeCards={prizeCards} />
      <div id="board" className="self-board" ref={boardRef}>
        {boardCards.map((c: Card) => (
          <CardView name={c.name} imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <div
        id="specialMoveButtonContainer"
        className={`${user}-special-move-button-container`}
      >
        <GxVStarButton user={user} type="VSTAR" used={state.vstarUsed} />
        <GxVStarButton user={user} type="GX" used={state.gxUsed} />
      </div>

      <div id="attachedCards" className={`${user}-view`}>
        <div id="attachedCardsHeader" className="header self-header">
          Move attached cards
        </div>
        <div
          id="attachedCardsButtonContainer"
          className="self-zone-button-container"
        >
          <button id="discardAttachedCardsButton" className="zone-button">
            Discard all
          </button>
          <button id="shuffleAttachedCardsButton" className="zone-button">
            Shuffle all
          </button>
          <button id="lostZoneAttachedCardsButton" className="zone-button">
            Lost Zone all
          </button>
          <button id="handAttachedCardsButton" className="zone-button">
            To Hand
          </button>
          <button id="leaveAttachedCardsButton" className="zone-button">
            Leave in play
          </button>
        </div>
      </div>

      <div id="viewCards" className={`${user}-view`}>
        <div id="viewCardsHeader" className={`header ${user}-header`}>
          Looking at cards...
        </div>
        <div
          id="viewCardsButtonContainer"
          className="self-zone-button-container"
        >
          <button id="discardViewCardsButton" className="zone-button">
            Discard all
          </button>
          <button id="shuffleViewCardsButton" className="zone-button">
            Shuffle all
          </button>
          <button id="shuffleBottomViewCardsButton" className="zone-button">
            Shuffle to bottom
          </button>
          <button id="lostZoneViewCardsButton" className="zone-button">
            Lost Zone all
          </button>
          <button id="handViewCardsButton" className="zone-button">
            To Hand
          </button>
        </div>
      </div>
    </div>
  );
}

export default Containers;
