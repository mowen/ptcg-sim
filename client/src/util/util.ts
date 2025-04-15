import { BoardState, GameStateDTO, Player, UserType } from '../models';

export function debugDump(state: GameStateDTO, user: string) {
  const boardState = new BoardState(state[user]);

  return {
    active: boardState.active.map((c) => c.toString()),
    hand: boardState.hand.map((c) => c.toString()),
    bench: boardState.bench.map((c) => c.toString()),
    deck: boardState.deck.map((c) => c.toString()),
  };
}

export function userToPlayer(user: string): Player {
  const userType = user as UserType;
  return userType == UserType.Self ? Player.One : Player.Two;
}

export function getOtherPlayer(player: Player): Player {
  return player == Player.One ? Player.Two : Player.One;
}

export function getOtherUser(user: UserType): UserType {
  return user == UserType.Self ? UserType.Opp : UserType.Self;
}
