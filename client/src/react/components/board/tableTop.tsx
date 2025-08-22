import { useContext, useState } from "react";
import {
  CardLocation,
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
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";

import "./tableTop.css";

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

  const uiController = new UiController(processUiAction, uiState);
  const actionController = new ActionController(
    processAction,
    state,
    uiController,
  );

  useHotkeys(["left", "u"], () => actionController.undo());
  useHotkeys("right", () => actionController.redo());
  useHotkeys("?", () => uiController.showKeybinds(), { useKey: true });
  useHotkeys("ESC", () => uiController.clearModal());
  useHotkeys("ENTER", () => actionController.discardBoard());

  // Not sure if hooks can be used in a loop so did inline
  useHotkeys("1", () => actionController.draw(1));
  useHotkeys("2", () => actionController.draw(2));
  useHotkeys("3", () => actionController.draw(3));
  useHotkeys("4", () => actionController.draw(4));
  useHotkeys("5", () => actionController.draw(5));
  useHotkeys("6", () => actionController.draw(6));
  useHotkeys("7", () => actionController.draw(7));
  useHotkeys("8", () => actionController.draw(8));
  useHotkeys("9", () => actionController.draw(9));

  useHotkeys("SPACE", () =>
    actionController.moveSelectedTo(CardLocation.Board),
  );
  useHotkeys("h", () => actionController.moveSelectedTo(CardLocation.Hand));
  useHotkeys("d", () => actionController.moveSelectedTo(CardLocation.Discard));
  useHotkeys("b", () => actionController.moveSelectedTo(CardLocation.Bench));
  useHotkeys("a", () => actionController.moveSelectedTo(CardLocation.Active));
  useHotkeys("p", () => actionController.moveSelectedTo(CardLocation.Prize));
  useHotkeys("l", () => actionController.moveSelectedTo(CardLocation.LostZone));
  useHotkeys("s", () => actionController.moveSelectedTo(CardLocation.Stadium));

  const flipCoin = (boardUser: string) => {
    console.log(`${boardUser} flipped a coin`);
  };

  const selfBoard = (
    <Board
      cssUser={UserType.Self}
      boardUser={bottomUser}
      playerState={state.gameState[bottomUser]}
      selectedCard={uiState.selectedCard}
      onCardClick={(card) => uiController.selectCard(card)}
    />
  );

  const mouseSensor = useSensor(MouseSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor);

  return (
    <div id="tableTop">
      <Board
        cssUser={UserType.Opp}
        boardUser={topUser}
        playerState={state.gameState[topUser]}
        selectedCard={uiState.selectedCard}
        onCardClick={(card) => uiController.selectCard(card)}
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
        <DndContext
          sensors={sensors}
          autoScroll={false}
          onDragEnd={(event) => actionController.handleCardDragEnd(event)}
        >
          {selfBoard}
        </DndContext>
      ) : (
        selfBoard
      )}

      {uiState.showKeybinds && <KeybindModal />}
    </div>
  );
}

export default TableTop;
