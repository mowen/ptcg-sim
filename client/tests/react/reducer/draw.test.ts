import { assert, expect } from 'vitest';
import { Action } from '../../../src/models';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { reducerTest } from './testData/testContext';

reducerTest('draw 4 adds 4 cards to the hand', ({ setupState }) => {
  assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 0, 47]);
  assert.sameOrderedMembers(setupState.self.deck.slice(0, 4), [16, 52, 36, 57]);
  assert.sameOrderedMembers(setupState.self.deck.slice(4, 8), [15, 53, 38, 10]);

  const drawAction = new Action('self', true, 'draw', ['self', 4]);
  setupState = actionReducer(setupState, drawAction);

  assert.sameOrderedMembers(
    setupState.self.hand,
    [3, 56, 31, 41, 32, 0, 47, 16, 52, 36, 57]
  );
  assert.sameOrderedMembers(setupState.self.deck.slice(0, 4), [15, 53, 38, 10]);
});
