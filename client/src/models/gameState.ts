import { BoardState, BoardStateDTO } from './boardState';
import { CardDTO } from './card';

class UserType {
  public static readonly Self: string = 'self';
  public static readonly Opp: string = 'opp';
}

class GameStateDTO {
  public initiator: string = UserType.Self;
  public isTwoPlayer: boolean = false;
  public selfDeckList: Array<CardDTO> = new Array<CardDTO>();
  public self: BoardStateDTO = new BoardStateDTO();
  public oppDeckList: Array<CardDTO> = new Array<CardDTO>();
  public opp: BoardStateDTO = new BoardStateDTO();
  public oppIsActive: boolean = false;
  public turn: number = 0;
}

class GameState {
  private readonly _selfBoard: BoardState;
  private readonly _oppBoard: BoardState;

  constructor(gameState: GameStateDTO) {
    this._selfBoard = new BoardState(gameState.self, gameState.selfDeckList);
    this._oppBoard = new BoardState(gameState.opp, gameState.oppDeckList);
  }

  public get selfActive(): Array<CardDTO> {
    return this._selfBoard.active;
  }

  public get selfHand(): Array<CardDTO> {
    return this._selfBoard.hand;
  }

  public get selfBench(): Array<CardDTO> {
    return this._selfBoard.bench;
  }

  public get selfDeck(): Array<CardDTO> {
    return this._selfBoard.deck;
  }

  public get oppActive(): Array<CardDTO> {
    return this._oppBoard.active;
  }

  public get oppHand(): Array<CardDTO> {
    return this._oppBoard.hand;
  }

  public get oppBench(): Array<CardDTO> {
    return this._oppBoard.bench;
  }

  public get oppDeck(): Array<CardDTO> {
    return this._oppBoard.deck;
  }
}

export { BoardStateDTO, GameStateDTO, GameState, UserType };
