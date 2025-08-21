import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, useContext } from "react";
import cardBackImage from "../../../assets/cardback.png";
import { Card, UserType } from "../../../models";
import { UiContext, UiDispatchContext } from "../../context/uiContext";
import { UiController } from "../../../controllers";
import { AppContext } from "../../context/appContext";

import "./cardView.css";
import classNames from "classnames";

function CardView({
  card,
  faceUp = true,
  wrapWithDiv = true,
  style = {},
}: {
  card: Card;
  faceUp?: boolean;
  wrapWithDiv?: boolean;
  style?: CSSProperties;
}) {
  const processUiAction = useContext(UiDispatchContext);
  const uiState = useContext(UiContext);
  const state = useContext(AppContext);
  if (state === undefined) {
    console.warn("State undefined");
    return;
  }
  const uiController = new UiController(
    state.gameState.activeUser,
    processUiAction,
  );

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
    data: {
      zoneId: card.zoneId,
      zoneIndex: card.zoneIndex,
    },
  });
  const dragStyle = {
    transform: CSS.Translate.toString(transform),
    touchAction: "none",
  };

  const isSelected =
    !!uiState?.selectedCard &&
    card.isEqual(
      uiState.selectedCard.player as UserType,
      uiState.selectedCard.id,
    );
  const imgClass = classNames({
    card: true,
    selected: isSelected,
  });

  const cardImage = faceUp ? (
    <img
      src={card.imageUrl}
      alt={card.name}
      className={imgClass}
      style={style}
      onClick={() => uiController.selectCard(card)}
    />
  ) : (
    <img
      src={cardBackImage}
      alt="Face down card"
      className={imgClass}
      style={style}
    />
  );

  return !wrapWithDiv ? (
    cardImage
  ) : (
    <div
      className={"plain"}
      ref={setNodeRef}
      style={dragStyle}
      {...listeners}
      {...attributes}
    >
      {cardImage}
    </div>
  );
}

export default CardView;
