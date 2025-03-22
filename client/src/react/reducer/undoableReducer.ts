import { Action } from '../../models';

export class Undoable<T> {
  public past: Array<T> = new Array<T>();
  public present: T;
  public future: Array<T> = new Array<T>();

  constructor(initialValue: T) {
    this.present = initialValue;
  }
}

export function undoableReducer<T>(
  reducer: (state: T, action: Action) => T
): (state: Undoable<T>, action: Action) => Undoable<T> {
  return function (state, action) {
    const { past, present, future } = state;

    switch (action.action) {
      case 'undo': {
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      }
      case 'redo': {
        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      }
      default: {
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: [],
        };
      }
    }
  };
}
