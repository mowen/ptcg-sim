import { expect } from 'vitest';
import { Action, GameState } from '../../../src/models';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { reducerTest, selfLoadDeckDataAction } from './testData/testContext';

reducerTest('selfDeckList has 60 cards', () => {
  const oppLoadDeckDataAction = new Action('opp', true, 'loadDeckData', [[]]);

  const initialState = new GameState();
  let state = actionReducer(initialState, selfLoadDeckDataAction);
  state = actionReducer(state, oppLoadDeckDataAction);
  expect(state.selfDeckList.length).toBe(60);
});

reducerTest('oppDeckList has 0 cards', () => {
  const oppLoadDeckDataAction = new Action('opp', true, 'loadDeckData', [[]]);

  const initialState = new GameState();
  let state = actionReducer(initialState, selfLoadDeckDataAction);
  state = actionReducer(state, oppLoadDeckDataAction);
  expect(state.oppDeckList.length).toBe(0);
});
