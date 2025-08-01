import { useCallback, useState } from 'react';
import { ActionDTO, UndoableGameStateDTO, UserType } from './models';
import {
  AppContext,
  AppDispatchContext,
  Board,
  BoardButtons,
  undoableActionReducer,
} from './react';
import { useHotkeys } from 'react-hotkeys-hook';

function App({ initialActions }: { initialActions: Array<ActionDTO> }) {
  const [isSelfActive, setIsSelfActive] = useState(true);
  const [state, setState] = useState(() => {
    let initialState = new UndoableGameStateDTO();
    initialActions.forEach((a) => {
      initialState = undoableActionReducer(initialState, a);
    });
    return initialState;
  });

  const processAction = useCallback(
    (action: ActionDTO) =>
      setState((currentState) => undoableActionReducer(currentState, action)),
    []
  );

  const flipCoin = (boardUser: string) => {
    console.log(`${boardUser} flipped a coin`);
  };

  const takeTurn = (boardUser: string) => {
    processAction({
      user: boardUser,
      emit: true,
      type: 'takeTurn',
      parameters: [boardUser],
    });
  };

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
  });
  useHotkeys('right', () => {
    processAction({
      user: p1User,
      emit: true,
      type: 'redo',
      parameters: [],
    });
  });

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={processAction}>
        <Board
          cssUser={UserType.Opp}
          boardUser={p2User}
          playerState={state.gameState[p2User]}
        />
        <Board
          cssUser={UserType.Self}
          boardUser={p1User}
          playerState={state.gameState[p1User]}
        />

        <div id="selfResizer" className="self-color"></div>
        <div id="oppResizer" className="opp-color"></div>

        <BoardButtons
          boardUser={p1User}
          flipCoin={() => flipCoin(p1User)}
          takeTurn={() => takeTurn(p1User)}
          flipActive={() => setIsSelfActive(!isSelfActive)}
        ></BoardButtons>
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
