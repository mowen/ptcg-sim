import { useReducer } from 'react';
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
import Containers from './react/components/containers/containers';
import { Action } from './models';

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

const initialState2 = {
  initiator: 'self',
  isTwoPlayer: false,
  selfDeckList: [
    {
      name: 'Dreepy',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png',
    },
    {
      name: 'Dreepy',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png',
    },
    {
      name: 'Dreepy',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png',
    },
    {
      name: 'Dreepy',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png',
    },
    {
      name: 'Drakloak',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png',
    },
    {
      name: 'Drakloak',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png',
    },
    {
      name: 'Drakloak',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png',
    },
    {
      name: 'Drakloak',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png',
    },
    {
      name: 'Dragapult ex',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN.png',
    },
    {
      name: 'Dragapult ex',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN.png',
    },
    {
      name: 'Lumineon V',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BRS/BRS_040_R_EN.png',
    },
    {
      name: 'Lumineon V',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BRS/BRS_040_R_EN.png',
    },
    {
      name: 'Budew',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PRE/PRE_004_R_EN.png',
    },
    {
      name: 'Budew',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PRE/PRE_004_R_EN.png',
    },
    {
      name: 'Radiant Alakazam',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_059_R_EN.png',
    },
    {
      name: 'Bloodmoon Ursaluna ex',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_141_R_EN.png',
    },
    {
      name: 'Klefki',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_096_R_EN.png',
    },
    {
      name: 'Fezandipiti ex',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SFA/SFA_038_R_EN.png',
    },
    {
      name: 'Munkidori',
      type: 'Pokémon',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_095_R_EN.png',
    },
    {
      name: 'Arven',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
    },
    {
      name: 'Arven',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
    },
    {
      name: 'Arven',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
    },
    {
      name: 'Arven',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
    },
    {
      name: 'Lance',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_159_R_EN.png',
    },
    {
      name: 'Lance',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_159_R_EN.png',
    },
    {
      name: 'Lance',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_159_R_EN.png',
    },
    {
      name: "Professor Turo's Scenario",
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_171_R_EN.png',
    },
    {
      name: "Professor Turo's Scenario",
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_171_R_EN.png',
    },
    {
      name: 'Iono',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_185_R_EN.png',
    },
    {
      name: 'Iono',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_185_R_EN.png',
    },
    {
      name: "Boss's Orders",
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_172_R_EN.png',
    },
    {
      name: 'Crispin',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SCR/SCR_133_R_EN.png',
    },
    {
      name: 'Buddy-Buddy Poffin',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
    },
    {
      name: 'Buddy-Buddy Poffin',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
    },
    {
      name: 'Buddy-Buddy Poffin',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
    },
    {
      name: 'Buddy-Buddy Poffin',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
    },
    {
      name: 'Ultra Ball',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_196_R_EN.png',
    },
    {
      name: 'Ultra Ball',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_196_R_EN.png',
    },
    {
      name: 'Ultra Ball',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_196_R_EN.png',
    },
    {
      name: 'Nest Ball',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_181_R_EN.png',
    },
    {
      name: 'Nest Ball',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_181_R_EN.png',
    },
    {
      name: 'Counter Catcher',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_160_R_EN.png',
    },
    {
      name: 'Counter Catcher',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_160_R_EN.png',
    },
    {
      name: 'Super Rod',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_188_R_EN.png',
    },
    {
      name: 'Unfair Stamp',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_165_R_EN.png',
    },
    {
      name: 'Switch',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_194_R_EN.png',
    },
    {
      name: 'Earthen Vessel',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_163_R_EN.png',
    },
    {
      name: 'Defiance Vest',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_162_R_EN.png',
    },
    {
      name: 'Forest Seal Stone',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_156_R_EN.png',
    },
    {
      name: 'Rescue Board',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_159_R_EN.png',
    },
    {
      name: 'Lost City',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/LOR/LOR_161_R_EN.png',
    },
    {
      name: 'Temple of Sinnoh',
      type: 'Trainer',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/ASR/ASR_155_R_EN.png',
    },
    {
      name: 'Psychic Energy',
      type: 'Energy',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png',
    },
    {
      name: 'Psychic Energy',
      type: 'Energy',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png',
    },
    {
      name: 'Psychic Energy',
      type: 'Energy',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png',
    },
    {
      name: 'Psychic Energy',
      type: 'Energy',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png',
    },
    {
      name: 'Fire Energy',
      type: 'Energy',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN.png',
    },
    {
      name: 'Fire Energy',
      type: 'Energy',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN.png',
    },
    {
      name: 'Fire Energy',
      type: 'Energy',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN.png',
    },
    {
      name: 'Darkness Energy',
      type: 'Energy',
      imageUrl:
        'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_015_R_EN.png',
    },
  ],
  self: {
    gxUsed: false,
    vstarUsed: false,
    hand: [31, 41, 32, 47],
    prize: [48, 9, 14, 21, 35, 1],
    deck: [
      16, 52, 36, 57, 15, 53, 38, 10, 42, 18, 29, 22, 7, 40, 13, 37, 5, 44, 58,
      55, 51, 46, 28, 2, 43, 8, 45, 20, 39, 19, 59, 34, 6, 11, 12, 49, 17, 25,
      26, 30, 27, 50, 24, 54, 23, 33, 4,
    ],
    bench: [0, 3],
    active: [56],
    discard: [],
    board: [],
    lostZone: [],
  },
  oppDeckList: [],
  opp: {
    gxUsed: false,
    vstarUsed: false,
    hand: [],
    prize: [],
    deck: [],
    bench: [],
    active: [],
    discard: [],
    board: [],
    lostZone: [],
  },
  stadium: undefined,
  oppIsActive: false,
  turn: 0,
};

function App() {
  const [state, processAction] = useReducer(actionReducer, initialState2);
  // const stadiumRef = useRef<HTMLDivElement>(null);
  // useMutationObserver(stadiumRef, handleStadiumMutations, {
  //   attributes: true,
  //   characterData: false,
  //   childList: false,
  //   subtree: false,
  // });

  const p1DeckList = state.oppIsActive ? state.oppDeckList : state.selfDeckList;
  const p2DeckList = state.oppIsActive ? state.selfDeckList : state.oppDeckList;
  const p1State = state.oppIsActive ? state.opp : state.self;
  const p2State = state.oppIsActive ? state.self : state.opp;

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={processAction}>
        <Containers user="opp" deckList={p2DeckList} state={p2State} />
        <Containers user="self" deckList={p1DeckList} state={p1State} />

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
            <button
              onClick={() =>
                processAction(new Action('self', true, 'flipBoard', []))
              }
            >
              ⇅
            </button>
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
