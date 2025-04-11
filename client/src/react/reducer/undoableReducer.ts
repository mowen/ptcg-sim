import { ActionDTO } from '../../models';

export class Undoable<T> {
  public past: Array<T> = new Array<T>();
  public present: T;
  public future: Array<T> = new Array<T>();

  constructor(initialValue: T) {
    this.present = initialValue;
  }
}

export function undoableReducer<T>(
  reducer: (state: T, action: ActionDTO) => void
): (state: Undoable<T>, action: ActionDTO) => Undoable<T> {
  return function (state, action) {
    const { past, present, future } = state;

    switch (action.type) {
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
        const oldPresent = present;
        reducer(present, action);
        if (present === oldPresent) {
          return state;
        }
        return {
          past: [...past, oldPresent],
          present: present,
          future: [],
        };
      }
    }
  };
}
