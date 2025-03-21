import { Action } from '../../../src/models';
import { reducerTest } from './testData/testContext';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { assert } from 'vitest';

reducerTest(
  'opp deck has the correct order after a shuffle',
  ({ setupState }) => {
    const shuffleAllAction = new Action('opp', true, 'shuffleAll', [
      'opp',
      'deck',
      [
        36, 4, 43, 6, 7, 35, 25, 31, 42, 17, 1, 20, 38, 37, 18, 11, 27, 10, 29,
        15, 28, 32, 12, 41, 8, 16, 30, 26, 39, 9, 40, 5, 14, 3, 13, 22, 0, 34,
        2, 21, 24, 33, 23, 19,
      ],
    ]);

    setupState = actionReducer(setupState, shuffleAllAction);

    assert.sameOrderedMembers(
      setupState.opp.deck,
      shuffleAllAction.parameters[2] as Array<number>
    );
  }
);
