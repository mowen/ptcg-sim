import { describe, expect, test } from 'vitest';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { Action, GameState } from '../../../src/models';

describe('VSTARGXFunction', () => {
  test('self gxUsed and opp gxUsed independently', () => {
    let state = actionReducer(
      new GameState(),
      new Action('self', true, 'VSTARGXFunction', ['gx'])
    );
    expect(state.self.gxUsed).toBe(true);
    expect(state.opp.gxUsed).toBe(false);

    state = actionReducer(
      state,
      new Action('self', true, 'VSTARGXFunction', ['gx'])
    );
    expect(state.self.gxUsed).toBe(false);
    expect(state.opp.gxUsed).toBe(false);

    state = actionReducer(
      state,
      new Action('opp', true, 'VSTARGXFunction', ['gx'])
    );
    expect(state.self.gxUsed).toBe(false);
    expect(state.opp.gxUsed).toBe(true);
  });

  test('self vstarUsed and opp vstarUsed independently', () => {
    let state = actionReducer(
      new GameState(),
      new Action('self', true, 'VSTARGXFunction', ['vstar'])
    );
    expect(state.self.vstarUsed).toBe(true);
    expect(state.opp.vstarUsed).toBe(false);

    state = actionReducer(
      state,
      new Action('self', true, 'VSTARGXFunction', ['vstar'])
    );
    expect(state.self.vstarUsed).toBe(false);
    expect(state.opp.vstarUsed).toBe(false);

    state = actionReducer(
      state,
      new Action('opp', true, 'VSTARGXFunction', ['vstar'])
    );
    expect(state.self.vstarUsed).toBe(false);
    expect(state.opp.vstarUsed).toBe(true);
  });
});
