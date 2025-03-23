import { BoardState, BoardStateDTO } from './boardState';
import { Card } from './card';

class UserType {
  public static readonly Self: string = 'self';
  public static readonly Opp: string = 'opp';
}

class GameStateDTO {
  public initiator: string = UserType.Self;
  public isTwoPlayer: boolean = false;
  public selfDeckList: Array<Card> = new Array<Card>();
  public self: BoardStateDTO = new BoardStateDTO();
  public oppDeckList: Array<Card> = new Array<Card>();
  public opp: BoardStateDTO = new BoardStateDTO();
  public oppIsActive: boolean = false;
  public turn: number = 0;
}

class GameState {
  private readonly _selfBoard: BoardState;
  private readonly _oppBoard: BoardState;

  constructor(private readonly _gameState: GameStateDTO) {
    this._selfBoard = new BoardState(_gameState.self, _gameState.selfDeckList);
    this._oppBoard = new BoardState(_gameState.opp, _gameState.oppDeckList);
  }

  public get selfActive(): Array<Card> {
    return this._selfBoard.active;
  }

  public get selfHand(): Array<Card> {
    return this._selfBoard.hand;
  }

  public get selfBench(): Array<Card> {
    return this._selfBoard.bench;
  }

  public get selfDeck(): Array<Card> {
    return this._selfBoard.deck;
  }

  public get oppActive(): Array<Card> {
    return this._oppBoard.active;
  }

  public get oppHand(): Array<Card> {
    return this._oppBoard.hand;
  }

  public get oppBench(): Array<Card> {
    return this._oppBoard.bench;
  }

  public get oppDeck(): Array<Card> {
    return this._oppBoard.deck;
  }
}

export { BoardStateDTO, GameStateDTO, GameState, UserType };
