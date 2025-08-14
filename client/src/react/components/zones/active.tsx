import { Card } from "../../../models";
import PokemonCard from "../cards/pokemonCard";

export function Active({
  cards,
  boardUser,
  cssUser,
}: {
  cards: Array<Card>;
  boardUser: string;
  cssUser: string;
}) {
  return (
    <div id="active" className="zone">
      {cards.map((c: Card, i: number) => (
        <PokemonCard
          key={i}
          card={c}
          boardUser={boardUser}
          cssUser={cssUser}
        ></PokemonCard>
      ))}
    </div>
  );
}
