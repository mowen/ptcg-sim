import { CardDTO, CardType, PlayerStateDTO } from './data';

class Card {
  constructor(
    private _playerState: PlayerStateDTO,
    public readonly id: number
  ) {}

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

  public toString(): string {
    let s = `${this._cardData.name} [${this.id}] (${this.type})`;

    if (this.attached.length > 0) {
      const attachments = this.attached.map((c) => c.toString()).join('\n  ');
      s += ` attached: [\n  ${attachments}\n]`;
    }

    return s;
  }

  private get _cardData(): CardDTO {
    return this._playerState.deckList[this.id];
  }
}

export { Card };
