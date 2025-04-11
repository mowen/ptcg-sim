import { reducerTest } from './testData/testContext';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { expect } from 'vitest';

reducerTest(
  'add 30 damage to first card in hand, then remove damage, first card in hand has no damage',
  ({ setupState }) => {
    const addDamageCounterAction = {
      user: 'opp',
      emit: true,
      type: 'addDamageCounter',
      parameters: ['hand', 0, '30'],
    };
    setupState = actionReducer(setupState, addDamageCounterAction);

    const removeDamageCounterAction = {
      user: 'opp',
      emit: true,
      type: 'removeDamageCounter',
      parameters: ['hand', 0],
    };
    setupState = actionReducer(setupState, removeDamageCounterAction);

    const firstCardInHandIndex = setupState.opp.hand[0];
    expect(setupState.opp.damage[firstCardInHandIndex]).toBeUndefined();
  }
);
