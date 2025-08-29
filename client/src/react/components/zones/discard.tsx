import { useDroppable } from "@dnd-kit/core";
import { Card } from "../../../models";
import { ViewDiscard } from "../popups/viewDiscard";
import { useContext } from "react";
import CardView from "../cards/cardView";
import { UiContext, UiDispatchContext } from "../../context/uiContext";
import { UiController } from "../../../controllers";

export function Discard({
  user,
  cards,
  onCardClick,
}: {
  user: string;
  cards: Array<Card>;
  onCardClick: (card: Card) => void;
}) {
  const uiState = useContext(UiContext);
  const processUiAction = useContext(UiDispatchContext);
  const uiController = new UiController(processUiAction, uiState);

  const { setNodeRef } = useDroppable({
    id: "discard",
  });

  return (
    <>
      <div
        id="discardCover"
        className="zone"
        ref={setNodeRef}
        onClick={() => uiController.showDiscard()}
      >
        <div id="discardText" className={`${user}-text`}>
          (<span id="discardCount">{cards.length}</span>)
        </div>
        {cards.length > 0 ? (
          <CardView card={cards[cards.length - 1]}></CardView>
        ) : null}
      </div>
      {uiState?.showDiscard && (
        <ViewDiscard
          cards={cards}
          onClose={() => uiController.clearModal()}
          cssUser={user}
          onCardClick={(card) => onCardClick(card)}
        ></ViewDiscard>
      )}
    </>
  );
}
