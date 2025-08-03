import { Card } from '../../../models';
import PokemonCard from '../cards/pokemonCard';

export function Active({ user, cards }: { user: string; cards: Array<Card> }) {
  return (
    <div id="active" className={`${user}-active zone`}>
      {cards.map((c: Card, i: number) => (
        <PokemonCard key={i} card={c}></PokemonCard>
      ))}
    </div>
  );
}
