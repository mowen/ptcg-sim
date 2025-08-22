import { useDroppable } from "@dnd-kit/core";
import { Card } from "../../../models";
import PokemonCard from "../cards/pokemonCard";

export function Active({
  cards,
  boardUser,
  cssUser,
  onCardClick,
}: {
  cards: Array<Card>;
  boardUser: string;
  cssUser: string;
  onCardClick: (card: Card) => void;
}) {
  const { setNodeRef } = useDroppable({
    id: "active",
  });

  return (
    <div id="active" className="zone" ref={setNodeRef}>
      {cards.map((c: Card, i: number) => (
        <PokemonCard
          key={i}
          card={c}
          boardUser={boardUser}
          cssUser={cssUser}
          onClick={(card) => onCardClick(card)}
        ></PokemonCard>
      ))}
    </div>
  );
}
