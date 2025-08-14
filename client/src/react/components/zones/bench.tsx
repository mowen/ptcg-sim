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
  return (
    <>
      <div id="bench" className="zone">
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
