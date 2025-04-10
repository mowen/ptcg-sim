import { InvalidBoardStateError } from '../errors/invalidBoardStateError';
import { InvalidZoneError } from '../errors/invalidZoneError';
import { CardDTO, CardLocation, Card } from './card';

class Zone {
  public readonly cards: Array<Card>;

  constructor(
    public readonly id: string,
    private readonly _boardState: BoardStateDTO,
    private readonly _deckList: Array<CardDTO>
  ) {
    this.cards = this.loadCards();

    const duplicateCards = this.duplicateCards();
    if (duplicateCards.length > 0) {
      const errorMessage = `Duplicate cards detected: [${duplicateCards
        .map((c) => c.toString())
        .join(', ')}]`;
      throw new InvalidZoneError(errorMessage);
    }
  }

  public get size(): number {
    return this.totalCards.length;
  }

  public get totalCards(): Array<Card> {
    return this.cards.map((c) => [c, c.attached]).flat(2);
  }

  private duplicateCards(): Array<Card> {
    const allCardIds = this.totalCards.map((c) => c.id);
    const allCardIdsSet = new Set(allCardIds);
    // TODO: Look into Set.difference() to potentially simplify this method
    const duplicateIds = allCardIds.filter((id) => !allCardIdsSet.has(id));
    return this.cards.filter((c) => duplicateIds.includes(c.id));
  }

  private loadCards(): Array<Card> {
    return this._boardState[this.id].map(
      (i: number) => new Card(this._deckList, this._boardState, i)
    );
  }
}

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
  public attached: Record<number, Array<number>> = {};
  public damage: Record<number, number> = {};
  public abilityUsed: Array<number> = new Array<number>();
}

class ZoneCard {
  constructor(public readonly zoneId: string, private readonly _card: Card) {}

  public get cardId(): number {
    return this._card.id;
  }

  // public equals(zoneCard: ZoneCard): boolean {
  //   return this.zoneId === zoneCard.zoneId && this._card.id == zoneCard.cardId;
  // }

  public toString(): string {
    return `{ Zone: ${this.zoneId}, Card: ${this._card.toString()} }`;
  }
}

class BoardState {
  public readonly activeZone: Zone;
  public readonly handZone: Zone;
  public readonly benchZone: Zone;
  public readonly deckZone: Zone;
  public readonly discardZone: Zone;
  public readonly boardZone: Zone;
  public readonly prizeZone: Zone;
  public readonly lostZoneZone: Zone;
  public readonly stadiumZone: Zone;

  private _deckSize: number = 60;

  constructor(
    private readonly _boardState: BoardStateDTO,
    private readonly _deckList: Array<CardDTO>
  ) {
    this.activeZone = this.zoneFactory(CardLocation.Active);
    this.handZone = this.zoneFactory(CardLocation.Hand);
    this.benchZone = this.zoneFactory(CardLocation.Bench);
    this.deckZone = this.zoneFactory(CardLocation.Deck);
    this.discardZone = this.zoneFactory(CardLocation.Discard);
    this.boardZone = this.zoneFactory(CardLocation.Board);
    this.prizeZone = this.zoneFactory(CardLocation.Prize);
    this.lostZoneZone = this.zoneFactory(CardLocation.LostZone);
    this.stadiumZone = this.zoneFactory(CardLocation.Stadium);
  }

  public get active(): Array<Card> {
    return this.activeZone.cards;
  }

  public get hand(): Array<Card> {
    return this.handZone.cards;
  }

  public get bench(): Array<Card> {
    return this.benchZone.cards;
  }

  public get deck(): Array<Card> {
    return this.deckZone.cards;
  }

  public get discard(): Array<Card> {
    return this.discardZone.cards;
  }

  public get board(): Array<Card> {
    return this.boardZone.cards;
  }

  public get prize(): Array<Card> {
    return this.prizeZone.cards;
  }

  public get lostZone(): Array<Card> {
    return this.lostZoneZone.cards;
  }

  public get stadium(): Array<Card> {
    return this.stadiumZone.cards;
  }

  // TODO: call this from constructor to enforce a valid state. Not possible currently as
  // it's used by the actionReducer so can be created in an invalid state.
  public validate(): void {
    const totalCardsOnBoard = this.totalCardsOnBoard();
    if (totalCardsOnBoard > this._deckSize) {
      const duplicateCards = this.duplicateCards();
      throw new InvalidBoardStateError(
        `Total number of cards on board is ${totalCardsOnBoard}, should only be ${
          this._deckSize
        }. Duplicate cards: [${duplicateCards
          .map((zc: ZoneCard) => zc.toString())
          .join(',\n')}]`
      );
    } else if (totalCardsOnBoard < this._deckSize) {
      const missingCards = this.missingCards();
      throw new InvalidBoardStateError(
        `Total number of cards on board is only ${totalCardsOnBoard}, should be ${
          this._deckSize
        }. Missing cards: [${missingCards
          .map((c: Card) => c.toString())
          .join(',\n')}]`
      );
    }
  }

  private totalCardsOnBoard(): number {
    return this.allZoneProps().reduce(
      (acc, zone) => acc + (this[zone] as Zone).size,
      0
    );
  }

  private duplicateCards(): Array<ZoneCard> {
    const allZoneCards = this.allZoneCards();
    const allZoneCardCounts = allZoneCards.reduce<Record<number, number>>(
      (obj: Record<number, number>, zc: ZoneCard) => {
        if (zc.cardId in obj) {
          obj[zc.cardId]++;
        } else {
          obj[zc.cardId] = 1;
        }
        return obj;
      },
      {}
    );
    const duplicateCardIds = Object.keys(allZoneCardCounts)
      .map(parseInt)
      .filter((cardId) => allZoneCardCounts[cardId] > 1);
    return allZoneCards.filter((zc: ZoneCard) =>
      duplicateCardIds.includes(zc.cardId)
    );
    // const allCardIdsSet = new Set<number>(
    //   allZoneCards.map((zc: ZoneCard) => zc.cardId)
    // );
    // const duplicateCards = allZoneCards.filter(
    //   (zc: ZoneCard) => !allCardIdsSet.has(zc.cardId)
    // );
    // console.debug(
    //   `duplicateCards state`,
    //   allZoneCards.map((zc) => zc.toString()),
    //   allCardIdsSet,
    //   duplicateCards
    // );
    // return duplicateCards;
  }

  private missingCards(): Array<Card> {
    const allZoneCardIds = this.allZoneCards().map((zc: ZoneCard) => zc.cardId);
    return this._deckList
      .filter((c: CardDTO) => !allZoneCardIds.includes(c.deckListIndex))
      .map((c) => new Card(this._deckList, this._boardState, c.deckListIndex));
  }

  private allZoneCards(): Array<ZoneCard> {
    return this.allZoneProps()
      .map(
        (zone: string): ZoneCard =>
          this[zone].totalCards.map(
            (c: Card) => new ZoneCard(this.zonePropToId(zone), c)
          )
      )
      .flat(1);
  }

  private zonePropToId(zoneProp: string): string {
    return zoneProp.substring(0, zoneProp.length - 4);
  }

  private allZoneProps(): Array<string> {
    return Object.keys(this).filter((k) => k.endsWith(`Zone`));
  }

  private zoneFactory(zoneId: string): Zone {
    return new Zone(zoneId, this._boardState, this._deckList);
  }
}

export { BoardState, BoardStateDTO };
