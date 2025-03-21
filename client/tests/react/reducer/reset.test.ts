import { Action } from '../../../src/models';
import { reducerTest } from './testData/testContext';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { expect } from 'vitest';

reducerTest('self board state is reset after reset', ({ setupState }) => {
  const takeTurnAction = new Action('self', true, 'takeTurn', ['self']);
  setupState = actionReducer(setupState, takeTurnAction);

  const moveToBenchAction = new Action('self', true, 'moveCardBundle', [
    'self',
    'hand',
    'bench',
    0,
    false,
    'move',
  ]);
  setupState = actionReducer(setupState, moveToBenchAction);

  const moveHandToActiveAction = new Action('self', true, 'moveCardBundle', [
    'self',
    'hand',
    'active',
    0,
    0,
    'move',
  ]);
  setupState = actionReducer(setupState, moveHandToActiveAction);

  setupState = actionReducer(
    setupState,
    new Action('self', true, 'VSTARGXFunction', ['vstar'])
  );
  expect(setupState.self.deck.length).toBe(46);
  expect(setupState.self.bench.length).toBe(1);
  expect(setupState.self.active.length).toBe(1);
  expect(setupState.self.hand.length).toBe(6);
  expect(setupState.self.prize.length).toBe(6);
  expect(setupState.self.vstarUsed).toBeTruthy();

  const resetAction = new Action('self', true, 'reset', [false, true, true]);
  setupState = actionReducer(setupState, resetAction);

  expect(setupState.self.deck.length).toBe(60);
  expect(setupState.self.bench.length).toBe(0);
  expect(setupState.self.active.length).toBe(0);
  expect(setupState.self.hand.length).toBe(0);
  expect(setupState.self.prize.length).toBe(0);
  expect(setupState.self.vstarUsed).toBeFalsy();
});
