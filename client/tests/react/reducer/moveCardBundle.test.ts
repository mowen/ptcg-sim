import { assert, expect } from "vitest";
import { reducerTest } from "./testData/testContext";
import { BoardState, GameStateDTO, PlayerStateDTO } from "../../../src/models";
import actionReducer from "../../../src/react/reducer/actionReducer";

expect.extend({
  toHaveValidBoardStates(received: GameStateDTO) {
    const errorMessages: Array<string> = [];
    let oppBoardStateError: Error | null = null;
    try {
      new BoardState({
        boardState: received.opp.boardState,
        deckList: received.opp.deckList,
      } as PlayerStateDTO);
    } catch (error) {
      oppBoardStateError = error;
      errorMessages.push(`Opp BoardState error: ${oppBoardStateError.message}`);
    }
    let selfBoardStateError: Error | null = null;
    try {
      new BoardState({
        boardState: received.self.boardState,
        deckList: received.self.deckList,
      } as PlayerStateDTO);
    } catch (error) {
      selfBoardStateError = error;
      errorMessages.push(
        `Self BoardState error: ${selfBoardStateError.message}`,
      );
    }
    const isValid = errorMessages.length == 0;
    return {
      pass: isValid,
      message: () =>
        `GameStateDTO is ${
          !isValid ? "not" : ""
        } valid.\n\n${errorMessages.join("\n\n")}`,
    };
  },
});

reducerTest("move from hand to active", ({ setupState }) => {
  assert.sameOrderedMembers(
    setupState.self.boardState.hand,
    [3, 56, 31, 41, 32, 0, 47],
  );

  const moveToActiveAction = {
    user: "self",
    emit: true,
    type: "moveCardBundle",
    parameters: ["self", "hand", "active", 5, false, "move"],
  };

  actionReducer(setupState, moveToActiveAction);

  expect(setupState.self.boardState.active[0]).toBe(0);
  assert.sameOrderedMembers(
    setupState.self.boardState.hand,
    [3, 56, 31, 41, 32, 47],
  );

  const activeCards = setupState.self.boardState.active.map(
    (i) => setupState.self.deckList[i],
  );
  expect(activeCards).toBeDefined();
  expect(activeCards.length).toBe(1);
  expect(activeCards[0].name).toBe("Dreepy");

  const moveToBenchAction = {
    user: "self",
    emit: true,
    type: "moveCardBundle",
    parameters: ["self", "hand", "bench", 0, false, "move"],
  };

  actionReducer(setupState, moveToBenchAction);

  expect(setupState.self.boardState.active[0]).toBe(0);
  assert.sameOrderedMembers(
    setupState.self.boardState.hand,
    [56, 31, 41, 32, 47],
  );
  assert.sameOrderedMembers(setupState.self.boardState.bench, [3]);

  const firstCardInHand =
    setupState.self.deckList[setupState.self.boardState.hand[0]];
  const moveHandToActiveAction = {
    user: "self",
    emit: true,
    type: "moveCardBundle",
    parameters: ["self", "hand", "active", 0, 0, "move"],
  };
  actionReducer(setupState, moveHandToActiveAction);

  assert.sameOrderedMembers(setupState.self.boardState.active, [0]);
  assert.sameOrderedMembers(setupState.self.boardState.bench, [3]);

  const benchedCards = setupState.self.boardState.bench.map(
    (i) => setupState.self.deckList[i],
  );
  expect(setupState.self.boardState.bench.length).toBe(1); // Active moved to bench
  expect(benchedCards[0].name).toBe("Dreepy"); // Active moved to bench

  const activeCardIndex = setupState.self.boardState.active[0];
  const cardsAttachedToActive = setupState.self.boardState.attached[
    activeCardIndex
  ].map((i) => setupState.self.deckList[i]);
  expect(cardsAttachedToActive.length).toBe(1);
  expect(cardsAttachedToActive[0].name).toBe(firstCardInHand.name);

  expect(setupState).toHaveValidBoardStates();
});

