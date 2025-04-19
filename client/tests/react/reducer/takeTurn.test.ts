import { reducerTest } from './testData/testContext';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { assert, expect } from 'vitest';

reducerTest(
  'top card in self deck is added to the end of the hand',
  ({ setupState }) => {
    const topDeckId = setupState.p1.boardState.deck[0];

    assert.sameOrderedMembers(
      setupState.p1.boardState.hand,
      [3, 56, 31, 41, 32, 0, 47]
    );

    const takeTurnAction = {
      user: 'self',
      emit: true,
      type: 'takeTurn',
      parameters: ['self'],
    };

    actionReducer(setupState, takeTurnAction);

    assert.sameOrderedMembers(setupState.p1.boardState.hand, [
      3,
      56,
      31,
      41,
      32,
      0,
      47,
      topDeckId,
    ]);
    expect(setupState.p1.boardState.deck.length).toBe(46);
  }
);

reducerTest(
  'top card in opp deck is added to the end of the hand',
  ({ setupState }) => {
    const topDeckId = setupState.p2.boardState.deck[0];

    assert.sameOrderedMembers(
      setupState.p2.boardState.hand,
      [27, 26, 49, 58, 59, 43, 46]
    );

    const takeTurnAction = {
      user: 'opp',
      emit: true,
      type: 'takeTurn',
      parameters: ['opp'],
    };

    actionReducer(setupState, takeTurnAction);

    assert.sameOrderedMembers(setupState.p2.boardState.hand, [
      27,
      26,
      49,
      58,
      59,
      43,
      46,
      topDeckId,
    ]);
    expect(setupState.p2.boardState.deck.length).toBe(46);
  }
);

reducerTest('turn count is incremented', ({ setupState }) => {
  expect(setupState.p1.boardState.turn).toBe(0);

  const takeTurnAction = {
    user: 'self',
    emit: true,
    type: 'takeTurn',
    parameters: ['self'],
  };
  actionReducer(setupState, takeTurnAction);

  expect(setupState.p1.boardState.turn).toBe(1);
});
