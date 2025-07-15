import { Card } from '../../../models';
import CardView from './cardView';

import './pokemonCard.css';

function PokemonCard({
  card,
  faceUp = true,
  className,
}: {
  card: Card;
  faceUp?: boolean;
  className?: string;
}) {
  return (
    <>
      <CardView
        card={card}
        faceUp={faceUp}
        className={`evo-level-0 ${className}`}
      />
      {card.evolutions.map((pokemon, i) => {
        i++; // 1 based index
        return (
          <CardView
            card={pokemon}
            faceUp={faceUp}
            className={`evo-level-${i} ${className}`}
          />
        );
      })}
      {card.energy.map((energy, i) => {
        return (
          <CardView
            card={energy}
            faceUp={faceUp}
            className={`energy-level-${i} ${className}`}
          />
        );
      })}
      {card.damage > 0 ? (
        <div className="damage-counter" contentEditable="true">
          {card.damage}
        </div>
      ) : null}
    </>
  );
}

export default PokemonCard;
