import { useReducer } from 'react';
import OppContainers from './views/oppContainers/oppContainers';
import SelfContainers from './views/selfContainers/selfContainers';
import { mouseClick, systemState } from './front-end';
import {
  discardBoard,
  handBoard,
  lostZoneBoard,
  shuffleBoard,
} from './actions/general/board-actions';
import { flipCoin } from './actions/general/flip-coin';
import { takeTurn } from './actions/general/take-turn';
import { flipBoard } from './actions/general/flip-board';
import { refreshBoardImages } from './setup/sizing/refresh-board';
import actionReducer from './reducer/actionReducer';
import { AppContext, AppDispatchContext } from './context/appContext';

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

const initialState = {
  initiator: 'self',
  isTwoPlayer: false,
  selfBoardState: {
    gxUsed: false,
    vstarUsed: false,
    cards: [],
  },
  oppBoardState: {
    gxUsed: false,
    vstarUsed: false,
    cards: [],
  },
};

const initialState2 = {
  initiator: 'self',
  isTwoPlayer: false,
  selfBoardState: {
    gxUsed: false,
    vstarUsed: false,
    cards: [
      {
        name: 'Dreepy',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png',
        index: 3,
        location: 'hand',
      },
      {
        name: 'Dreepy',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png',
        index: 56,
        location: 'deck',
      },
      {
        name: 'Dreepy',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png',
        index: 31,
        location: 'deck',
      },
      {
        name: 'Dreepy',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png',
        index: 41,
        location: 'deck',
      },
      {
        name: 'Drakloak',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png',
        index: 32,
        location: 'deck',
      },
      {
        name: 'Drakloak',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png',
        index: 0,
        location: 'bench',
      },
      {
        name: 'Drakloak',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png',
        index: 47,
        location: 'deck',
      },
      {
        name: 'Drakloak',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png',
        index: 48,
        location: 'deck',
      },
      {
        name: 'Dragapult ex',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN.png',
        index: 9,
        location: 'prize',
      },
      {
        name: 'Dragapult ex',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN.png',
        index: 14,
        location: 'deck',
      },
      {
        name: 'Lumineon V',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BRS/BRS_040_R_EN.png',
        index: 21,
        location: 'deck',
      },
      {
        name: 'Lumineon V',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BRS/BRS_040_R_EN.png',
        index: 35,
        location: 'deck',
      },
      {
        name: 'Budew',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PRE/PRE_004_R_EN.png',
        index: 1,
        location: 'hand',
      },
      {
        name: 'Budew',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PRE/PRE_004_R_EN.png',
        index: 16,
        location: 'deck',
      },
      {
        name: 'Radiant Alakazam',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_059_R_EN.png',
        index: 52,
        location: 'deck',
      },
      {
        name: 'Bloodmoon Ursaluna ex',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_141_R_EN.png',
        index: 36,
        location: 'deck',
      },
      {
        name: 'Klefki',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_096_R_EN.png',
        index: 57,
        location: 'deck',
      },
      {
        name: 'Fezandipiti ex',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SFA/SFA_038_R_EN.png',
        index: 15,
        location: 'deck',
      },
      {
        name: 'Munkidori',
        type: 'Pokémon',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_095_R_EN.png',
        index: 53,
        location: 'deck',
      },
      {
        name: 'Arven',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
        index: 38,
        location: 'deck',
      },
      {
        name: 'Arven',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
        index: 10,
        location: 'prize',
      },
      {
        name: 'Arven',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
        index: 42,
        location: 'deck',
      },
      {
        name: 'Arven',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
        index: 18,
        location: 'deck',
      },
      {
        name: 'Lance',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_159_R_EN.png',
        index: 29,
        location: 'deck',
      },
      {
        name: 'Lance',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_159_R_EN.png',
        index: 22,
        location: 'deck',
      },
      {
        name: 'Lance',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_159_R_EN.png',
        index: 7,
        location: 'prize',
      },
      {
        name: "Professor Turo's Scenario",
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_171_R_EN.png',
        index: 40,
        location: 'deck',
      },
      {
        name: "Professor Turo's Scenario",
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_171_R_EN.png',
        index: 13,
        location: 'deck',
      },
      {
        name: 'Iono',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_185_R_EN.png',
        index: 37,
        location: 'deck',
      },
      {
        name: 'Iono',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_185_R_EN.png',
        index: 5,
        location: 'active',
      },
      {
        name: "Boss's Orders",
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_172_R_EN.png',
        index: 44,
        location: 'deck',
      },
      {
        name: 'Crispin',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SCR/SCR_133_R_EN.png',
        index: 58,
        location: 'deck',
      },
      {
        name: 'Buddy-Buddy Poffin',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
        index: 55,
        location: 'deck',
      },
      {
        name: 'Buddy-Buddy Poffin',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
        index: 51,
        location: 'deck',
      },
      {
        name: 'Buddy-Buddy Poffin',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
        index: 46,
        location: 'deck',
      },
      {
        name: 'Buddy-Buddy Poffin',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
        index: 28,
        location: 'deck',
      },
      {
        name: 'Ultra Ball',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_196_R_EN.png',
        index: 2,
        location: 'hand',
      },
      {
        name: 'Ultra Ball',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_196_R_EN.png',
        index: 43,
        location: 'deck',
      },
      {
        name: 'Ultra Ball',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_196_R_EN.png',
        index: 8,
        location: 'prize',
      },
      {
        name: 'Nest Ball',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_181_R_EN.png',
        index: 45,
        location: 'deck',
      },
      {
        name: 'Nest Ball',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_181_R_EN.png',
        index: 20,
        location: 'deck',
      },
      {
        name: 'Counter Catcher',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_160_R_EN.png',
        index: 39,
        location: 'deck',
      },
      {
        name: 'Counter Catcher',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_160_R_EN.png',
        index: 19,
        location: 'deck',
      },
      {
        name: 'Super Rod',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_188_R_EN.png',
        index: 59,
        location: 'deck',
      },
      {
        name: 'Unfair Stamp',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_165_R_EN.png',
        index: 34,
        location: 'deck',
      },
      {
        name: 'Switch',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_194_R_EN.png',
        index: 6,
        location: 'hand',
      },
      {
        name: 'Earthen Vessel',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_163_R_EN.png',
        index: 11,
        location: 'prize',
      },
      {
        name: 'Defiance Vest',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_162_R_EN.png',
        index: 12,
        location: 'prize',
      },
      {
        name: 'Forest Seal Stone',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_156_R_EN.png',
        index: 49,
        location: 'deck',
      },
      {
        name: 'Rescue Board',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_159_R_EN.png',
        index: 17,
        location: 'deck',
      },
      {
        name: 'Lost City',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/LOR/LOR_161_R_EN.png',
        index: 25,
        location: 'deck',
      },
      {
        name: 'Temple of Sinnoh',
        type: 'Trainer',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/ASR/ASR_155_R_EN.png',
        index: 26,
        location: 'deck',
      },
      {
        name: 'Psychic Energy',
        type: 'Energy',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png',
        index: 30,
        location: 'deck',
      },
      {
        name: 'Psychic Energy',
        type: 'Energy',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png',
        index: 27,
        location: 'deck',
      },
      {
        name: 'Psychic Energy',
        type: 'Energy',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png',
        index: 50,
        location: 'deck',
      },
      {
        name: 'Psychic Energy',
        type: 'Energy',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png',
        index: 24,
        location: 'deck',
      },
      {
        name: 'Fire Energy',
        type: 'Energy',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN.png',
        index: 54,
        location: 'deck',
      },
      {
        name: 'Fire Energy',
        type: 'Energy',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN.png',
        index: 23,
        location: 'deck',
      },
      {
        name: 'Fire Energy',
        type: 'Energy',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN.png',
        index: 33,
        location: 'deck',
      },
      {
        name: 'Darkness Energy',
        type: 'Energy',
        imageUrl:
          'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_015_R_EN.png',
        index: 4,
        location: 'hand',
      },
    ],
  },
  oppBoardState: {
    gxUsed: false,
    vstarUsed: false,
    cards: [],
  },
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

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={processAction}>
        <OppContainers state={state.oppBoardState} />
        <SelfContainers state={state.selfBoardState} />

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
            <button onClick={flipBoard}>⇅</button>
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
