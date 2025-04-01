import { Action } from '../../../src/models';
import { reducerTest } from './testData/testContext';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { assert, expect } from 'vitest';

reducerTest(
  'top card in self deck is added to the end of the hand',
  ({ setupState }) => {
    const topDeckId = setupState.self.deck[0];

    assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 0, 47]);

    const takeTurnAction = new Action('self', true, 'takeTurn', ['self']);

    setupState = actionReducer(setupState, takeTurnAction);

    assert.sameOrderedMembers(setupState.self.hand, [
      3,
      56,
      31,
      41,
      32,
      0,
      47,
      topDeckId,
    ]);
    expect(setupState.self.deck.length).toBe(46);
  }
);

reducerTest(
  'top card in opp deck is added to the end of the hand',
  ({ setupState }) => {
    const topDeckId = setupState.opp.deck[0];

    assert.sameOrderedMembers(
      setupState.opp.hand,
      [27, 26, 49, 58, 59, 43, 46]
    );

    const takeTurnAction = new Action('opp', true, 'takeTurn', ['opp']);

    setupState = actionReducer(setupState, takeTurnAction);

    assert.sameOrderedMembers(setupState.opp.hand, [
      27,
      26,
      49,
      58,
      59,
      43,
      46,
      topDeckId,
    ]);
    expect(setupState.opp.deck.length).toBe(46);
  }
);

reducerTest('turn count is incremented', ({ setupState }) => {
  expect(setupState.turn).toBe(0);

  const takeTurnAction = new Action('self', true, 'takeTurn', ['self']);
  setupState = actionReducer(setupState, takeTurnAction);

  expect(setupState.turn).toBe(1);
});
