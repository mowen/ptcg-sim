import { assert, expect } from 'vitest';
import { reducerTest } from './testData/testContext';
import { BoardState, GameStateDTO } from '../../../src/models';
import actionReducer from '../../../src/react/reducer/actionReducer';

expect.extend({
  toHaveValidBoardStates(received: GameStateDTO) {
    const errorMessages: Array<string> = [];
    const oppBoardState = new BoardState(received.opp, received.oppDeckList);
    let oppBoardStateError: Error | null = null;
    try {
      oppBoardState.validate();
    } catch (error) {
      oppBoardStateError = error;
      errorMessages.push(`Opp BoardState error: ${oppBoardStateError.message}`);
    }
    const selfBoardState = new BoardState(received.self, received.selfDeckList);
    let selfBoardStateError: Error | null = null;
    try {
      selfBoardState.validate();
    } catch (error) {
      selfBoardStateError = error;
      errorMessages.push(
        `Self BoardState error: ${selfBoardStateError.message}`
      );
    }
    const isValid = errorMessages.length == 0;
    return {
      pass: isValid,
      message: () =>
        `GameStateDTO is ${
          !isValid ? 'not' : ''
        } valid.\n\n${errorMessages.join('\n\n')}`,
    };
  },
});

reducerTest('move from hand to active', ({ setupState }) => {
  assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 0, 47]);

  const moveToActiveAction = {
    user: 'self',
    emit: true,
    type: 'moveCardBundle',
    parameters: ['self', 'hand', 'active', 5, false, 'move'],
  };

  setupState = actionReducer(setupState, moveToActiveAction);

  expect(setupState.self.active[0]).toBe(0);
  assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 47]);

  const activeCards = setupState.self.active.map(
    (i) => setupState.selfDeckList[i]
  );
  expect(activeCards).toBeDefined();
  expect(activeCards.length).toBe(1);
  expect(activeCards[0].name).toBe('Dreepy');

  const moveToBenchAction = {
    user: 'self',
    emit: true,
    type: 'moveCardBundle',
    parameters: ['self', 'hand', 'bench', 0, false, 'move'],
  };

  setupState = actionReducer(setupState, moveToBenchAction);

  expect(setupState.self.active[0]).toBe(0);
  assert.sameOrderedMembers(setupState.self.hand, [56, 31, 41, 32, 47]);
  assert.sameOrderedMembers(setupState.self.bench, [3]);

  const firstCardInHand = setupState.selfDeckList[setupState.self.hand[0]];
  const moveHandToActiveAction = {
    user: 'self',
    emit: true,
    type: 'moveCardBundle',
    parameters: ['self', 'hand', 'active', 0, 0, 'move'],
  };
  setupState = actionReducer(setupState, moveHandToActiveAction);

  assert.sameOrderedMembers(setupState.self.active, [0]);
  assert.sameOrderedMembers(setupState.self.bench, [3]);

  const benchedCards = setupState.self.bench.map(
    (i) => setupState.selfDeckList[i]
  );
  expect(setupState.self.bench.length).toBe(1); // Active moved to bench
  expect(benchedCards[0].name).toBe('Dreepy'); // Active moved to bench

  const activeCardIndex = setupState.self.active[0];
  const cardsAttachedToActive = setupState.self.attached[activeCardIndex].map(
    (i) => setupState.selfDeckList[i]
  );
  expect(cardsAttachedToActive.length).toBe(1);
  expect(cardsAttachedToActive[0].name).toBe(firstCardInHand.name);

  expect(setupState).toHaveValidBoardStates();
});

