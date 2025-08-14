import { CSSProperties, useState } from "react";
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

  return !wrapWithDiv ? cardImage : <div className={"plain"}>{cardImage}</div>;
}

export default CardView;
