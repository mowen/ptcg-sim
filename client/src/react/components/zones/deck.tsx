import { useContext } from "react";
import { Card } from "../../../models";
import { CardView, UiContext, UiDispatchContext, ViewDeck } from "../..";
import { UiController } from "../../../controllers";

export function Deck({
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

  return (
    <>
      <div
        id="deckCover"
        className="zone"
        onClick={() => uiController.showDeck()}
      >
        <div id="deckText" className={`${user}-text`}>
          (<span id="deckCount">{cards.length}</span>)
        </div>
        {cards.length > 0 ? (
          <CardView card={cards[0]} faceUp={false}></CardView>
        ) : null}
      </div>
      {uiState?.showDeck && (
        <ViewDeck
          cards={cards}
          onClose={() => uiController.clearModal()}
          cssUser={user}
          onCardClick={(card) => onCardClick(card)}
        ></ViewDeck>
      )}
    </>
  );
}
