import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import cardBackImage from "../../../assets/cardback.png";
import { Card } from "../../../models";

import "./cardView.css";

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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });
  const dragStyle = {
    transform: CSS.Translate.toString(transform),
  };

  const cardImage = faceUp ? (
    <img src={card.imageUrl} alt={card.name} className={"card"} style={style} />
  ) : (
    <img
      src={cardBackImage}
      alt="Face down card"
      className={"card"}
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
