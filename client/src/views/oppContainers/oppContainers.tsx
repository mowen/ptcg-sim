import { useRef } from 'react';
import useMutationObserver from '../../hooks/useMutationObserver';
import { adjustAlignment } from '../../setup/sizing/adjust-alignment';
import GxVStarButton from '../buttons/GxVStarButton';

import './oppContainers.css';
import { Card, CardLocation } from '../../models/card';
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

function OppContainers({ state }) {
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

  const activeCards = state.cards.filter(
    (c) => c.location === CardLocation.Active
  );
  const handCards = state.cards.filter((c) => c.location === CardLocation.Hand);
  const benchCards = state.cards.filter(
    (c) => c.location === CardLocation.Bench
  );

  return (
    <div id="oppContainer" className="opp">
      <div id="boardCenterDesign">
        <div id="boardCircle"></div>
        <div id="innerCircle"></div>
      </div>

      <div id="deckText" className="opp-text">
        (<span id="deckCount">0</span>)
      </div>
      <div id="deck" className="zone opp-view">
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
      <div id="discardText" className="opp-text">
        (<span id="discardCount">0</span>)
      </div>
      <div id="discard" className="zone opp-view">
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
      <div id="lostZoneText" className="opp-text">
        (<span id="lostZoneCount">0</span>)
      </div>
      <div id="lostZone" className="zone opp-view">
        <div className="zone-button-container">
          <button id="closeLostZoneButton" className="zone-button">
            Close
          </button>
          <input type="checkbox" id="sortLostZoneCheckbox" />
          <label htmlFor="sortLostZoneCheckbox">Sort</label>
        </div>
      </div>

      <div id="handLabel">
        <input type="checkbox" className="opp-text" id="sortHandCheckbox" />
        <label style={{ cursor: 'pointer' }} htmlFor="sortHandCheckbox">
          <div
            id="sortHandText"
            className="opp-text"
            style={{ display: 'inline-block' }}
          >
            Sort
          </div>
        </label>
      </div>
      <div id="handText" className="opp-text">
        (<span id="handCount">0</span>)
      </div>
      <div id="hand" ref={handRef}>
        {handCards.map((c: Card) => (
          <CardView imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <div id="discardCover" className="outline"></div>
      <div id="deckCover" className="outline"></div>
      <div id="lostZoneCover" className="outline"></div>
      <div id="bench" className="outline">
        {benchCards.map((c: Card) => (
          <CardView imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <div id="active" className="outline">
        {activeCards.map((c: Card) => (
          <CardView imageUrl={c.imageUrl}></CardView>
        ))}
      </div>
      <div id="prizes" className="outline" ref={prizesRef}></div>
      <div id="board" className="opp-board" ref={boardRef}></div>

      <div
        id="specialMoveButtonContainer"
        className="opp-special-move-button-container"
      >
        <GxVStarButton user="opp" type="VSTAR" used={state.vstarUsed} />
        <GxVStarButton user="opp" type="GX" used={state.gxUsed} />
      </div>

      <div id="attachedCards" className="opp-view">
        <div id="attachedCardsHeader" className="header opp-header">
          Opponent moving cards...
        </div>
        <div
          id="attachedCardsButtonContainer"
          className="opp-zone-button-container"
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

      <div id="viewCards" className="opp-view flip-image">
        <div id="viewCardsHeader" className="header opp-header">
          Looking at cards...
        </div>
        <div
          id="viewCardsButtonContainer"
          className="opp-zone-button-container"
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

export default OppContainers;
