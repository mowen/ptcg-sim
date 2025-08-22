import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import cardBackImage from "../../../assets/cardback.png";
import { Card } from "../../../models";
import classNames from "classnames";

import "./cardView.css";

function CardView({
  card,
  faceUp = true,
  wrapWithDiv = true,
  style = {},
  onClick = (card: Card) => {},
}: {
  card: Card;
  faceUp?: boolean;
  wrapWithDiv?: boolean;
  style?: CSSProperties;
  onClick?: (card: Card) => void;
}) {
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

  const imgClass = classNames({
    card: true,
    selected: card.isSelected,
  });

  const cardImage = faceUp ? (
    <img
      src={card.imageUrl}
      alt={card.name}
      className={imgClass}
      style={style}
      onClick={() => onClick(card)}
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
