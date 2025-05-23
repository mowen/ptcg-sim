import { useCallback, useState } from 'react';
import { ActionDTO, GameStateDTO, UserType } from './models';
import {
  AppContext,
  AppDispatchContext,
  Board,
  BoardButtons,
  CardContextMenu,
  undoableActionReducer,
} from './react';
import { useHotkeys } from 'react-hotkeys-hook';
import { debugDump } from './util';

function App({ initialActions }: { initialActions: Array<ActionDTO> }) {
  const [isSelfActive, setIsSelfActive] = useState(true);
  const [state, setState] = useState(() => {
    let initialState = new GameStateDTO();
    initialActions.slice(0, 30).forEach((a) => {
      initialState = undoableActionReducer(initialState, a);
    });
    return initialState;
  });

  const processAction = useCallback(
    (action: ActionDTO) =>
      setState((currentState) => undoableActionReducer(currentState, action)),
    []
  );

  const [p1User, p2User] = isSelfActive
    ? [UserType.Self, UserType.Opp]
    : [UserType.Opp, UserType.Self];

  useHotkeys('left', () => {
    processAction({
      user: p1User,
      emit: true,
      type: 'undo',
      parameters: [],
    });
    console.debug('Undo, new state:', debugDump(state, p1User));
  });
  useHotkeys('right', () => {
    processAction({
      user: p1User,
      emit: true,
      type: 'redo',
      parameters: [],
    });
    console.debug('Redo, new state:', debugDump(state, p1User));
  });

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={processAction}>
        <Board
          cssUser={UserType.Opp}
          boardUser={p2User}
          playerState={state[p2User]}
        />
        <Board
          cssUser={UserType.Self}
          boardUser={p1User}
          playerState={state[p1User]}
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