reducerTest(
  "move pokemon from hand to active bumps active pokemon",
  ({ setupState }) => {
    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [3, 56, 31, 41, 32, 0, 47],
    );

    const moveToActiveAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 5, false, "move"],
    };

    actionReducer(setupState, moveToActiveAction);

    expect(setupState.self.boardState.active[0]).toBe(0);
    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [3, 56, 31, 41, 32, 47],
    );

    let activeCards = setupState.self.boardState.active.map(
      (i) => setupState.self.deckList[i],
    );
    expect(activeCards).toBeDefined();
    expect(activeCards.length).toBe(1);
    expect(activeCards[0].name).toBe("Dreepy");

    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [3, 56, 31, 41, 32, 47],
    );
    assert.sameOrderedMembers(setupState.self.boardState.bench, []);

    const firstCardInHand =
      setupState.self.deckList[setupState.self.boardState.hand[0]];
    const moveHandToActiveAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 0, false, "move"],
    };
    actionReducer(setupState, moveHandToActiveAction);

    assert.sameOrderedMembers(setupState.self.boardState.active, [3]);
    assert.sameOrderedMembers(setupState.self.boardState.bench, [0]);

    const benchedCards = setupState.self.boardState.bench.map(
      (i) => setupState.self.deckList[i],
    );
    expect(setupState.self.boardState.bench.length).toBe(1); // Active moved to bench
    expect(benchedCards[0].deckListIndex).toBe(0); // Active moved to bench

    activeCards = setupState.self.boardState.active.map(
      (i) => setupState.self.deckList[i],
    );
    expect(activeCards.length).toBe(1);
    expect(activeCards[0].name).toBe(firstCardInHand.name);
    expect(activeCards[0].deckListIndex).toBe(firstCardInHand.deckListIndex);

    expect(setupState).toHaveValidBoardStates();
  },
);

reducerTest(
  "move energy from hand to active does not bump active pokemon",
  ({ setupState }) => {
    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [3, 56, 31, 41, 32, 0, 47],
    );

    const moveToActiveAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 5, false, "move"],
    };

    actionReducer(setupState, moveToActiveAction);

    expect(setupState.self.boardState.active[0]).toBe(0);
    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [3, 56, 31, 41, 32, 47],
    );

    const moveHandToActiveAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 1, 0, "move"],
    };
    actionReducer(setupState, moveHandToActiveAction);

    assert.sameOrderedMembers(setupState.self.boardState.active, [0]);
    assert.sameMembers(setupState.self.boardState.attached[0], [56]);

    expect(setupState).toHaveValidBoardStates();
  },
);

reducerTest(
  "move last card in hand to active, card is attached to active",
  ({ setupState }) => {
    const takeTurnAction = {
      user: "self",
      emit: true,
      type: "takeTurn",
      parameters: ["self"],
    };
    actionReducer(setupState, takeTurnAction);

    expect(setupState.self.boardState.hand.length).toBe(8);

    const moveCardToActiveAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 2, false, "move"],
    };
    actionReducer(setupState, moveCardToActiveAction);

    const moveCardAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 6, 0, "move"],
    };
    actionReducer(setupState, moveCardAction);

    expect(setupState.self.boardState.hand.length).toBe(6);
    expect(setupState.self.boardState.active.length).toBe(1);

    expect(setupState).toHaveValidBoardStates();

    assert.sameOrderedMembers(setupState.self.boardState.active, [31]);
    assert.sameOrderedMembers(setupState.self.boardState.attached[31], [16]);
  },
);

reducerTest(
  "move card from hand to stadium bumps opponents current stadium",
  ({ setupState }) => {
    const selfMoveCardFromHandToStadiumAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "stadium", 4, false, "move"],
    };
    actionReducer(setupState, selfMoveCardFromHandToStadiumAction);

    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [3, 56, 31, 41, 0, 47],
    );
    assert.sameOrderedMembers(setupState.self.boardState.stadium, [32]);

    const oppMoveCardFromHandToStadiumAction = {
      user: "opp",
      emit: true,
      type: "moveCardBundle",
      parameters: ["opp", "hand", "stadium", 4, false, "move"],
    };
    actionReducer(setupState, oppMoveCardFromHandToStadiumAction);

    assert.sameOrderedMembers(
      setupState.opp.boardState.hand,
      [27, 26, 49, 58, 43, 46],
    );
    assert.sameOrderedMembers(setupState.opp.boardState.stadium, [59]);
    assert.sameOrderedMembers(setupState.self.boardState.stadium, []);
    expect(setupState.self.boardState.discard[0]).toBe(32);

    expect(setupState).toHaveValidBoardStates();
  },
);

