enum CardLocation {
  Deck = 'deck',
  Hand = 'hand',
  Active = 'active',
  Bench = 'bench',
  Prize = 'prize',
  Discard = 'discard',
  Board = 'board',
  LostZone = 'lostZone',
  Stadium = 'stadium',
}

enum CardType {
  Pokemon = 'Pokémon',
  Trainer = 'Trainer',
  Energy = 'Energy',
}

class CardDTO {
  constructor(
    public readonly deckListIndex: number,
    public readonly name: string,
    public readonly type: string,
    public readonly imageUrl: string
  ) {}
}

export { CardDTO, CardLocation, CardType };
