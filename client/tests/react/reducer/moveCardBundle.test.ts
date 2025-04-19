import { assert, expect } from 'vitest';
import { reducerTest } from './testData/testContext';
import { BoardState, GameStateDTO } from '../../../src/models';
import actionReducer from '../../../src/react/reducer/actionReducer';

expect.extend({
  toHaveValidBoardStates(received: GameStateDTO) {
    const errorMessages: Array<string> = [];
    const oppBoardState = new BoardState({
      boardState: received.p2.boardState,
      deckList: received.p2.deckList,
    });
    let oppBoardStateError: Error | null = null;
    try {
      oppBoardState.validate();
    } catch (error) {
      oppBoardStateError = error;
      errorMessages.push(`Opp BoardState error: ${oppBoardStateError.message}`);
    }
    const selfBoardState = new BoardState({
      boardState: received.p1.boardState,
      deckList: received.p1.deckList,
    });
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
  assert.sameOrderedMembers(
    setupState.p1.boardState.hand,
    [3, 56, 31, 41, 32, 0, 47]
  );

  const moveToActiveAction = {
    user: 'self',
    emit: true,
    type: 'moveCardBundle',
    parameters: ['self', 'hand', 'active', 5, false, 'move'],
  };

  actionReducer(setupState, moveToActiveAction);

  expect(setupState.p1.boardState.active[0]).toBe(0);
  assert.sameOrderedMembers(
    setupState.p1.boardState.hand,
    [3, 56, 31, 41, 32, 47]
  );

  const activeCards = setupState.p1.boardState.active.map(
    (i) => setupState.p1.deckList[i]
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

  actionReducer(setupState, moveToBenchAction);

  expect(setupState.p1.boardState.active[0]).toBe(0);
  assert.sameOrderedMembers(
    setupState.p1.boardState.hand,
    [56, 31, 41, 32, 47]
  );
  assert.sameOrderedMembers(setupState.p1.boardState.bench, [3]);

  const firstCardInHand =
    setupState.p1.deckList[setupState.p1.boardState.hand[0]];
  const moveHandToActiveAction = {
    user: 'self',
    emit: true,
    type: 'moveCardBundle',
    parameters: ['self', 'hand', 'active', 0, 0, 'move'],
  };
  actionReducer(setupState, moveHandToActiveAction);

  assert.sameOrderedMembers(setupState.p1.boardState.active, [0]);
  assert.sameOrderedMembers(setupState.p1.boardState.bench, [3]);

  const benchedCards = setupState.p1.boardState.bench.map(
    (i) => setupState.p1.deckList[i]
  );
  expect(setupState.p1.boardState.bench.length).toBe(1); // Active moved to bench
  expect(benchedCards[0].name).toBe('Dreepy'); // Active moved to bench

  const activeCardIndex = setupState.p1.boardState.active[0];
  const cardsAttachedToActive = setupState.p1.boardState.attached[
    activeCardIndex
  ].map((i) => setupState.p1.deckList[i]);
  expect(cardsAttachedToActive.length).toBe(1);
  expect(cardsAttachedToActive[0].name).toBe(firstCardInHand.name);

  expect(setupState).toHaveValidBoardStates();
});

reducerTest(
  'move pokemon from hand to active bumps active pokemon',
  ({ setupState }) => {
    assert.sameOrderedMembers(
      setupState.p1.boardState.hand,
      [3, 56, 31, 41, 32, 0, 47]
    );

    const moveToActiveAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'active', 5, false, 'move'],
    };

    actionReducer(setupState, moveToActiveAction);

    expect(setupState.p1.boardState.active[0]).toBe(0);
    assert.sameOrderedMembers(
      setupState.p1.boardState.hand,
      [3, 56, 31, 41, 32, 47]
    );

    let activeCards = setupState.p1.boardState.active.map(
      (i) => setupState.p1.deckList[i]
    );
    expect(activeCards).toBeDefined();
    expect(activeCards.length).toBe(1);
    expect(activeCards[0].name).toBe('Dreepy');

    assert.sameOrderedMembers(
      setupState.p1.boardState.hand,
      [3, 56, 31, 41, 32, 47]
    );
    assert.sameOrderedMembers(setupState.p1.boardState.bench, []);

    const firstCardInHand =
      setupState.p1.deckList[setupState.p1.boardState.hand[0]];
    const moveHandToActiveAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'active', 0, false, 'move'],
    };
    actionReducer(setupState, moveHandToActiveAction);

    assert.sameOrderedMembers(setupState.p1.boardState.active, [3]);
    assert.sameOrderedMembers(setupState.p1.boardState.bench, [0]);

    const benchedCards = setupState.p1.boardState.bench.map(
      (i) => setupState.p1.deckList[i]
    );
    expect(setupState.p1.boardState.bench.length).toBe(1); // Active moved to bench
    expect(benchedCards[0].deckListIndex).toBe(0); // Active moved to bench

    activeCards = setupState.p1.boardState.active.map(
      (i) => setupState.p1.deckList[i]
    );
    expect(activeCards.length).toBe(1);
    expect(activeCards[0].name).toBe(firstCardInHand.name);
    expect(activeCards[0].deckListIndex).toBe(firstCardInHand.deckListIndex);

    expect(setupState).toHaveValidBoardStates();
  }
);

