import { describe, expect, test } from 'vitest';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { GameStateDTO } from '../../../src/models';

describe('VSTARGXFunction', () => {
  test('self gxUsed and opp gxUsed independently', () => {
    let state = actionReducer(new GameStateDTO(), {
      user: 'self',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['gx'],
    });
    expect(state.self.gxUsed).toBe(true);
    expect(state.opp.gxUsed).toBe(false);

    state = actionReducer(state, {
      user: 'self',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['gx'],
    });
    expect(state.self.gxUsed).toBe(false);
    expect(state.opp.gxUsed).toBe(false);

    state = actionReducer(state, {
      user: 'opp',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['gx'],
    });
    expect(state.self.gxUsed).toBe(false);
    expect(state.opp.gxUsed).toBe(true);
  });

  test('self vstarUsed and opp vstarUsed independently', () => {
    let state = actionReducer(new GameStateDTO(), {
      user: 'self',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['vstar'],
    });
    expect(state.self.vstarUsed).toBe(true);
    expect(state.opp.vstarUsed).toBe(false);

    state = actionReducer(state, {
      user: 'self',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['vstar'],
    });
    expect(state.self.vstarUsed).toBe(false);
    expect(state.opp.vstarUsed).toBe(false);

    state = actionReducer(state, {
      user: 'opp',
      emit: true,
      type: 'VSTARGXFunction',
      parameters: ['vstar'],
    });
    expect(state.self.vstarUsed).toBe(false);
    expect(state.opp.vstarUsed).toBe(true);
  });
});
