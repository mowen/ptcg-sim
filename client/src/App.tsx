import { useReducer, useState } from 'react';
import { GameStateDTO, UserType } from './models';
import {
  actionReducer,
  AppContext,
  AppDispatchContext,
  Board,
  BoardButtons,
  CardContextMenu,
  Stadium,
  Undoable,
  undoableReducer,
} from './react';

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

        <Stadium state={state.present}></Stadium>

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
