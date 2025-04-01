import { Action } from '../../../src/models';
import { reducerTest } from './testData/testContext';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { expect } from 'vitest';

reducerTest(
  'add 30 damage to first card in hand, first card in hand has 30 damage',
  ({ setupState }) => {
    const addDamageCounterAction = new Action('opp', true, 'addDamageCounter', [
      'hand',
      0,
      '30',
    ]);

    setupState = actionReducer(setupState, addDamageCounterAction);

    const firstCardInHandIndex = setupState.opp.hand[0];
    expect(setupState.opp.damage[firstCardInHandIndex]).toBe(30);
  }
);
