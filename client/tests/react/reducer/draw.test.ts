import { assert } from "vitest";
import actionReducer from "../../../src/react/reducer/actionReducer";
import { reducerTest } from "./testData/testContext";

reducerTest("draw 4 adds 4 cards to the hand", ({ setupState }) => {
  assert.sameOrderedMembers(
    setupState.self.boardState.hand,
    [3, 56, 31, 41, 32, 0, 47],
  );
  assert.sameOrderedMembers(
    setupState.self.boardState.deck.slice(0, 4),
    [16, 52, 36, 57],
  );
  assert.sameOrderedMembers(
    setupState.self.boardState.deck.slice(4, 8),
    [15, 53, 38, 10],
  );

  const drawAction = {
    user: "self",
    emit: true,
    type: "draw",
    parameters: ["self", 4],
  };
  actionReducer(setupState, drawAction);

  assert.sameOrderedMembers(
    setupState.self.boardState.hand,
    [3, 56, 31, 41, 32, 0, 47, 16, 52, 36, 57],
  );
  assert.sameOrderedMembers(
    setupState.self.boardState.deck.slice(0, 4),
    [15, 53, 38, 10],
  );
});
