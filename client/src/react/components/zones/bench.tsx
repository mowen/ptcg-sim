import { Card } from "../../../models";
import CardView from "../cards/cardView";
import PokemonCard from "../cards/pokemonCard";

export function Bench({ cards }: { cards: Array<Card> }) {
  return (
    <>
      <div id="bench" className="zone">
        {cards.map((c: Card, i: number) =>
          c.isPokemon ? (
            <PokemonCard key={i} card={c}></PokemonCard>
          ) : (
            <CardView key={i} card={c}></CardView>
          ),
        )}
      </div>
    </>
  );
}
