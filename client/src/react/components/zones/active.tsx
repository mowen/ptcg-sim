import { Card } from '../../../models';
import PokemonCard from '../cards/pokemonCard';

export function Active({ cards }: { cards: Array<Card> }) {
  return (
    <div id="active" className="zone">
      {cards.map((c: Card, i: number) => (
        <PokemonCard key={i} card={c}></PokemonCard>
      ))}
    </div>
  );
}
