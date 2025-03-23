import { Card, CardLocation } from './card';

class BoardStateDTO {
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

class BoardState {
  constructor(
    private readonly _board: BoardStateDTO,
    private readonly _deckList: Array<Card>
  ) {}

  public get active(): Array<Card> {
    return this.getCards(CardLocation.Active);
  }

  public get hand(): Array<Card> {
    return this.getCards(CardLocation.Hand);
  }

  public get bench(): Array<Card> {
    return this.getCards(CardLocation.Bench);
  }

  public get deck(): Array<Card> {
    return this.getCards(CardLocation.Deck);
  }

  public get discard(): Array<Card> {
    return this.getCards(CardLocation.Discard);
  }

  public get board(): Array<Card> {
    return this.getCards(CardLocation.Board);
  }

  public get prize(): Array<Card> {
    return this.getCards(CardLocation.Prize);
  }

  public get lostZone(): Array<Card> {
    return this.getCards(CardLocation.LostZone);
  }

  public get stadium(): Array<Card> {
    return this.getCards(CardLocation.Stadium);
  }

  private getCards(zoneId: string): Array<Card> {
    return this._board[zoneId].map((i: number) => this._deckList[i]);
  }
}

export { BoardState, BoardStateDTO };
