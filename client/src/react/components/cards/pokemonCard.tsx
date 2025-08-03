import { CSSProperties } from 'react';
import { Card } from '../../../models';
import CardView from './cardView';

import './pokemonCard.css';

function PokemonCard({ card }: { card: Card }) {
  const evoVertOffset: number = 0.8;
  const baseStyle = (evoCount: number): CSSProperties => ({
    zIndex: 0,
    top: `${evoCount * -1 * evoVertOffset}em`,
    left: '0em',
    position: evoCount == 0 ? 'relative' : 'absolute',
  });

  const evoStyle = (evoCount: number, level: number): CSSProperties => ({
    zIndex: level,
    top: `${level * evoVertOffset - evoVertOffset}em`,
    position: evoCount != level + 1 ? 'relative' : 'absolute',
  });

  const evolutions = card.evolutions.map((pokemon, i) => {
    i++; // 1 based index
    return (
      <CardView
        card={pokemon}
        wrapWithDiv={false}
        style={evoStyle(card.evolutions.length, i)}
      />
    );
  });

  const energyHorizOffset: number = 0.8;
  const energyStyle = (level: number): CSSProperties => ({
    zIndex: (level + 1) * -1,
    top: '0px',
    left: `${energyHorizOffset + level * energyHorizOffset}em`,
    position: 'absolute',
  });

  const energies = card.energy.map((energy, i) => {
    return (
      <CardView card={energy} wrapWithDiv={false} style={energyStyle(i)} />
    );
  });

  const toolStyle: CSSProperties = {
    transform: 'rotate(-90deg)',
    zIndex: -1 * (card.energy.length + 1),
    position: 'absolute',
    left: '-0.5em',
  };
  const tool = card.tool ? (
    <CardView card={card.tool} wrapWithDiv={false} style={toolStyle} />
  ) : null;

  const damage =
    card.damage > 0 ? (
      <div className="damage-counter" contentEditable="true">
        {card.damage}
      </div>
    ) : null;

  const cardWidth = 6.3; // em
  const pokemonStyle = (energyCount: number): CSSProperties => ({
    width: `${cardWidth + energyCount * energyHorizOffset}em`,
    top: `${evoVertOffset}em`,
    position: 'relative',
  });

  return (
    <div className="pokemon" style={pokemonStyle(card.energy.length)}>
      <CardView
        card={card}
        wrapWithDiv={false}
        style={baseStyle(card.evolutions.length)}
      />
      {evolutions}
      {energies}
      {tool}
      {damage}
    </div>
  );
}

export default PokemonCard;
