import { CSSProperties } from 'react';
import { Card } from '../../../models';
import CardView from './cardView';

import './pokemonCard.css';

function PokemonCard({
  card,
  faceUp = true,
}: {
  card: Card;
  faceUp?: boolean;
}) {
  const baseStyle = (evoCount: number): CSSProperties => ({
    zIndex: 0,
    top: `${evoCount * -1 * evoVertOffset}px`,
    left: '0px',
  });

  const evoVertOffset: number = 10;
  const evoStyle = (level: number): CSSProperties => ({
    zIndex: level,
    top: `${level * evoVertOffset - evoVertOffset}px`,
    position: 'absolute',
  });

  const evolutions = card.evolutions.map((pokemon, i) => {
    i++; // 1 based index
    return (
      <CardView
        card={pokemon}
        faceUp={faceUp}
        wrapWithDiv={false}
        style={evoStyle(i)}
      />
    );
  });

  const energyHorizOffset: number = 10;
  const energyStyle = (level: number): CSSProperties => ({
    zIndex: (level + 1) * -1,
    top: '0px',
    left: `${energyHorizOffset + level * energyHorizOffset}px`,
    position: 'absolute',
  });

  const energies = card.energy.map((energy, i) => {
    return (
      <CardView
        card={energy}
        faceUp={faceUp}
        wrapWithDiv={false}
        style={energyStyle(i)}
      />
    );
  });

  const damage =
    card.damage > 0 ? (
      <div className="damage-counter" contentEditable="true">
        {card.damage}
      </div>
    ) : null;

  const cardWidth = 7; // em
  const pokemonStyle = (energyCount: number): CSSProperties => ({
    width: `${cardWidth + energyCount * 0.4}em`,
  });

  return (
    <div className="pokemon" style={pokemonStyle(card.energy.length)}>
      <CardView
        card={card}
        faceUp={faceUp}
        wrapWithDiv={false}
        style={baseStyle(card.evolutions.length)}
      />
      {evolutions}
      {energies}
      {damage}
    </div>
  );
}

export default PokemonCard;
