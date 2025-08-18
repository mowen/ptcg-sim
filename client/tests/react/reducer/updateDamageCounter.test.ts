import { reducerTest } from "./testData/testContext";
import actionReducer from "../../../src/react/reducer/actionReducer";
import { expect } from "vitest";

reducerTest(
  "add 30 damage to first card in hand, then update it to 50, first card in hand is has 50 damage",
  ({ setupState }) => {
    const addDamageCounterAction = {
      user: "opp",
      emit: true,
      type: "addDamageCounter",
      parameters: ["hand", 0, "30"],
    };

    actionReducer(setupState, addDamageCounterAction);

    const updateDamageCounterAction = {
      user: "opp",
      emit: true,
      type: "updateDamageCounter",
      parameters: ["hand", 0, "50"],
    };

    actionReducer(setupState, updateDamageCounterAction);

    const firstCardInHandIndex = setupState.opp.boardState.hand[0];
    expect(setupState.opp.boardState.damage[firstCardInHandIndex]).toBe(50);
  },
);
