import { BoardStateDTO, CardDTO, CardType } from './data';

class Card {
  constructor(
    private readonly _deckList: Array<CardDTO>,
    private readonly _boardState: BoardStateDTO,
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
    return this._boardState.damage[this.id] ?? 0;
  }

  public get attached(): Array<Card> {
    const attachedIndexes = this._boardState.attached[this.id] ?? [];
    return attachedIndexes.map(
      (i: number) => new Card(this._deckList, this._boardState, i)
    );
  }

  public get abilityUsed(): boolean {
    return this._boardState.abilityUsed.includes(this.id);
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
    return this._deckList[this.id];
  }
}

export { Card };
