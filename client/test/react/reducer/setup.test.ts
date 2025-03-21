import { assert, describe, expect, test } from 'vitest';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { Action, Card, GameState } from '../../../src/models';
import { reducerTest, selfLoadDeckDataAction } from './testData/testContext';

describe('setup', () => {
  reducerTest('first card in hand is Dreepy', ({ setupState }) => {
    const firstCardId = setupState.self.hand[0];
    const firstCard = setupState.selfDeckList[firstCardId] as Card;

    expect(firstCard.name).toBe('Dreepy');
    expect(firstCardId).toBe(3);
    expect(firstCard.type).toBe('Pokémon');
  });

  reducerTest('last card in deck is Drakloak', ({ setupState }) => {
    const lastCardId = setupState.self.deck[setupState.self.deck.length - 1];
    const lastCard = setupState.selfDeckList[lastCardId] as Card;
    expect(lastCard.name).toBe('Drakloak');
    expect(lastCardId).toBe(4);
    expect(lastCard.type).toBe('Pokémon');
  });
});
