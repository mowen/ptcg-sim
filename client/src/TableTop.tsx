import { useContext, useState } from 'react';
import { UndoableGameStateDTO, UserType } from './models';
import { AppDispatchContext, Board, BoardButtons, KeybindModal } from './react';
import { useHotkeys } from 'react-hotkeys-hook';

import './TableTop.css';

function TableTop({ state }: { state: UndoableGameStateDTO }) {
  const [isSelfActive, setIsSelfActive] = useState(true);
  const [showKeybinds, setShowKeybinds] = useState(false);

  const flipCoin = (boardUser: string) => {
    console.log(`${boardUser} flipped a coin`);
  };

  const processAction = useContext(AppDispatchContext);

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
  useHotkeys('?', () => setShowKeybinds(true), { useKey: true });

  return (
    <>
      <Board
        cssUser={UserType.Opp}
        boardUser={p2User}
        playerState={state.gameState[p2User]}
      />

      <div id="selfResizer" className="self-color"></div>
      <div id="oppResizer" className="opp-color"></div>

      <BoardButtons
        boardUser={p1User}
        flipCoin={() => flipCoin(p1User)}
        takeTurn={() => takeTurn(p1User)}
        flipActive={() => setIsSelfActive(!isSelfActive)}
      ></BoardButtons>

      <Board
        cssUser={UserType.Self}
        boardUser={p1User}
        playerState={state.gameState[p1User]}
      />

      <KeybindModal show={showKeybinds} />
    </>
  );
}

export default TableTop;
