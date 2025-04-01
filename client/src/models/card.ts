class CardLocation {
  public static readonly Deck: string = 'deck';
  public static readonly Hand: string = 'hand';
  public static readonly Active: string = 'active';
  public static readonly Bench: string = 'bench';
  public static readonly Prize: string = 'prize';
  public static readonly Discard: string = 'discard';
  public static readonly Board: string = 'board';
  public static readonly LostZone: string = 'lostZone';
  public static readonly Stadium: string = 'stadium';
}

class CardType {
  public static readonly Pokemon: string = 'Pokémon';
  public static readonly Trainer: string = 'Trainer';
  public static readonly Energy: string = 'Energy';
}

class CardDTO {
  constructor(
    public readonly deckListIndex: number,
    public readonly name: string,
    public readonly type: string,
    public readonly imageUrl: string
  ) {}

  public get isPokemon(): boolean {
    return this.type === CardType.Pokemon;
  }

  public get isTrainer(): boolean {
    return this.type === CardType.Trainer;
  }

  public get isEnergy(): boolean {
    return this.type === CardType.Energy;
  }
}

export { CardDTO, CardLocation, CardType };
