import { reducerTest } from './testData/testContext';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { expect } from 'vitest';

reducerTest('self board state is reset after reset', ({ setupState }) => {
  const takeTurnAction = {
    user: 'self',
    emit: true,
    type: 'takeTurn',
    parameters: ['self'],
  };
  actionReducer(setupState, takeTurnAction);

  const moveToBenchAction = {
    user: 'self',
    emit: true,
    type: 'moveCardBundle',
    parameters: ['self', 'hand', 'bench', 0, false, 'move'],
  };
  actionReducer(setupState, moveToBenchAction);

  const moveHandToActiveAction = {
    user: 'self',
    emit: true,
    type: 'moveCardBundle',
    parameters: ['self', 'hand', 'active', 0, false, 'move'],
  };
  actionReducer(setupState, moveHandToActiveAction);

  actionReducer(setupState, {
    user: 'self',
    emit: true,
    type: 'VSTARGXFunction',
    parameters: ['vstar'],
  });
  expect(setupState.p1.boardState.deck.length).toBe(46);
  expect(setupState.p1.boardState.bench.length).toBe(1);
  expect(setupState.p1.boardState.active.length).toBe(1);
  expect(setupState.p1.boardState.hand.length).toBe(6);
  expect(setupState.p1.boardState.prize.length).toBe(6);
  expect(setupState.p1.boardState.vstarUsed).toBeTruthy();

  const resetAction = {
    user: 'self',
    emit: true,
    type: 'reset',
    parameters: [false, true, true],
  };
  actionReducer(setupState, resetAction);

  expect(setupState.p1.boardState.deck.length).toBe(60);
  expect(setupState.p1.boardState.bench.length).toBe(0);
  expect(setupState.p1.boardState.active.length).toBe(0);
  expect(setupState.p1.boardState.hand.length).toBe(0);
  expect(setupState.p1.boardState.prize.length).toBe(0);
  expect(setupState.p1.boardState.vstarUsed).toBeFalsy();
});
