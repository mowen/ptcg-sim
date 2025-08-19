import { MissingCardError } from "../errors";
import { CardDTO, CardLocation, CardType, PlayerStateDTO } from "./data";

enum SpecialCondition {
  Poisoned = "P",
  Burned = "B",
  Asleep = "A",
  Paralyzed = "PA",
  Confused = "C",
}

class Card {
  public readonly zoneId: CardLocation;
  public readonly zoneIndex: number;

  constructor(
    private _playerState: PlayerStateDTO,
    public readonly id: number,
  ) {
    this.zoneId = this.getCardLocation(this.id);
    this.zoneIndex = this._playerState.boardState[
      this.zoneId.valueOf()
    ].indexOf(this.id);
  }

  private getCardLocation(cardId: number): CardLocation {
    const cardLocation = Object.values(CardLocation).find((zId) =>
      this._playerState.boardState[zId].includes(cardId),
    );
    if (cardLocation === undefined) {
      const attachedCardId = Object.keys(
        this._playerState.boardState.attached,
      ).find((cId) =>
        this._playerState.boardState.attached[parseInt(cId)].includes(cardId),
      );
      if (attachedCardId === undefined) {
        throw new MissingCardError(
          `Card ID ${this.id} was not found in any zones`,
        );
      } else {
        // I don't like recursion but this should only go one level
        // down - to the parent card
        return this.getCardLocation(parseInt(attachedCardId));
      }
    } else {
      return cardLocation as CardLocation;
    }
  }

  public get name(): string {
    return this._cardData.name;
  }

  public get imageUrl(): string {
    return this._cardData.imageUrl;
  }

  public get type(): string {
    return this._cardData.type;
  }

  public get damage(): number {
    return this._playerState.boardState.damage[this.id] ?? 0;
  }

  public get tool(): Card | null {
    if (this.attached.length == 0) {
      return null;
    } else {
      const attachedTrainers = this.attached.filter((c) => c.isTrainer);
      return attachedTrainers ? attachedTrainers[0] : null;
    }
  }

  public get energy(): Array<Card> {
    if (this.attached.length == 0) {
      return new Array<Card>();
    } else {
      return this.attached.filter((c) => c.isEnergy);
    }
  }

  public get evolutions(): Array<Card> {
    if (this.attached.length == 0) {
      return new Array<Card>();
    } else {
      return this.attached.filter((c) => c.isPokemon);
    }
  }

  public get attached(): Array<Card> {
    const attachedIndexes =
      this._playerState.boardState.attached[this.id] ?? [];
    return attachedIndexes.map((i: number) => new Card(this._playerState, i));
  }

  public get abilityUsed(): boolean {
    return this._playerState.boardState.abilityUsed.includes(this.id);
  }

  public get isPokemon(): boolean {
    return this._cardData.type === CardType.Pokemon;
  }

  public get isTrainer(): boolean {
    return this._cardData.type === CardType.Trainer;
  }

  public get isEnergy(): boolean {
    return this._cardData.type === CardType.Energy;
  }

  public get isPoisoned(): boolean {
    return (
      !!this.specialCondition &&
      this.specialCondition === SpecialCondition.Poisoned
    );
  }

  public get isBurned(): boolean {
    return (
      !!this.specialCondition &&
      this.specialCondition === SpecialCondition.Burned
    );
  }

  public get isParalyzed(): boolean {
    return (
      !!this.specialCondition &&
      this.specialCondition === SpecialCondition.Paralyzed
    );
  }

  public get isConfused(): boolean {
    return (
      !!this.specialCondition &&
      this.specialCondition === SpecialCondition.Confused
    );
  }

  public get isAsleep(): boolean {
    return (
      !!this.specialCondition &&
      this.specialCondition === SpecialCondition.Asleep
    );
  }

  private get specialCondition(): SpecialCondition | undefined {
    return this._playerState.boardState.specialCondition[
      this.id
    ] as SpecialCondition;
  }

  public getZoneIndex(zoneId: string): number {
    const zoneArray = this._playerState.boardState[zoneId] as Array<number>;
    const zoneIndex = zoneArray.indexOf(this.id);
    if (zoneIndex < 0) {
      throw new MissingCardError(`Card ID ${this.id} not found in zoneId`);
    }
    return zoneIndex;
  }

  public toString(): string {
    let s = `${this._cardData.name} [${this.id}] (${this.type})`;

    if (this.attached.length > 0) {
      const attachments = this.attached.map((c) => c.toString()).join("\n  ");
      s += ` attached: [\n  ${attachments}\n]`;
    }

    return s;
  }

  /**
   * Returns the index of a card within the attached array for this Card.
   * Used for generating the moveCardBundle Action.
   *
   * @param card - The Card we want to find the index of
   * @returns The index of `card` within the attached array of this Card
   */
  public attachedIndexOf(card: Card): number | null {
    const attachedIndexes =
      this._playerState.boardState.attached[this.id] ?? [];
    const indexOf = attachedIndexes.indexOf(card.id);
    return indexOf < 0 ? null : indexOf;
  }

  private get _cardData(): CardDTO {
    return this._playerState.deckList[this.id];
  }
}

export { Card };
