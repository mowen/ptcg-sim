import { reducerTest } from "./testData/testContext";
import actionReducer from "../../../src/react/reducer/actionReducer";
import { assert, expect } from "vitest";
import { BoardState, UserType } from "../../../src/models";

reducerTest(
  "two cards are moved to board and then we pass, cards on board are discarded",
  ({ setupState }) => {
    const moveToBoardAction = {
      user: "opp",
      emit: true,
      type: "moveCardBundle",
      parameters: ["opp", "hand", "board", 0, false, "move"],
    };

    actionReducer(setupState, moveToBoardAction);
    actionReducer(setupState, moveToBoardAction);

    expect(setupState.opp.boardState.board.length).toBe(2);

    const attackAction = {
      user: "opp",
      emit: true,
      type: "attack",
      parameters: ["opp"],
    };

    actionReducer(setupState, attackAction);

    expect(setupState.opp.boardState.board.length).toBe(0);
    expect(setupState.opp.boardState.discard.length).toBe(2);

    expect(new BoardState(setupState.opp)); // Expect no invalid data error
  },
);

reducerTest("self user attacks, opp user is now active", ({ setupState }) => {
  expect(setupState.activeUser).toBe(UserType.Self);

  const attackAction = {
    user: "opp",
    emit: true,
    type: "attack",
    parameters: ["opp"],
  };

  actionReducer(setupState, attackAction);

  expect(setupState.activeUser).toBe(UserType.Opp);
});
