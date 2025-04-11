import { describe, expect } from 'vitest';
import { CardDTO } from '../../../src/models';
import { reducerTest } from './testData/testContext';

describe('setup', () => {
  reducerTest('first card in hand is Dreepy', ({ setupState }) => {
    const firstCardId = setupState.p1.boardState.hand[0];
    const firstCard = setupState.p1.deckList[firstCardId] as CardDTO;

    expect(firstCard.name).toBe('Dreepy');
    expect(firstCardId).toBe(3);
    expect(firstCard.type).toBe('Pokémon');
  });

  reducerTest('last card in deck is Drakloak', ({ setupState }) => {
    const lastCardId =
      setupState.p1.boardState.deck[setupState.p1.boardState.deck.length - 1];
    const lastCard = setupState.p1.deckList[lastCardId] as CardDTO;
    expect(lastCard.name).toBe('Drakloak');
    expect(lastCardId).toBe(4);
    expect(lastCard.type).toBe('Pokémon');
  });
});
