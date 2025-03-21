import { assert, expect } from 'vitest';
import { Action } from '../../../src/models';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { reducerTest } from './testData/testContext';

reducerTest('selfDeckList has 60 cards', ({ setupState }) => {
  const moveFromHandToBoardAction = new Action('opp', true, 'moveCardBundle', [
    'opp',
    'hand',
    'board',
    0,
    false,
    'move',
  ]);
  setupState = actionReducer(setupState, moveFromHandToBoardAction);
  setupState = actionReducer(setupState, moveFromHandToBoardAction);
  setupState = actionReducer(setupState, moveFromHandToBoardAction);

  assert.sameOrderedMembers(setupState.opp.board, [49, 26, 27]);

  const discardBoardAction = new Action('opp', true, 'discardBoard', [
    'opp',
    true,
  ]);
  setupState = actionReducer(setupState, discardBoardAction);

  expect(setupState.opp.board.length).toBe(0);
  expect(setupState.opp.discard.length).toBe(3);
  assert.sameOrderedMembers(setupState.opp.discard, [49, 26, 27]);
});
