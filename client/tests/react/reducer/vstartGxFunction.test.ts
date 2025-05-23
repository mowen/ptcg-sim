import { describe, expect, test } from 'vitest';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { GameStateDTO } from '../../../src/models';

describe('VSTARGXFunction', () => {
  test('self gxUsed and opp gxUsed independently', () => {
    const state = new GameStateDTO();
    actionReducer(state, {
      user: 'self',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['gx'],
    });
    expect(state.self.boardState.gxUsed).toBe(true);
    expect(state.opp.boardState.gxUsed).toBe(false);

    actionReducer(state, {
      user: 'self',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['gx'],
    });
    expect(state.self.boardState.gxUsed).toBe(false);
    expect(state.opp.boardState.gxUsed).toBe(false);

    actionReducer(state, {
      user: 'opp',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['gx'],
    });
    expect(state.self.boardState.gxUsed).toBe(false);
    expect(state.opp.boardState.gxUsed).toBe(true);
  });

  test('self vstarUsed and opp vstarUsed independently', () => {
    const state = new GameStateDTO();
    actionReducer(state, {
      user: 'self',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['vstar'],
    });
    expect(state.self.boardState.vstarUsed).toBe(true);
    expect(state.opp.boardState.vstarUsed).toBe(false);

    actionReducer(state, {
      user: 'self',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['vstar'],
    });
    expect(state.self.boardState.vstarUsed).toBe(false);
    expect(state.opp.boardState.vstarUsed).toBe(false);

    actionReducer(state, {
      user: 'opp',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['vstar'],
    });
    expect(state.self.boardState.vstarUsed).toBe(false);
    expect(state.opp.boardState.vstarUsed).toBe(true);
  });
});
