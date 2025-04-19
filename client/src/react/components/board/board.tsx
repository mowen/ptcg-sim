import './board.css';
import { BoardState, PlayerStateDTO } from '../../../models';
import {
  Active,
  Bench,
  Deck,
  Discard,
  Hand,
  LostZone,
  PlayBoard,
  PrizeCards,
  SpecialMoves,
  Stadium,
  ViewCards,
} from '../..';
import { useMemo } from 'react';

export function Board({
  cssUser,
  boardUser,
  playerState,
}: {
  cssUser: string;
  boardUser: string;
  playerState: PlayerStateDTO;
}) {
  const board = useMemo(() => {
    try {
      return new BoardState(playerState);
    } catch (error) {
      console.error(error, playerState.boardState);
    }
  }, [playerState]);

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
        vstarUsed={playerState.boardState.vstarUsed}
        gxUsed={playerState.boardState.gxUsed}
      ></SpecialMoves>
      <Stadium cards={board.stadium}></Stadium>
      <ViewCards user={cssUser}></ViewCards>
    </div>
  );
}
