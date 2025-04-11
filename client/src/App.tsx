import { useState } from 'react';
import { GameStateDTO, UserType } from './models';
import {
  actionReducer,
  AppContext,
  AppDispatchContext,
  Board,
  BoardButtons,
  CardContextMenu,
  Undoable,
  undoableReducer,
} from './react';
import { useHotkeys } from 'react-hotkeys-hook';
import { debugDump } from './util';
import { useImmerReducer } from 'use-immer';
import { userToPlayer } from './util/util';

function App({ initialState }: { initialState: Undoable<GameStateDTO> }) {
  const [isSelfActive, setIsSelfActive] = useState(true);

  const undoableActionReducer = undoableReducer(actionReducer);
  const [state, processAction] = useImmerReducer(
    undoableActionReducer,
    initialState
  );

  const p1User = isSelfActive ? UserType.Self : UserType.Opp;
  const p2User = isSelfActive ? UserType.Opp : UserType.Self;
  const p1 = state.present[userToPlayer(p1User)];
  const p2 = state.present[userToPlayer(p2User)];

  useHotkeys('left', () => {
    processAction({ user: p1User, emit: true, type: 'undo', parameters: []});
    console.debug('Undo, new state:', debugDump(state.present, p1User));
  });
  useHotkeys('right', () => {
    processAction({ user: p1User, emit: true, type: 'redo', parameters: []});
    console.debug('Redo, new state:', debugDump(state.present, p1User));
  });

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={processAction}>
        <Board
          cssUser={UserType.Opp}
          boardUser={p2User}
          deckList={p2.deckList}
          boardState={p2.boardState}
        />
        <Board
          cssUser={UserType.Self}
          boardUser={p1User}
          deckList={p1.deckList}
          boardState={p1.boardState}
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