reducerTest(
  'move energy from hand to active does not bump active pokemon',
  ({ setupState }) => {
    assert.sameOrderedMembers(
      setupState.p1.boardState.hand,
      [3, 56, 31, 41, 32, 0, 47]
    );

    const moveToActiveAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'active', 5, false, 'move'],
    };

    actionReducer(setupState, moveToActiveAction);

    expect(setupState.p1.boardState.active[0]).toBe(0);
    assert.sameOrderedMembers(
      setupState.p1.boardState.hand,
      [3, 56, 31, 41, 32, 47]
    );

    const moveHandToActiveAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'active', 1, 0, 'move'],
    };
    actionReducer(setupState, moveHandToActiveAction);

    assert.sameOrderedMembers(setupState.p1.boardState.active, [0]);
    assert.sameMembers(setupState.p1.boardState.attached[0], [56]);

    expect(setupState).toHaveValidBoardStates();
  }
);

reducerTest(
  'move last card in hand to active, card is attached to active',
  ({ setupState }) => {
    const takeTurnAction = {
      user: 'self',
      emit: true,
      type: 'takeTurn',
      parameters: ['self'],
    };
    actionReducer(setupState, takeTurnAction);

    expect(setupState.p1.boardState.hand.length).toBe(8);

    const moveCardToActiveAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'active', 2, false, 'move'],
    };
    actionReducer(setupState, moveCardToActiveAction);

    const moveCardAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'active', 6, 0, 'move'],
    };
    actionReducer(setupState, moveCardAction);

    expect(setupState.p1.boardState.hand.length).toBe(6);
    expect(setupState.p1.boardState.active.length).toBe(1);

    expect(setupState).toHaveValidBoardStates();

    assert.sameOrderedMembers(setupState.p1.boardState.active, [31]);
    assert.sameOrderedMembers(setupState.p1.boardState.attached[31], [16]);
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
    actionReducer(setupState, selfMoveCardFromHandToStadiumAction);

    assert.sameOrderedMembers(
      setupState.p1.boardState.hand,
      [3, 56, 31, 41, 0, 47]
    );
    assert.sameOrderedMembers(setupState.p1.boardState.stadium, [32]);

    const oppMoveCardFromHandToStadiumAction = {
      user: 'opp',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['opp', 'hand', 'stadium', 4, false, 'move'],
    };
    actionReducer(setupState, oppMoveCardFromHandToStadiumAction);

    assert.sameOrderedMembers(
      setupState.p2.boardState.hand,
      [27, 26, 49, 58, 43, 46]
    );
    assert.sameOrderedMembers(setupState.p2.boardState.stadium, [59]);
    assert.sameOrderedMembers(setupState.p1.boardState.stadium, []);
    expect(setupState.p1.boardState.discard[0]).toBe(32);

    expect(setupState).toHaveValidBoardStates();
  }
);

reducerTest(
  'move card from hand to stadium bumps own current stadium',
  ({ setupState }) => {
    reducerTest.todo('not implemented yet');
  }
);
