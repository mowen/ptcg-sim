import { assert, expect } from 'vitest';
import { reducerTest } from './testData/testContext';
import { Action } from '../../../src/models';
import actionReducer from '../../../src/react/reducer/actionReducer';

reducerTest('move from hand to active', ({ setupState }) => {
  assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 0, 47]);

  const moveToActiveAction = new Action('self', true, 'moveCardBundle', [
    'self',
    'hand',
    'active',
    5,
    false,
    'move',
  ]);

  setupState = actionReducer(setupState, moveToActiveAction);

  expect(setupState.self.active[0]).toBe(0);
  assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 47]);

  let activeCards = setupState.self.active.map(
    (i) => setupState.selfDeckList[i]
  );
  expect(activeCards).toBeDefined();
  expect(activeCards.length).toBe(1);
  expect(activeCards[0].name).toBe('Dreepy');

  const moveToBenchAction = new Action('self', true, 'moveCardBundle', [
    'self',
    'hand',
    'bench',
    0,
    false,
    'move',
  ]);

  setupState = actionReducer(setupState, moveToBenchAction);

  expect(setupState.self.active[0]).toBe(0);
  assert.sameOrderedMembers(setupState.self.hand, [56, 31, 41, 32, 47]);
  assert.sameOrderedMembers(setupState.self.bench, [3]);

  const firstCardInHand = setupState.selfDeckList[setupState.self.hand[0]];
  const moveHandToActiveAction = new Action('self', true, 'moveCardBundle', [
    'self',
    'hand',
    'active',
    0,
    0,
    'move',
  ]);
  setupState = actionReducer(setupState, moveHandToActiveAction);

  assert.sameOrderedMembers(setupState.self.active, [56, 0]);
  assert.sameOrderedMembers(setupState.self.bench, [3]);

  const benchedCards = setupState.self.bench.map(
    (i) => setupState.selfDeckList[i]
  );
  expect(setupState.self.bench.length).toBe(1); // Active moved to bench
  expect(benchedCards[0].name).toBe('Dreepy'); // Active moved to bench

  activeCards = setupState.self.active.map((i) => setupState.selfDeckList[i]);
  expect(activeCards.length).toBe(2);
  expect(activeCards[0].name).toBe(firstCardInHand.name);
});

reducerTest(
  'move card from hand to stadium bumps opponents current stadium',
  ({ setupState }) => {
    const selfMoveCardFromHandToStadiumAction = new Action(
      'self',
      true,
      'moveCardBundle',
      ['self', 'hand', 'stadium', 4, false, 'move']
    );
    setupState = actionReducer(setupState, selfMoveCardFromHandToStadiumAction);

    assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 0, 47]);
    assert.sameOrderedMembers(setupState.self.stadium, [32]);

    const oppMoveCardFromHandToStadiumAction = new Action(
      'opp',
      true,
      'moveCardBundle',
      ['opp', 'hand', 'stadium', 4, false, 'move']
    );
    setupState = actionReducer(setupState, oppMoveCardFromHandToStadiumAction);

    assert.sameOrderedMembers(setupState.opp.hand, [27, 26, 49, 58, 43, 46]);
    assert.sameOrderedMembers(setupState.opp.stadium, [59]);
    assert.sameOrderedMembers(setupState.self.stadium, []);
    expect(setupState.self.discard[0]).toBe(32);
  }
);

reducerTest(
  'move card from hand to stadium bumps own current stadium',
  ({ setupState }) => {
    reducerTest.todo('not implemented yet');
  }
);
