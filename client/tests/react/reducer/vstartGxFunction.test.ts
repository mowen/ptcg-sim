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
    expect(state.p1.boardState.gxUsed).toBe(true);
    expect(state.p2.boardState.gxUsed).toBe(false);

    actionReducer(state, {
      user: 'self',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['gx'],
    });
    expect(state.p1.boardState.gxUsed).toBe(false);
    expect(state.p2.boardState.gxUsed).toBe(false);

    actionReducer(state, {
      user: 'opp',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['gx'],
    });
    expect(state.p1.boardState.gxUsed).toBe(false);
    expect(state.p2.boardState.gxUsed).toBe(true);
  });

  test('self vstarUsed and opp vstarUsed independently', () => {
    const state = new GameStateDTO();
    actionReducer(state, {
      user: 'self',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['vstar'],
    });
    expect(state.p1.boardState.vstarUsed).toBe(true);
    expect(state.p2.boardState.vstarUsed).toBe(false);

    actionReducer(state, {
      user: 'self',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['vstar'],
    });
    expect(state.p1.boardState.vstarUsed).toBe(false);
    expect(state.p2.boardState.vstarUsed).toBe(false);

    actionReducer(state, {
      user: 'opp',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['vstar'],
    });
    expect(state.p1.boardState.vstarUsed).toBe(false);
    expect(state.p2.boardState.vstarUsed).toBe(true);
  });
});
