import { Card, CardLocation } from './card';

class BoardState {
  public gxUsed: boolean = false;
  public vstarUsed: boolean = false;
  public hand: Array<number> = new Array<number>();
  public prize: Array<number> = new Array<number>();
  public deck: Array<number> = new Array<number>();
  public bench: Array<number> = new Array<number>();
  public active: Array<number> = new Array<number>();
  public discard: Array<number> = new Array<number>();
  public board: Array<number> = new Array<number>();
  public lostZone: Array<number> = new Array<number>();
  public stadium: Array<number> = new Array<number>();
}

class GameState {
  public initiator: string = 'self';
  public isTwoPlayer: boolean = false;
  public selfDeckList: Array<Card> = new Array<Card>();
  public self: BoardState = new BoardState();
  public oppDeckList: Array<Card> = new Array<Card>();
  public opp: BoardState = new BoardState();
  public oppIsActive: boolean = false;
  public turn: number = 0;
}

class GameStateHelper {
  constructor(private _gameState: GameState) {}

  public get selfHand(): Array<Card> {
    return this.getCards('self', CardLocation.Hand);
  }

  public get selfBench(): Array<Card> {
    return this.getCards('self', CardLocation.Bench);
  }

  public get oppHand(): Array<Card> {
    return this.getCards('opp', CardLocation.Hand);
  }

  public get oppBench(): Array<Card> {
    return this.getCards('opp', CardLocation.Bench);
  }

  private getCards(user: string, zoneId: string): Array<Card> {
    return this[`${user}${zoneId}`].map(
      (i: number) => this._gameState[`${user}DeckList`][i]
    );
  }
}

export { BoardState, GameState, GameStateHelper };
