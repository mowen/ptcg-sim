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
  setupState = actionReducer(setupState, takeTurnAction);

  const moveToBenchAction = {
    user: 'self',
    emit: true,
    type: 'moveCardBundle',
    parameters: ['self', 'hand', 'bench', 0, false, 'move'],
  };
  setupState = actionReducer(setupState, moveToBenchAction);

  const moveHandToActiveAction = {
    user: 'self',
    emit: true,
    type: 'moveCardBundle',
    parameters: ['self', 'hand', 'active', 0, false, 'move'],
  };
  setupState = actionReducer(setupState, moveHandToActiveAction);

  setupState = actionReducer(setupState, {
    user: 'self',
    emit: true,
    type: 'VSTARGXFunction',
    parameters: ['vstar'],
  });
  expect(setupState.self.deck.length).toBe(46);
  expect(setupState.self.bench.length).toBe(1);
  expect(setupState.self.active.length).toBe(1);
  expect(setupState.self.hand.length).toBe(6);
  expect(setupState.self.prize.length).toBe(6);
  expect(setupState.self.vstarUsed).toBeTruthy();

  const resetAction = {
    user: 'self',
    emit: true,
    type: 'reset',
    parameters: [false, true, true],
  };
  setupState = actionReducer(setupState, resetAction);

  expect(setupState.self.deck.length).toBe(60);
  expect(setupState.self.bench.length).toBe(0);
  expect(setupState.self.active.length).toBe(0);
  expect(setupState.self.hand.length).toBe(0);
  expect(setupState.self.prize.length).toBe(0);
  expect(setupState.self.vstarUsed).toBeFalsy();
});
