import { Action } from '../../../src/models';
import { reducerTest } from './testData/testContext';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { expect } from 'vitest';

reducerTest(
  'add 30 damage to first card in hand, then remove damage, first card in hand has no damage',
  ({ setupState }) => {
    const addDamageCounterAction = new Action('opp', true, 'addDamageCounter', [
      'hand',
      0,
      '30',
    ]);
    setupState = actionReducer(setupState, addDamageCounterAction);

    const removeDamageCounterAction = new Action(
      'opp',
      true,
      'removeDamageCounter',
      ['hand', 0]
    );
    setupState = actionReducer(setupState, removeDamageCounterAction);

    const firstCardInHandIndex = setupState.opp.hand[0];
    expect(setupState.opp.damage[firstCardInHandIndex]).toBeUndefined();
  }
);
