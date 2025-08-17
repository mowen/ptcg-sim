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
import { MissingCardError } from "../../../errors";

const evoVertOffset: number = 0.8;
const energyHorizOffset: number = 0.8;
const cardWidth = 6.3;

function getAttachedIndex(attachedCard: Card, parent: Card): number {
  const attachedIndex = parent.attachedIndexOf(attachedCard);
  if (attachedIndex == null) {
    throw new MissingCardError(
      `Card with ID '${attachedCard.id}' was not found attached to Card ID '${parent.id}'. Parent: ${parent.toString()}`,
    );
  }
  return attachedIndex;
}

function Evolutions({ parent, zoneId }: { parent: Card; zoneId: string }) {
  const evoStyle = (level: number): CSSProperties => ({
    zIndex: level + 1,
    top: `${(level + 1) * evoVertOffset - evoVertOffset}em`,
    position: parent.evolutions.length != level + 2 ? "relative" : "absolute",
  });

  return parent.evolutions.map((pokemon, i) => {
    const attachedIndex = getAttachedIndex(pokemon, parent);
    return (
      <CardView
        card={pokemon}
        zoneId={zoneId}
        zoneIndex={attachedIndex}
        wrapWithDiv={false}
        style={evoStyle(i)}
      />
    );
  });
}

function Energies({ parent, zoneId }: { parent: Card; zoneId: string }) {
  const energyStyle = (level: number): CSSProperties => ({
    zIndex: (level + 1) * -1,
    top: "0px",
    left: `${energyHorizOffset + level * energyHorizOffset}em`,
    position: "absolute",
  });

  return parent.energy.map((energy, i) => {
    const attachedIndex = getAttachedIndex(energy, parent);
    return (
      <CardView
        card={energy}
        zoneId={zoneId}
        zoneIndex={attachedIndex}
        wrapWithDiv={false}
        style={energyStyle(i)}
      />
    );
  });
}

function Tool({
  parent,
  tool,
  zoneId,
}: {
  parent: Card;
  tool: Card;
  zoneId: string;
}) {
  const toolStyle: CSSProperties = {
    transform: "rotate(-90deg)",
    zIndex: -1 * (parent.energy.length + 1),
    position: "absolute",
    left: "-0.5em",
  };
  const attachedIndex = getAttachedIndex(tool, parent);
  return (
    <CardView
      card={tool}
      zoneId={zoneId}
      zoneIndex={attachedIndex}
      wrapWithDiv={false}
      style={toolStyle}
    />
  );
}

function Damage({ parent }: { parent: Card }) {
  return parent.damage > 0 ? (
    <div className="damage-counter" contentEditable="true">
      {parent.damage}
    </div>
  ) : null;
}

function PokemonCard({
  card,
  boardUser,
  cssUser,
  zoneId,
  zoneIndex,
}: {
  card: Card;
  boardUser: string;
  cssUser: string;
  zoneId: string;
  zoneIndex: number;
}) {
  const uiState = useContext(UiContext);
  const state = useContext(AppContext);
  const processUiAction = useContext(UiDispatchContext);
  const uiController = new UiController(boardUser, processUiAction);

  const cardStyle: CSSProperties = {
    zIndex: 0,
    top: `${card.evolutions.length * -1 * evoVertOffset}em`,
    left: "0em",
    position: card.evolutions.length == 0 ? "relative" : "absolute",
  };

  const pokemonStyle: CSSProperties = {
    width: `${cardWidth + card.energy.length * energyHorizOffset}em`,
    top: `${evoVertOffset}em`,
    position: "relative",
  };

  const showAttached =
    uiState?.showAttached &&
    boardUser === state?.gameState.activeUser &&
    uiState.showAttached[boardUser] &&
    uiState.showAttached[boardUser] == card.id;

  const droppable = useDroppable({
    id: `pokemon${card.id}`,
    data: {
      zoneId,
      zoneIndex,
    },
  });

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
    data: {
      zoneId,
      zoneIndex,
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
        <CardView
          card={card}
          zoneId={zoneId}
          zoneIndex={zoneIndex}
          wrapWithDiv={false}
          style={cardStyle}
        />
        <Evolutions parent={card} zoneId={zoneId} />
        <Energies parent={card} zoneId={zoneId} />
        {card.tool && <Tool parent={card} tool={card.tool} zoneId={zoneId} />}
        <Damage parent={card} />
        {showAttached && (
          <AttachedCards
            cssUser={cssUser}
            cards={card.attached}
            zoneId={zoneId}
            onClose={() => uiController.clearModal()}
          />
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
