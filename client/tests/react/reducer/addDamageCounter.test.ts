import { reducerTest } from './testData/testContext';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { expect } from 'vitest';

reducerTest(
  'add 30 damage to first card in hand, first card in hand has 30 damage',
  ({ setupState }) => {
    const addDamageCounterAction = {
      user: 'opp',
      emit: true,
      type: 'addDamageCounter',
      parameters: ['hand', 0, '30'],
    };

    actionReducer(setupState, addDamageCounterAction);

    const firstCardInHandIndex = setupState.p2.boardState.hand[0];
    expect(setupState.p2.boardState.damage[firstCardInHandIndex]).toBe(30);
  }
);
