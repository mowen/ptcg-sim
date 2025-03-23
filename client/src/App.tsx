import { useReducer, useState } from 'react';
import { mouseClick, systemState } from './front-end';
import {
  discardBoard,
  handBoard,
  lostZoneBoard,
  shuffleBoard,
} from './actions/general/board-actions';
import { flipCoin } from './actions/general/flip-coin';
import { takeTurn } from './actions/general/take-turn';
import { refreshBoardImages } from './setup/sizing/refresh-board';
import actionReducer from './react/reducer/actionReducer';
import { AppContext, AppDispatchContext } from './react/context/appContext';
import Board from './react/components/board/board';
import { GameStateDTO } from './models';
import { Undoable, undoableReducer } from './react/reducer/undoableReducer';

// const zoneIds = ['lostZone', 'deck', 'discard', 'attachedCards', 'viewCards'];
// const selfElements = zoneIds.map((zoneId) =>
//   selfContainerDocument.getElementById(zoneId)
// );
// const oppElements = zoneIds.map((zoneId) =>
//   oppContainerDocument.getElementById(zoneId)
// );
// const elements = [...selfElements, ...oppElements];
// const stadiumElement = document.getElementById('stadium');
// const boardButtonContainer = document.getElementById('boardButtonContainer');

// Function to check the display of the elements and update the z-index of stadiumElement
// const handleStadiumMutations = (element, mutations) => {
//   for (let i = 0; i < elements.length; i++) {
//     if (elements[i].style.display === 'block') {
//       element.style.zIndex = '-1';
//       boardButtonContainer.style.zIndex = '-1';
//       return; // Exit the function if a element is displayed
//     }
//   }
//   // If none of the elements are displayed, set the z-index to 0
//   element.style.zIndex = '0';
//   boardButtonContainer.style.zIndex = '0';
// };

function App({ initialState }: { initialState: Undoable<GameStateDTO> }) {
  const [isSelfActive, setIsSelfActive] = useState(true);

  const undoableActionReducer = undoableReducer(actionReducer);
  const [state, processAction] = useReducer(
    undoableActionReducer,
    initialState
  );
  // const stadiumRef = useRef<HTMLDivElement>(null);
  // useMutationObserver(stadiumRef, handleStadiumMutations, {
  //   attributes: true,
  //   characterData: false,
  //   childList: false,
  //   subtree: false,
  // });

  const p1DeckList = isSelfActive
    ? state.present.selfDeckList
    : state.present.oppDeckList;
  const p2DeckList = isSelfActive
    ? state.present.oppDeckList
    : state.present.selfDeckList;
  const p1State = isSelfActive ? state.present.self : state.present.opp;
  const p2State = isSelfActive ? state.present.opp : state.present.self;

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={processAction}>
        <Board user="opp" deckList={p2DeckList} boardState={p2State} />
        <Board user="self" deckList={p1DeckList} boardState={p1State} />

        <div id="stadium" className="outline"></div>

        <div id="selfResizer" className="self-color"></div>
        <div id="oppResizer" className="opp-color"></div>

        <div id="boardButtonContainer">
          <div className="tooltip" id="turnButton">
            <button
              onClick={() =>
                takeTurn(systemState.initiator, systemState.initiator)
              }
            >
              +Turn
            </button>
            <span className="tooltiptext">Start turn</span>
          </div>
          <div className="tooltip" id="flipCoinButton">
            <button onClick={() => flipCoin(systemState.initiator)}>
              Coin
            </button>
            <span className="tooltiptext">Flip coin</span>
          </div>
          <div className="tooltip" id="flipBoardButton">
            <button onClick={() => setIsSelfActive(!isSelfActive)}>⇅</button>
            <span className="tooltiptext">Flip board</span>
          </div>
          <div className="tooltip" id="refreshButton">
            <button onClick={refreshBoardImages}>
              <div id="refreshIcon">↻</div>
              <div id="loadingCircle"></div>
            </button>
            <span className="tooltiptext">Refresh images</span>
          </div>
        </div>

        <div id="cardContextMenu" className="card-context-menu">
          <ul>
            <li id="abilityCounterButton">Toggle ability/effect</li>
            <li id="damageCounterButton">Damage counter</li>
            <li id="specialConditionButton">Special condition</li>

            <li id="prizesHeader">Prizes</li>
            <li id="shufflePrizesButton">Shuffle prizes</li>
            <li id="revealHidePrizesButton">Reveal/hide prizes</li>
            <li id="lookPrizesButton">Look/cover prizes</li>

            <li id="handHeader">Hand</li>
            <li id="discardHandButton">Discard hand</li>
            <li id="shuffleHandButton">Shuffle hand into deck</li>
            <li id="shuffleHandBottomButton">Shuffle hand to bottom</li>
            <li id="lookHandButton">Look/cover hand</li>
            <li id="randomHandButton">Pick random card</li>

            <li id="deckHeader">Deck</li>
            <li id="shuffleDeckButton">Shuffle deck</li>
            <li id="drawButton">Draw card(s)</li>
            <li id="viewTopButton">View top card(s)</li>
            <li id="viewBottomButton">View bottom card(s)</li>

            <li id="boardHeader">Playboard</li>
            <li
              id="discardBoardButton"
              onClick={() =>
                discardBoard(mouseClick.cardUser, systemState.initiator)
              }
            >
              Discard all
            </li>
            <li
              id="handBoardButton"
              onClick={() =>
                handBoard(mouseClick.cardUser, systemState.initiator)
              }
            >
              Move all to hand
            </li>
            <li
              id="shuffleBoardButton"
              onClick={() =>
                shuffleBoard(mouseClick.cardUser, systemState.initiator)
              }
            >
              Shuffle all into deck
            </li>
            <li
              id="lostZoneBoardButton"
              onClick={() =>
                lostZoneBoard(mouseClick.cardUser, systemState.initiator)
              }
            >
              Lost Zone all
            </li>

            <li id="moveButton">
              Move card...
              <ul className="card-sub-menu">
                <li id="moveToBoardButton">to Board</li>
                <li id="moveToTopButton">to Deck (top)</li>
                <li id="moveToBottomButton">to Deck (bottom)</li>
                <li id="switchWithTopButton">to Deck (switch)</li>
                <li id="shuffleIntoDeckButton">to Deck (shuffle)</li>
              </ul>
            </li>
            <li id="revealHideButton">Reveal/hide card</li>
            <li id="changeButton">
              Change type...
              <ul className="card-sub-menu">
                <li id="changeToEnergyButton">to Energy</li>
                <li id="changeToToolButton">to Tool</li>
                <li id="changeToPokémonButton">to Pokémon</li>
              </ul>
            </li>
          </ul>
        </div>
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