reducerTest("move attached card to discard moves card", ({ setupState }) => {
  actionReducer(setupState, {
    user: "self",
    emit: true,
    type: "moveCardBundle",
    parameters: ["self", "hand", "active", 4, false, "move"],
  });

  actionReducer(setupState, {
    user: "self",
    emit: true,
    type: "moveCardBundle",
    parameters: ["self", "hand", "active", 4, 0, "move"],
  });

  actionReducer(setupState, {
    user: "self",
    emit: true,
    type: "moveCardBundle",
    parameters: ["self", "active", "discard", 1, false, "move"],
  });

  expect(setupState.self.boardState.discard.length).toBe(1);
});

reducerTest(
  "move card from hand to stadium bumps own current stadium",
  ({ setupState }) => {
    reducerTest.todo("not implemented yet");
  },
);

reducerTest(
  "move pokemon from hand to active pokemon with attachments bumps active pokemon",
  ({ setupState }) => {
    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [3, 56, 31, 41, 32, 0, 47],
    );

    const moveToActiveAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 5, false, "move"],
    };

    actionReducer(setupState, moveToActiveAction);

    expect(setupState.self.boardState.active[0]).toBe(0);
    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [3, 56, 31, 41, 32, 47],
    );

    let activeCards = setupState.self.boardState.active.map(
      (i) => setupState.self.deckList[i],
    );
    expect(activeCards).toBeDefined();
    expect(activeCards.length).toBe(1);
    expect(activeCards[0].name).toBe("Dreepy");

    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [3, 56, 31, 41, 32, 47],
    );
    assert.sameOrderedMembers(setupState.self.boardState.bench, []);

    const moveHandToActiveAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 0, 0, "move"],
    };
    actionReducer(setupState, moveHandToActiveAction);

    assert.sameOrderedMembers(setupState.self.boardState.active, [0]);
    assert.sameOrderedMembers(setupState.self.boardState.attached[0], [3]);

    const drawAction = {
      user: "self",
      emit: true,
      type: "draw",
      parameters: ["self", 7],
    };
    actionReducer(setupState, drawAction);

    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [56, 31, 41, 32, 47, 16, 52, 36, 57, 15, 53, 38],
    );

    const attachToPokemonInHandAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "hand", 9, 5, "move"],
    };
    actionReducer(setupState, attachToPokemonInHandAction);

    const moveAttachedToActiveAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 5, 0, "move"],
    };
    actionReducer(setupState, moveAttachedToActiveAction);

    assert.sameOrderedMembers(setupState.self.boardState.active, [16]);
    assert.sameOrderedMembers(setupState.self.boardState.attached[16], [15]);
    assert.sameOrderedMembers(setupState.self.boardState.bench, [0]);
    assert.sameOrderedMembers(setupState.self.boardState.attached[0], [3]);

    expect(setupState).toHaveValidBoardStates();
  },
);

reducerTest(
  "move active pokemon with attachments to discard also discards the attachments",
  ({ setupState }) => {
    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [3, 56, 31, 41, 32, 0, 47],
    );

    const moveToActiveAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 5, false, "move"],
    };

    actionReducer(setupState, moveToActiveAction);

    let moveHandToActiveAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 0, 0, "move"],
    };
    actionReducer(setupState, moveHandToActiveAction);
    moveHandToActiveAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "hand", "active", 0, 0, "move"],
    };
    actionReducer(setupState, moveHandToActiveAction);

    assert.sameOrderedMembers(setupState.self.boardState.active, [0]);
    assert.sameOrderedMembers(setupState.self.boardState.attached[0], [3, 56]);

    const moveActiveToDiscardAction = {
      user: "self",
      emit: true,
      type: "moveCardBundle",
      parameters: ["self", "active", "discard", 0, false, "move"],
    };
    actionReducer(setupState, moveActiveToDiscardAction);

    assert.sameOrderedMembers(setupState.self.boardState.discard, [0, 3, 56]);

    expect(setupState).toHaveValidBoardStates();
  },
);
