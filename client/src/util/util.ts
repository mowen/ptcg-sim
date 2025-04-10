import { BoardState, GameStateDTO } from '../models';

export function debugDump(state: GameStateDTO, user: string) {
  const boardState = new BoardState(state[user], state[`${user}DeckList`]);

  return {
    active: boardState.active.map((c) => c.toString()),
    hand: boardState.hand.map((c) => c.toString()),
    bench: boardState.bench.map((c) => c.toString()),
    deck: boardState.deck.map((c) => c.toString()),
  };
}
