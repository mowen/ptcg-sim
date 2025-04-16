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
import { debugDump, userToPlayer } from './util';

function App({ initialActions }: { initialActions: Array<ActionDTO> }) {
  const [isSelfActive, setIsSelfActive] = useState(true);
  const [state, setState] = useState(() => {
    let initialState = new GameStateDTO();
    initialActions.slice(0, 25).forEach((a) => {
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
  const p1Player = userToPlayer(p1User);
  const p2Player = userToPlayer(p2User);

  useHotkeys('left', () => {
    processAction({
      user: p1User,
      emit: true,
      type: 'undo',
      parameters: [],
    });
    console.debug('Undo, new state:', debugDump(state, p1Player));
  });
  useHotkeys('right', () => {
    processAction({
      user: p1User,
      emit: true,
      type: 'redo',
      parameters: [],
    });
    console.debug('Redo, new state:', debugDump(state, p1Player));
  });

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={processAction}>
        <Board
          cssUser={UserType.Opp}
          boardUser={p2User}
          playerState={state[p2Player]}
        />
        <Board
          cssUser={UserType.Self}
          boardUser={p1User}
          playerState={state[p1Player]}
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
