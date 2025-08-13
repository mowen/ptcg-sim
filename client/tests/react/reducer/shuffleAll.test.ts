import { reducerTest } from "./testData/testContext";
import actionReducer from "../../../src/react/reducer/actionReducer";
import { assert } from "vitest";
import { BoardStateDTO } from "../../../src/models";

reducerTest(
  "opp deck has the correct order after a shuffle",
  ({ setupState }) => {
    const shuffleAllAction = {
      user: "opp",
      emit: true,
      type: "shuffleAll",
      parameters: [
        "opp",
        "deck",
        [
          36, 4, 43, 6, 7, 35, 25, 31, 42, 17, 1, 20, 38, 37, 18, 11, 27, 10,
          29, 15, 28, 32, 12, 41, 8, 16, 30, 26, 39, 9, 40, 5, 14, 3, 13, 22, 0,
          34, 2, 21, 24, 33, 23, 19,
        ],
      ],
    };

    actionReducer(setupState, shuffleAllAction);

    assert.sameOrderedMembers(
      setupState.opp.boardState.deck,
      [
        25, 50, 54, 51, 38, 39, 7, 18, 42, 3, 44, 37, 22, 34, 16, 8, 31, 10, 30,
        24, 52, 23, 2, 28, 17, 14, 48, 13, 35, 15, 11, 12, 40, 5, 33, 20, 47,
        41, 57, 32, 53, 0, 19, 1,
      ],
    );
  },
);

reducerTest(
  "cards shuffled into deck are removed from hand",
  ({ setupState }) => {
    setupState.opp.boardState = {
      gxUsed: false,
      vstarUsed: false,
      hand: [15, 44, 34, 22, 45],
      prize: [32, 35, 11, 25, 47, 49],
      deck: [
        21, 24, 5, 26, 58, 12, 20, 37, 38, 27, 7, 16, 8, 57, 9, 17, 55, 46, 14,
        43, 59, 30, 39, 6, 54, 50, 18, 31, 41, 52, 40, 23, 29, 33, 4, 13, 10,
        36, 48, 19, 42, 56, 53, 51,
      ],
      bench: [2, 3, 1],
      active: [0],
      discard: [],
      board: [28],
      lostZone: [],
      stadium: [],
      attached: {},
      damage: {},
      abilityUsed: [],
      turn: 1,
    } as BoardStateDTO;

    const shuffleAllAction = {
      user: "opp",
      emit: true,
      type: "shuffleAll",
      parameters: [
        "opp",
        "deck",
        [
          12, 11, 31, 1, 39, 36, 37, 6, 30, 29, 40, 14, 42, 22, 4, 18, 32, 35,
          20, 33, 7, 9, 41, 0, 28, 26, 15, 43, 38, 2, 3, 10, 16, 19, 13, 27, 25,
          8, 24, 17, 5, 34, 21, 23,
        ],
      ],
    };

    actionReducer(setupState, shuffleAllAction);

    assert.sameOrderedMembers(
      setupState.opp.boardState.hand,
      [15, 44, 34, 22, 45],
    );
  },
);
