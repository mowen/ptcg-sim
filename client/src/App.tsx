import { useReducer, useState } from 'react';
import { Action, GameStateDTO, UserType } from './models';
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

function App({ initialState }: { initialState: Undoable<GameStateDTO> }) {
  const [isSelfActive, setIsSelfActive] = useState(true);

  const undoableActionReducer = undoableReducer(actionReducer);
  const [state, processAction] = useReducer(
    undoableActionReducer,
    initialState
  );

  const p1User = isSelfActive ? UserType.Self : UserType.Opp;
  const p2User = isSelfActive ? UserType.Opp : UserType.Self;
  const p1DeckList = state.present[`${p1User}DeckList`];
  const p2DeckList = state.present[`${p2User}DeckList`];
  const p1State = state.present[p1User];
  const p2State = state.present[p2User];

  useHotkeys('left', () => {
    processAction(new Action(p1User, true, 'undo', []));
    console.debug('Undo, new state:', debugDump(state.present, p1User));
  });
  useHotkeys('right', () => {
    processAction(new Action(p1User, true, 'redo', []));
    console.debug('Redo, new state:', debugDump(state.present, p1User));
  });

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={processAction}>
        <Board
          cssUser={UserType.Opp}
          boardUser={p2User}
          deckList={p2DeckList}
          boardState={p2State}
        />
        <Board
          cssUser={UserType.Self}
          boardUser={p1User}
          deckList={p1DeckList}
          boardState={p1State}
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
