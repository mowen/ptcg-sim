import { useDroppable } from "@dnd-kit/core";
import { Card, UiStateDTO, UserType } from "../../../models";
import CardView from "../cards/cardView";
import PokemonCard from "../cards/pokemonCard";

export function Bench({
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
    id: "bench",
  });

  return (
    <>
      <div id="bench" className="zone" ref={setNodeRef}>
        {cards.map((c: Card, i: number) =>
          c.isPokemon ? (
            <PokemonCard
              key={i}
              card={c}
              boardUser={boardUser}
              cssUser={cssUser}
              onClick={(card) => onCardClick(card)}
            ></PokemonCard>
          ) : (
            <CardView
              key={i}
              card={c}
              onClick={(card) => onCardClick(card)}
            ></CardView>
          ),
        )}
      </div>
    </>
  );
}
