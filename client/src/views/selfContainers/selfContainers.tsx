import { useRef } from 'react';
import useMutationObserver from '../../hooks/useMutationObserver';
import { adjustAlignment } from '../../setup/sizing/adjust-alignment';
import GxVStarButton from '../buttons/GxVStarButton';

import './selfContainers.css';
import { Card } from '../../models/card';
import CardView from '../cardView';

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

// Function to adjust image size based on the number of images
const adjustImageSize = (element) => {
  const images = element.getElementsByTagName('img');
  const numImages = images.length;
  const classList = numImages <= 6 ? 'prizes-normal-size' : 'prizes-small-size';

  for (const image of images) {
    image.classList.remove('prizes-normal-size', 'prizes-small-size');
    image.classList.add(classList);
  }
};

// Callback function for the Mutation Observer
const handlePrizeMutations = (element, mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      // Child nodes have been added or removed, adjust image size
      adjustImageSize(mutation.target);
    }
  }
};

function SelfContainers({ state }) {
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

  const prizesRef = useRef<HTMLDivElement>(null);
  useMutationObserver(prizesRef, handlePrizeMutations, {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: true,
  });

  const filterCards = (indices: number[]) => indices.map((i) => state.cards[i]);
  const deckCards = filterCards(state.deckIndices);
  const activeCards = filterCards(state.activeIndices);
  const handCards = filterCards(state.handIndices);
  const benchCards = filterCards(state.benchIndices);
  const prizeCards = filterCards(state.prizeIndices);
  const discardCards = filterCards(state.discardIndices);
  const boardCards = filterCards(state.boardIndices);
  const lostZoneCards = filterCards(state.lostZoneIndices);

  return (
    <div id="selfContainer" className="self">
      <div id="boardCenterDesign">
        <div id="boardCircle"></div>
        <div id="innerCircle"></div>
      </div>

      <div id="deckText" className="self-text">
        (<span id="deckCount">{deckCards.length}</span>)
      </div>
      <div id="deck" className="zone self-view">
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
      <div id="discardText" className="self-text">
        (<span id="discardCount">{discardCards.length}</span>)
      </div>
      <div id="discard" className="zone self-view">
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
      <div id="lostZoneText" className="self-text">
        (<span id="lostZoneCount">{lostZoneCards.length}</span>)
      </div>
      <div id="lostZone" className="zone self-view">
        <div className="zone-button-container">
          <button id="closeLostZoneButton" className="zone-button">
            Close
          </button>
          <input type="checkbox" id="sortLostZoneCheckbox" />
          <label htmlFor="sortLostZoneCheckbox">Sort</label>
        </div>
      </div>

      <div id="handLabel">
        <input type="checkbox" id="sortHandCheckbox" className="self-text" />
        <label style={{ cursor: 'pointer' }} htmlFor="sortHandCheckbox">
          <div
            id="sortHandText"
            className="self-text"
            style={{ display: 'inline-block' }}
          >
            Sort
          </div>
        </label>
      </div>
      <div id="handText" className="self-text">
        (<span id="handCount">{handCards.length}</span>)
      </div>
      <div id="hand" ref={handRef}>
        {handCards.map((c: Card) => (
          <CardView name={c.name} imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <div id="discardCover" className="outline"></div>
      <div id="deckCover" className="outline"></div>
      <div id="lostZoneCover" className="outline"></div>
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
      <div id="prizes" className="outline" ref={prizesRef}>
        {prizeCards.map((c: Card) => (
          <CardView name={c.name} imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <div id="board" className="self-board" ref={boardRef}></div>
      {boardCards.map((c: Card) => (
        <CardView name={c.name} imageUrl={c.imageUrl}></CardView>
      ))}
      <div
        id="specialMoveButtonContainer"
        className="self-special-move-button-container"
      >
        <GxVStarButton user="self" type="VSTAR" used={state.vstarUsed} />
        <GxVStarButton user="self" type="GX" used={state.gxUsed} />
      </div>

      <div id="attachedCards" className="self-view">
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

      <div id="viewCards" className="self-view">
        <div id="viewCardsHeader" className="header self-header">
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

export default SelfContainers;
