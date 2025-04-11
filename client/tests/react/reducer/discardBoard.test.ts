import { assert, expect } from 'vitest';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { reducerTest } from './testData/testContext';

reducerTest('selfDeckList has 60 cards', ({ setupState }) => {
  const moveFromHandToBoardAction = {
    user: 'opp',
    emit: true,
    type: 'moveCardBundle',
    parameters: ['opp', 'hand', 'board', 0, false, 'move'],
  };
  setupState = actionReducer(setupState, moveFromHandToBoardAction);
  setupState = actionReducer(setupState, moveFromHandToBoardAction);
  setupState = actionReducer(setupState, moveFromHandToBoardAction);

  assert.sameOrderedMembers(setupState.opp.board, [27, 26, 49]);

  const discardBoardAction = {
    user: 'opp',
    emit: true,
    type: 'discardBoard',
    parameters: ['opp', true],
  };
  setupState = actionReducer(setupState, discardBoardAction);

  expect(setupState.opp.board.length).toBe(0);
  expect(setupState.opp.discard.length).toBe(3);
  assert.sameOrderedMembers(setupState.opp.discard, [27, 26, 49]);
});
