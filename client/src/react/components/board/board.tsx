import "./board.css";
import {
  BoardState,
  Card,
  PlayerStateDTO,
  SelectedCardDTO,
} from "../../../models";
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
} from "../..";
import { useMemo } from "react";

export function Board({
  cssUser,
  boardUser,
  playerState,
  selectedCard,
  onCardClick,
}: {
  cssUser: string;
  boardUser: string;
  playerState: PlayerStateDTO;
  selectedCard?: SelectedCardDTO;
  onCardClick: (card: Card) => void;
}) {
  const board = useMemo(() => {
    try {
      if (playerState.player === selectedCard?.player) {
        return new BoardState(playerState, selectedCard?.id);
      } else {
        return new BoardState(playerState);
      }
    } catch (error) {
      console.error(error, playerState.boardState);
    }
  }, [playerState, selectedCard]);

  return board ? (
    <div id={`${cssUser}Container`} className={`${cssUser} board`}>
      <Deck
        user={cssUser}
        cards={board.deck}
        onCardClick={(card) => onCardClick(card)}
      ></Deck>
      <Discard user={cssUser} cards={board.discard}></Discard>
      <LostZone user={cssUser} cards={board.lostZone}></LostZone>
      <Hand
        user={cssUser}
        cards={board.hand}
        onCardClick={(card) => onCardClick(card)}
      ></Hand>
      <Bench
        cards={board.bench}
        boardUser={boardUser}
        cssUser={cssUser}
        onCardClick={(card) => onCardClick(card)}
      ></Bench>
      <Active
        cards={board.active}
        boardUser={boardUser}
        cssUser={cssUser}
        onCardClick={(card) => onCardClick(card)}
      ></Active>
      <PrizeCards cards={board.prize} />
      <PlayBoard user={cssUser} cards={board.board} />
      <SpecialMoves
        cssUser={cssUser}
        boardUser={boardUser}
        vstarUsed={playerState.boardState.vstarUsed}
        gxUsed={playerState.boardState.gxUsed}
      ></SpecialMoves>
      <Stadium cards={board.stadium}></Stadium>
    </div>
  ) : (
    <div id={`${cssUser}Container`} className={`${cssUser} board`}></div>
  );
}
