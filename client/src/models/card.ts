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

class Card {
  name: string;
  type: string;
  imageUrl: string;

  constructor(name: string, type: string, imageUrl: string) {
    this.name = name;
    this.type = type;
    this.imageUrl = imageUrl;
  }
}

export { Card, CardLocation, CardType };
