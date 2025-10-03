import { reducerTest } from "./testData/testContext";
import actionReducer from "../../../src/react/reducer/actionReducer";
import { assert, describe, expect } from "vitest";

describe.skip("todo", () => {
  reducerTest(
    "top card in self deck is swapped with the last card in hand",
    ({ setupState }) => {
      const topDeckId = setupState.self.boardState.deck[0];

      assert.sameOrderedMembers(
        setupState.self.boardState.hand,
        [3, 56, 31, 41, 32, 0, 47],
      );

      const shuffleBoardAction = {
        user: "self",
        emit: true,
        action: "shuffleBoard",
        parameters: [
          "self",
          true,
          [
            4, 46, 41, 44, 37, 27, 11, 33, 25, 43, 45, 31, 6, 14, 9, 12, 35, 21,
            22, 30, 3, 34, 17, 5, 18, 16, 42, 29, 15, 0, 13, 10, 2, 36, 28, 19,
            39, 32, 7, 20, 24, 8, 26, 40, 23, 38, 1,
          ],
        ],
      };

      actionReducer(setupState, shuffleBoardAction);

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
});
