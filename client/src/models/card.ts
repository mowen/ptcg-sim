class CardLocation {
  public static Deck: string = 'deck';
  public static Hand: string = 'hand';
  public static Active: string = 'active';
  public static Bench: string = 'bench';
  public static Prize: string = 'prize';
  public static Discard: string = 'discard';
  public static Board: string = 'board';
  public static Lost: string = 'lost';
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

export { Card, CardLocation };
