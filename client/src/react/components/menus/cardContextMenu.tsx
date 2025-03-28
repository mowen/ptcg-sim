import {
  discardBoard,
  handBoard,
  lostZoneBoard,
  shuffleBoard,
} from '../../../actions/general/board-actions';
import { mouseClick, systemState } from '../../../front-end';

export function CardContextMenu() {
  return (
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
          onClick={() => handBoard(mouseClick.cardUser, systemState.initiator)}
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
  );
}
