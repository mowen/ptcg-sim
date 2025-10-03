import { reducerTest } from "./testData/testContext";
import actionReducer from "../../../src/react/reducer/actionReducer";
import { assert, expect } from "vitest";

reducerTest(
  "top card in self deck is swapped with the last card in hand",
  ({ setupState }) => {
    const topDeckId = setupState.self.boardState.deck[0];

    assert.sameOrderedMembers(
      setupState.self.boardState.hand,
      [3, 56, 31, 41, 32, 0, 47],
    );

    const switchWithDeckTopAction = {
      user: "self",
      emit: true,
      type: "switchWithDeckTop",
      parameters: ["self", "hand", 4],
    };

    actionReducer(setupState, switchWithDeckTopAction);

    assert.sameOrderedMembers(setupState.self.boardState.hand, [
      3,
      56,
      31,
      41,
      0,
      47,
      topDeckId,
    ]);

    expect(setupState.self.boardState.deck.length).toBe(47);

    const newTopDeckId = setupState.self.boardState.deck[0];
    expect(newTopDeckId).toBe(32);
  },
);
