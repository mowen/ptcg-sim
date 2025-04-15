import { BoardStateDTO, Card, CardDTO, CardLocation, PlayerStateDTO } from '.';
import { InvalidBoardStateError, InvalidZoneError } from '../errors';

class BoardState {
  public readonly activeZone: CardZone;
  public readonly handZone: CardZone;
  public readonly benchZone: CardZone;
  public readonly deckZone: CardZone;
  public readonly discardZone: CardZone;
  public readonly boardZone: CardZone;
  public readonly prizeZone: CardZone;
  public readonly lostZoneZone: CardZone;
  public readonly stadiumZone: CardZone;

  constructor(private readonly _playerState: PlayerStateDTO) {
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
    if (totalCardsOnBoard > this._playerState.deckList.length) {
      const duplicateCards = this.duplicateCards();
      throw new InvalidBoardStateError(
        `Total number of cards on board is ${totalCardsOnBoard}, should only be ${
          this._playerState.deckList.length
        }. Duplicate cards: [${duplicateCards
          .map((zc: ZoneCard) => zc.toString())
          .join(',\n')}]`
      );
    } else if (totalCardsOnBoard < this._playerState.deckList.length) {
      const missingCards = this.missingCards();
      throw new InvalidBoardStateError(
        `Total number of cards on board is only ${totalCardsOnBoard}, should be ${
          this._playerState.deckList.length
        }. Missing cards: [${missingCards
          .map((c: Card) => c.toString())
          .join(',\n')}]`
      );
    }
  }

  private totalCardsOnBoard(): number {
    return this.allZoneProps().reduce(
      (acc, zone) => acc + (this[zone] as CardZone).size,
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
      .map((s) => parseInt(s))
      .filter((cardId) => allZoneCardCounts[cardId] > 1);
    return allZoneCards.filter((zc: ZoneCard) =>
      duplicateCardIds.includes(zc.cardId)
    );
  }

  private missingCards(): Array<Card> {
    const allZoneCardIds = this.allZoneCards().map((zc: ZoneCard) => zc.cardId);
    return this._playerState.deckList
      .filter((c: CardDTO) => !allZoneCardIds.includes(c.deckListIndex))
      .map(
        (c) =>
          new Card(
            this._playerState.deckList,
            this._playerState.boardState,
            c.deckListIndex
          )
      );
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

  private zoneFactory(zoneId: CardLocation): CardZone {
    return new CardZone(
      zoneId,
      this._playerState.boardState,
      this._playerState.deckList
    );
  }
}

class ZoneCard {
  constructor(public readonly zoneId: string, private readonly _card: Card) {}

  public get cardId(): number {
    return this._card.id;
  }

  public equals(zoneCard: ZoneCard): boolean {
    return this.cardId == zoneCard.cardId && this.zoneId === zoneCard.zoneId;
  }

  public toString(): string {
    return `{ Zone: ${this.zoneId}, Card: ${this._card.toString()} }`;
  }
}

class CardZone {
  public readonly cards: Array<Card>;
  public readonly id: string;

  constructor(
    public readonly zone: CardLocation,
    private readonly _boardState: BoardStateDTO,
    private readonly _deckList: Array<CardDTO>
  ) {
    this.id = zone;
    this.cards = this.loadCards();

    const duplicateCards = this.duplicateCards();
    if (duplicateCards.length > 0) {
      const errorMessage = `Duplicate cards detected in Zone '${zone}': [${duplicateCards
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
    const allCardCounts = allCardIds.reduce<Record<number, number>>(
      (obj: Record<number, number>, id: number) => {
        if (id in obj) {
          obj[id]++;
        } else {
          obj[id] = 1;
        }
        return obj;
      },
      {}
    );
    const duplicateCardIds = Object.keys(allCardCounts)
      .map((s) => parseInt(s))
      .filter((id: number) => allCardCounts[id] > 1);
    return this.totalCards.filter((c: Card) => duplicateCardIds.includes(c.id));
  }

  private loadCards(): Array<Card> {
    return this._boardState[this.id].map(
      (i: number) => new Card(this._deckList, this._boardState, i)
    );
  }
}

// CardZone is only exported for the tests
export { BoardState, CardZone };
