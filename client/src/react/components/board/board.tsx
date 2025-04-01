import './board.css';
import { CardDTO, BoardStateDTO, BoardState } from '../../../models';
import {
  Active,
  AttachedCards,
  Bench,
  Deck,
  Discard,
  Hand,
  LostZone,
  PlayBoard,
  PrizeCards,
  SpecialMoves,
  ViewCards,
} from '../..';

export function Board({
  cssUser,
  boardUser,
  deckList,
  boardState,
}: {
  cssUser: string;
  boardUser: string;
  deckList: Array<CardDTO>;
  boardState: BoardStateDTO;
}) {
  const board = new BoardState(boardState, deckList);

  return (
    <div id={`${cssUser}Container`} className="self">
      <div id="boardCenterDesign">
        <div id="boardCircle"></div>
        <div id="innerCircle"></div>
      </div>

      <Deck user={cssUser} cards={board.deck}></Deck>
      <Discard user={cssUser} cards={board.discard}></Discard>
      <LostZone user={cssUser} cards={board.lostZone}></LostZone>
      <Hand user={cssUser} cards={board.hand}></Hand>
      <Bench cards={board.bench}></Bench>
      <Active user={cssUser} cards={board.active}></Active>
      <PrizeCards cards={board.prize} />
      <PlayBoard user={cssUser} cards={board.board} />
      <SpecialMoves
        cssUser={cssUser}
        boardUser={boardUser}
        vstarUsed={boardState.vstarUsed}
        gxUsed={boardState.gxUsed}
      ></SpecialMoves>
      <AttachedCards user={cssUser}></AttachedCards>
      <ViewCards user={cssUser}></ViewCards>
    </div>
  );
}
