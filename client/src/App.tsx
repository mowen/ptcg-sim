import { useReducer, useState } from 'react';
import { GameStateDTO } from './models';
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

  const p1DeckList = isSelfActive
    ? state.present.selfDeckList
    : state.present.oppDeckList;
  const p2DeckList = isSelfActive
    ? state.present.oppDeckList
    : state.present.selfDeckList;
  const p1State = isSelfActive ? state.present.self : state.present.opp;
  const p2State = isSelfActive ? state.present.opp : state.present.self;

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={processAction}>
        <Board user="opp" deckList={p2DeckList} boardState={p2State} />
        <Board user="self" deckList={p1DeckList} boardState={p1State} />

        <Stadium state={state.present}></Stadium>

        <div id="selfResizer" className="self-color"></div>
        <div id="oppResizer" className="opp-color"></div>

        <BoardButtons
          isSelfActive={isSelfActive}
          setIsSelfActive={setIsSelfActive}
        ></BoardButtons>

        <CardContextMenu></CardContextMenu>
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
