import { reducerTest } from "./testData/testContext";
import actionReducer from "../../../src/react/reducer/actionReducer";
import { expect } from "vitest";

reducerTest(
  "add special condition to first card in hand, then remove it, first card in hand has no special condition",
  ({ setupState }) => {
    const addSpecialConditionAction = {
      user: "opp",
      emit: true,
      type: "addSpecialCondition",
      parameters: ["hand", 0],
    };

    actionReducer(setupState, addSpecialConditionAction);

    const removeSpecialConditionAction = {
      user: "opp",
      emit: true,
      type: "removeSpecialCondition",
      parameters: ["hand", 0],
    };
    actionReducer(setupState, removeSpecialConditionAction);

    const firstCardInHandIndex = setupState.opp.boardState.hand[0];
    expect(
      setupState.opp.boardState.specialCondition[firstCardInHandIndex],
    ).toBeUndefined();
  },
);
