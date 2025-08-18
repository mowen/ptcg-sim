import { reducerTest } from "./testData/testContext";
import actionReducer from "../../../src/react/reducer/actionReducer";
import { expect } from "vitest";

reducerTest(
  "add a special condition to first card in hand, first card in hand is poisoned",
  ({ setupState }) => {
    const addSpecialConditionAction = {
      user: "opp",
      emit: true,
      type: "addSpecialCondition",
      parameters: ["hand", 0],
    };

    actionReducer(setupState, addSpecialConditionAction);

    const firstCardInHandIndex = setupState.opp.boardState.hand[0];
    expect(
      setupState.opp.boardState.specialCondition[firstCardInHandIndex],
    ).toBe("P");
  },
);
