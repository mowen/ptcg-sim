import { useContext, useState } from "react";
import {
  Card,
  UiStateDTO,
  UndoableGameStateDTO,
  UserType,
} from "../../../models";
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
import { DndContext, DragEndEvent } from "@dnd-kit/core";

function TableTop({
  state,
  uiState,
}: {
  state: UndoableGameStateDTO;
  uiState: UiStateDTO;
}) {
  const [isActiveBottom, setIsActiveBottom] = useState(true);

  const processAction = useContext(AppDispatchContext);
  const processUiAction = useContext(UiDispatchContext);

  const activeUser = state.gameState.activeUser;
  const notActiveUser =
    activeUser == UserType.Self ? UserType.Opp : UserType.Self;
  const [bottomUser, topUser] = isActiveBottom
    ? [activeUser, notActiveUser]
    : [notActiveUser, activeUser];

  const actionController = new ActionController(
    activeUser,
    processAction,
    state,
  );
  const uiController = new UiController(activeUser, processUiAction);

  useHotkeys(["left", "u"], () => actionController.undo());
  useHotkeys("right", () => actionController.redo());
  useHotkeys("?", () => uiController.showKeybinds(), { useKey: true });
  useHotkeys("ESC", () => uiController.clearModal());
  useHotkeys("ENTER", () => actionController.discardBoard());

  const flipCoin = (boardUser: string) => {
    console.log(`${boardUser} flipped a coin`);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && active.data.current) {
      if (over) {
        actionController.moveCard(
          active.id.toString(),
          active.data.current.zoneId,
          active.data.current.zoneIndex,
          over.id.toString(),
          over.data?.current?.zoneId,
          over.data?.current?.zoneIndex,
        );
      } else {
        console.warn(`DragEndevent had no over`);
      }
    } else {
      console.warn(`DragEndevent had no active`);
    }
  };

  const selfBoard = (
    <Board
      cssUser={UserType.Self}
      boardUser={bottomUser}
      playerState={state.gameState[bottomUser]}
    />
  );

  return (
    <div id="tableTop">
      <Board
        cssUser={UserType.Opp}
        boardUser={topUser}
        playerState={state.gameState[topUser]}
      />

      <div id="oppResizer" className="opp-color"></div>

      <BoardButtons
        boardUser={bottomUser}
        flipCoin={() => flipCoin(bottomUser)}
        takeTurn={() => actionController.takeTurn()}
        flipActive={() => setIsActiveBottom(!isActiveBottom)}
      ></BoardButtons>

      <div id="selfResizer" className="self-color"></div>

      {/* Just because a player's board is at the bottom doesn't mean it's active
          so don't allow dragging unless the user is the active user */}
      {bottomUser === activeUser ? (
        <DndContext onDragEnd={handleDragEnd}>{selfBoard}</DndContext>
      ) : (
        selfBoard
      )}

      <KeybindModal show={uiState.showKeybinds} />
    </div>
  );
}

export default TableTop;
