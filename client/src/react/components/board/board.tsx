import './board.css';
import { Card, BoardStateDTO, BoardState } from '../../../models';
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
  user,
  deckList,
  boardState,
}: {
  user: string;
  deckList: Array<Card>;
  boardState: BoardStateDTO;
}) {
  const board = new BoardState(boardState, deckList);

  return (
    <div id={`${user}Container`} className="self">
      <div id="boardCenterDesign">
        <div id="boardCircle"></div>
        <div id="innerCircle"></div>
      </div>

      <Deck user={user} cards={board.deck}></Deck>
      <Discard user={user} cards={board.discard}></Discard>
      <LostZone user={user} cards={board.lostZone}></LostZone>
      <Hand user={user} cards={board.hand}></Hand>
      <Bench cards={board.bench}></Bench>
      <Active user={user} cards={board.active}></Active>
      <PrizeCards cards={board.prize} />
      <PlayBoard user={user} cards={board.board} />
      <SpecialMoves
        user={user}
        vstarUsed={boardState.vstarUsed}
        gxUsed={boardState.gxUsed}
      ></SpecialMoves>
      <AttachedCards user={user}></AttachedCards>
      <ViewCards user={user}></ViewCards>
    </div>
  );
}
