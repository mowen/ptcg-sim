import { useCallback, useState } from 'react';
import { ActionDTO, GameStateDTO, UserType } from './models';
import {
  actionReducer,
  AppContext,
  AppDispatchContext,
  Board,
  BoardButtons,
  CardContextMenu,
} from './react';
import { useHotkeys } from 'react-hotkeys-hook';
import { debugDump, userToPlayer } from './util';
import { enablePatches, produceWithPatches } from 'immer';

// function App({ initialState }: { initialState: GameStateDTO }) {
function App({ initialActions }: { initialActions: Array<ActionDTO> }) {
  const [isSelfActive, setIsSelfActive] = useState(true);
  const [state, setState] = useState(new GameStateDTO());

  enablePatches()

  const actionReducerWithPatches = produceWithPatches(actionReducer);
  const processAction = useCallback((action: ActionDTO) => {
    setState((currentState) => {
      const [nextState, patches, inversePatches] = actionReducerWithPatches(
        currentState,
        action
      );
      if (nextState.undoable) {
        const pointer = ++nextState.undoStackPointer;
        nextState.undoStack.length = pointer;
        nextState.undoStack[pointer] = { patches, inversePatches };  
      }
      return nextState;
    });
  }, [actionReducerWithPatches]);

  initialActions.forEach((a) => {
    console.debug(a, state);
    processAction(a);
  });
  
  const [p1User, p2User] = isSelfActive ? [UserType.Self, UserType.Opp] : [UserType.Opp, UserType.Self];
  const [p1, p2] = [state[userToPlayer(p1User)], state[userToPlayer(p2User)]];

  useHotkeys('left', () => {
    processAction({user: state.initiator, emit: true, type: 'undo', parameters: []});
    console.debug('Undo, new state:', debugDump(state, p1User));
  });
  useHotkeys('right', () => {
    processAction({user: state.initiator, emit: true, type: 'redo', parameters: []});
    console.debug('Redo, new state:', debugDump(state, p1User));
  });

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={processAction}>
        <Board
          cssUser={UserType.Opp}
          boardUser={p2User}
          playerState={p2}
        />
        <Board
          cssUser={UserType.Self}
          boardUser={p1User}
          playerState={p1}
        />

        <div id="selfResizer" className="self-color"></div>
        <div id="oppResizer" className="opp-color"></div>

        <BoardButtons
          boardUser={p1User}
          flipActive={() => setIsSelfActive(!isSelfActive)}
        ></BoardButtons>

        <CardContextMenu></CardContextMenu>
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
