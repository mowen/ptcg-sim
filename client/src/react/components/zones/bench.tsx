import { useDroppable } from "@dnd-kit/core";
import { Card } from "../../../models";
import CardView from "../cards/cardView";
import PokemonCard from "../cards/pokemonCard";

export function Bench({
  cards,
  boardUser,
  cssUser,
}: {
  cards: Array<Card>;
  boardUser: string;
  cssUser: string;
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
            ></PokemonCard>
          ) : (
            <CardView key={i} card={c}></CardView>
          ),
        )}
      </div>
    </>
  );
}
