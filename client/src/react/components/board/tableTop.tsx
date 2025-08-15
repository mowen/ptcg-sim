import { useContext, useState } from "react";
import { UiStateDTO, UndoableGameStateDTO, UserType } from "../../../models";
import {
  AppDispatchContext,
  Board,
  BoardButtons,
  KeybindModal,
  UiDispatchContext,
} from "../../../react";
import { ActionController, UiController } from "../../../controllers";
import { useHotkeys } from "react-hotkeys-hook";

import "./tableTop.css";

function TableTop({
  state,
  uiState,
}: {
  state: UndoableGameStateDTO;
  uiState: UiStateDTO;
}) {
  const [isSelfActive, setIsSelfActive] = useState(true);

  const processAction = useContext(AppDispatchContext);
  const processUiAction = useContext(UiDispatchContext);

  const [p1User, p2User] = isSelfActive
    ? [UserType.Self, UserType.Opp]
    : [UserType.Opp, UserType.Self];

  const actionController = new ActionController(p1User, processAction);
  const uiController = new UiController(p1User, processUiAction);

  useHotkeys(["left", "u"], () => actionController.undo());
  useHotkeys("right", () => actionController.redo());
  useHotkeys("?", () => uiController.showKeybinds(), { useKey: true });
  useHotkeys("ESC", () => uiController.clearModal());

  const flipCoin = (boardUser: string) => {
    console.log(`${boardUser} flipped a coin`);
  };

  return (
    <>
      <Board
        cssUser={UserType.Opp}
        boardUser={p2User}
        playerState={state.gameState[p2User]}
      />

      <div id="oppResizer" className="opp-color"></div>

      <BoardButtons
        boardUser={p1User}
        flipCoin={() => flipCoin(p1User)}
        takeTurn={() => actionController.takeTurn()}
        flipActive={() => setIsSelfActive(!isSelfActive)}
      ></BoardButtons>

      <div id="selfResizer" className="self-color"></div>

      <Board
        cssUser={UserType.Self}
        boardUser={p1User}
        playerState={state.gameState[p1User]}
      />

      <KeybindModal show={uiState.showKeybinds} />
    </>
  );
}

export default TableTop;
