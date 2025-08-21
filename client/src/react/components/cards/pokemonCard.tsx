import { CSSProperties, useContext } from "react";
import { Card } from "../../../models";
import CardView from "./cardView";
import { UiContext, UiDispatchContext } from "../../context/uiContext";
import { AttachedCards } from "../popups/attachedCards";
import { AppContext } from "../../context/appContext";
import { UiController } from "../../../controllers";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import "./pokemonCard.css";

const evoVertOffset: number = 0.8;
const energyHorizOffset: number = 0.8;
const cardWidth = 6.3;

function Evolutions({ parent }: { parent: Card }) {
  const evoStyle = (level: number): CSSProperties => ({
    zIndex: level + 1,
    top: `${(level + 1) * evoVertOffset}em`,
    position: parent.evolutions.length != level + 2 ? "relative" : "absolute",
  });

  return parent.evolutions.map((pokemon, i) => (
    <CardView card={pokemon} wrapWithDiv={false} style={evoStyle(i)} />
  ));
}

function Energies({ parent }: { parent: Card }) {
  const energyStyle = (level: number): CSSProperties => ({
    zIndex: (level + 1) * -1,
    top: `${parent.evolutions.length * evoVertOffset}em`,
    left: `${energyHorizOffset + level * energyHorizOffset}em`,
    position: "absolute",
  });

  return parent.energy.map((energy, i) => (
    <CardView card={energy} wrapWithDiv={false} style={energyStyle(i)} />
  ));
}

function Tool({ parent, tool }: { parent: Card; tool: Card }) {
  const toolStyle: CSSProperties = {
    transform: "rotate(-90deg)",
    zIndex: -1 * (parent.energy.length + 1),
    position: "absolute",
    left: "-0.5em",
  };
  return <CardView card={tool} wrapWithDiv={false} style={toolStyle} />;
}

function Damage({ parent }: { parent: Card }) {
  const topOffset = -7.5;
  const style: CSSProperties = {
    top: `${topOffset + evoVertOffset * parent.evolutions.length}em`,
  };
  return parent.damage > 0 ? (
    <div className="damage-counter" contentEditable="true" style={style}>
      {parent.damage}
    </div>
  ) : null;
}

function PokemonCard({
  card,
  boardUser,
  cssUser,
}: {
  card: Card;
  boardUser: string;
  cssUser: string;
}) {
  const uiState = useContext(UiContext);
  const state = useContext(AppContext);
  const processUiAction = useContext(UiDispatchContext);
  const uiController = new UiController(boardUser, processUiAction);

  const cardStyle: CSSProperties = {
    zIndex: 0,
    left: "0em",
    position: card.evolutions.length == 0 ? "relative" : "absolute",
  };

  const pokemonStyle: CSSProperties = {
    width: `${cardWidth + card.energy.length * energyHorizOffset}em`,
    position: "relative",
  };

  if (card.damage > 0) {
    // For some reason adding the damage counter requires increasing the top
    pokemonStyle.top = `${evoVertOffset * (2 - card.evolutions.length)}em`;
  } else if (card.evolutions.length == 0) {
    pokemonStyle.top = `${evoVertOffset}em`;
  }

  const showAttached =
    uiState?.showAttached &&
    boardUser === state?.gameState.activeUser &&
    uiState.showAttached[boardUser] &&
    uiState.showAttached[boardUser] == card.id;

  const droppable = useDroppable({
    id: `pokemon${card.id}`,
    data: {
      zoneId: card.zoneId,
      zoneIndex: card.zoneIndex,
    },
  });

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

  return (
    <div
      className="pokemon"
      style={pokemonStyle}
      onClick={() => uiController.showAttached(boardUser, card)}
      ref={droppable.setNodeRef}
    >
      <div
        className="cardBundle"
        ref={setNodeRef}
        style={dragStyle}
        {...listeners}
        {...attributes}
      >
        <CardView card={card} wrapWithDiv={false} style={cardStyle} />
        <Evolutions parent={card} />
        <Energies parent={card} />
        {card.tool && <Tool parent={card} tool={card.tool} />}
        <Damage parent={card} />
        {showAttached && (
          <AttachedCards
            cssUser={cssUser}
            cards={card.attached}
            onClose={() => uiController.clearModal()}
          />
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