reducerTest(
  'move pokemon from hand to active bumps active pokemon',
  ({ setupState }) => {
    assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 0, 47]);

    const moveToActiveAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'active', 5, false, 'move'],
    };

    setupState = actionReducer(setupState, moveToActiveAction);

    expect(setupState.self.active[0]).toBe(0);
    assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 47]);

    let activeCards = setupState.self.active.map(
      (i) => setupState.selfDeckList[i]
    );
    expect(activeCards).toBeDefined();
    expect(activeCards.length).toBe(1);
    expect(activeCards[0].name).toBe('Dreepy');

    assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 47]);
    assert.sameOrderedMembers(setupState.self.bench, []);

    const firstCardInHand = setupState.selfDeckList[setupState.self.hand[0]];
    const moveHandToActiveAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'active', 0, false, 'move'],
    };
    setupState = actionReducer(setupState, moveHandToActiveAction);

    assert.sameOrderedMembers(setupState.self.active, [3]);
    assert.sameOrderedMembers(setupState.self.bench, [0]);

    const benchedCards = setupState.self.bench.map(
      (i) => setupState.selfDeckList[i]
    );
    expect(setupState.self.bench.length).toBe(1); // Active moved to bench
    expect(benchedCards[0].deckListIndex).toBe(0); // Active moved to bench

    activeCards = setupState.self.active.map((i) => setupState.selfDeckList[i]);
    expect(activeCards.length).toBe(1);
    expect(activeCards[0].name).toBe(firstCardInHand.name);
    expect(activeCards[0].deckListIndex).toBe(firstCardInHand.deckListIndex);

    expect(setupState).toHaveValidBoardStates();
  }
);

reducerTest(
  'move energy from hand to active does not bump active pokemon',
  ({ setupState }) => {
    assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 0, 47]);

    const moveToActiveAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'active', 5, false, 'move'],
    };

    setupState = actionReducer(setupState, moveToActiveAction);

    expect(setupState.self.active[0]).toBe(0);
    assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 47]);

    const moveHandToActiveAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'active', 1, 0, 'move'],
    };
    setupState = actionReducer(setupState, moveHandToActiveAction);

    assert.sameOrderedMembers(setupState.self.active, [0]);
    assert.sameMembers(setupState.self.attached[0], [56]);

    expect(setupState).toHaveValidBoardStates();
  }
);

reducerTest(
  'move last card in hand to active, card is active',
  ({ setupState }) => {
    const takeTurnAction = {
      user: 'self',
      emit: true,
      type: 'takeTurn',
      parameters: ['self'],
    };
    setupState = actionReducer(setupState, takeTurnAction);

    expect(setupState.self.hand.length).toBe(8);

    const moveCardAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'active', 7, 0, 'move'],
    };
    setupState = actionReducer(setupState, moveCardAction);

    expect(setupState.self.hand.length).toBe(7);
    expect(setupState.self.active.length).toBe(1);

    expect(setupState).toHaveValidBoardStates();

    expect(setupState.self.hand.length).toBe(7);
    assert.sameOrderedMembers(setupState.self.active, [16]);
  }
);

reducerTest(
  'move card from hand to stadium bumps opponents current stadium',
  ({ setupState }) => {
    const selfMoveCardFromHandToStadiumAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'stadium', 4, false, 'move'],
    };
    setupState = actionReducer(setupState, selfMoveCardFromHandToStadiumAction);

    assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 0, 47]);
    assert.sameOrderedMembers(setupState.self.stadium, [32]);

    const oppMoveCardFromHandToStadiumAction = {
      user: 'opp',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['opp', 'hand', 'stadium', 4, false, 'move'],
    };
    setupState = actionReducer(setupState, oppMoveCardFromHandToStadiumAction);

    assert.sameOrderedMembers(setupState.opp.hand, [27, 26, 49, 58, 43, 46]);
    assert.sameOrderedMembers(setupState.opp.stadium, [59]);
    assert.sameOrderedMembers(setupState.self.stadium, []);
    expect(setupState.self.discard[0]).toBe(32);

    expect(setupState).toHaveValidBoardStates();
  }
);

reducerTest(
  'move card from hand to stadium bumps own current stadium',
  ({ setupState }) => {
    reducerTest.todo('not implemented yet');
  }
);
