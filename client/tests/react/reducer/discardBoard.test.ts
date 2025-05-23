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
  actionReducer(setupState, moveFromHandToBoardAction);
  actionReducer(setupState, moveFromHandToBoardAction);
  actionReducer(setupState, moveFromHandToBoardAction);

  assert.sameOrderedMembers(setupState.opp.boardState.board, [27, 26, 49]);

  const discardBoardAction = {
    user: 'opp',
    emit: true,
    type: 'discardBoard',
    parameters: ['opp', true],
  };
  actionReducer(setupState, discardBoardAction);

  expect(setupState.opp.boardState.board.length).toBe(0);
  expect(setupState.opp.boardState.discard.length).toBe(3);
  assert.sameOrderedMembers(setupState.opp.boardState.discard, [27, 26, 49]);
});
