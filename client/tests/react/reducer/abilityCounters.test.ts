import { reducerTest } from "./testData/testContext";
import actionReducer from "../../../src/react/reducer/actionReducer";
import { assert, expect } from "vitest";

reducerTest(
  "add ability counter to first card in hand, it is ignored",
  ({ setupState }) => {
    const addAbilityCounterAction = {
      user: "opp",
      emit: true,
      type: "addAbilityCounter",
      parameters: ["opp", "hand", 0],
    };

    actionReducer(setupState, addAbilityCounterAction);

    assert.sameOrderedMembers(setupState.opp.boardState.abilityUsed, []);
  },
);

reducerTest(
  "add ability counter to first card on bench, it is applied",
  ({ setupState }) => {
    const addAbilityCounterAction = {
      user: "opp",
      emit: true,
      type: "addAbilityCounter",
      parameters: ["opp", "bench", 0],
    };

    const moveToBenchAction = {
      user: "opp",
      emit: true,
      type: "moveCardBundle",
      parameters: ["opp", "hand", "bench", 0, false, "move"],
    };

    actionReducer(setupState, moveToBenchAction);
    actionReducer(setupState, addAbilityCounterAction);

    const firstCardOnBenchndex = setupState.opp.boardState.bench[0];
    assert.sameOrderedMembers(setupState.opp.boardState.abilityUsed, [
      firstCardOnBenchndex,
    ]);
  },
);
