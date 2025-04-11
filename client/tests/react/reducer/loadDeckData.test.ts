import { expect } from 'vitest';
import { GameStateDTO } from '../../../src/models';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { reducerTest, selfLoadDeckDataAction } from './testData/testContext';

reducerTest('selfDeckList has 60 cards', () => {
  const oppLoadDeckDataAction = {
    user: 'opp',
    emit: true,
    type: 'loadDeckData',
    parameters: [[]],
  };

  const state = new GameStateDTO();
  actionReducer(state, selfLoadDeckDataAction);
  actionReducer(state, oppLoadDeckDataAction);
  expect(state.p1.deckList.length).toBe(60);
});

reducerTest('oppDeckList has 0 cards', () => {
  const oppLoadDeckDataAction = {
    user: 'opp',
    emit: true,
    type: 'loadDeckData',
    parameters: [[]],
  };

  const state = new GameStateDTO();
  actionReducer(state, selfLoadDeckDataAction);
  actionReducer(state, oppLoadDeckDataAction);
  expect(state.p2.deckList.length).toBe(0);
});
