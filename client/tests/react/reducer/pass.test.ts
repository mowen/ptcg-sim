import { reducerTest } from './testData/testContext';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { assert, expect } from 'vitest';
import { BoardState } from '../../../src/models';

reducerTest(
  'two cards are moved to board and then we pass, cards on board are discarded',
  ({ setupState }) => {
    const moveToBoardAction = {
      user: 'self',
      emit: true,
      type: 'moveCardBundle',
      parameters: ['self', 'hand', 'board', 0, false, 'move'],
    };

    actionReducer(setupState, moveToBoardAction);
    actionReducer(setupState, moveToBoardAction);

    expect(setupState.self.boardState.board.length).toBe(2);

    const passAction = {
      user: 'self',
      emit: true,
      type: 'pass',
      parameters: ['self'],
    };

    actionReducer(setupState, passAction);

    expect(setupState.self.boardState.board.length).toBe(0);
    expect(setupState.self.boardState.discard.length).toBe(2);

    expect(new BoardState(setupState.self)); // Expect no invalid data error
  }
);
