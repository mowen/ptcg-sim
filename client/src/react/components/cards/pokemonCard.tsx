import { CSSProperties } from 'react';
import { Card } from '../../../models';
import CardView from './cardView';

import './pokemonCard.css';

const evoVertOffset: number = 0.8;
const energyHorizOffset: number = 0.8;
const cardWidth = 6.3;

function Evolutions({ parent }: { parent: Card }) {
  const evoStyle = (level: number): CSSProperties => ({
    zIndex: level + 1,
    top: `${(level + 1) * evoVertOffset - evoVertOffset}em`,
    position: parent.evolutions.length != level + 2 ? 'relative' : 'absolute',
  });

  return parent.evolutions.map((pokemon, i) => (
    <CardView card={pokemon} wrapWithDiv={false} style={evoStyle(i)} />
  ));
}

function Energies({ parent }: { parent: Card }) {
  const energyStyle = (level: number): CSSProperties => ({
    zIndex: (level + 1) * -1,
    top: '0px',
    left: `${energyHorizOffset + level * energyHorizOffset}em`,
    position: 'absolute',
  });

  return parent.energy.map((energy, i) => (
    <CardView card={energy} wrapWithDiv={false} style={energyStyle(i)} />
  ));
}

function Tool({ parent }: { parent: Card }) {
  const toolStyle: CSSProperties = {
    transform: 'rotate(-90deg)',
    zIndex: -1 * (parent.energy.length + 1),
    position: 'absolute',
    left: '-0.5em',
  };
  return parent.tool ? (
    <CardView card={parent.tool} wrapWithDiv={false} style={toolStyle} />
  ) : null;
}

function Damage({ parent }: { parent: Card }) {
  return parent.damage > 0 ? (
    <div className="damage-counter" contentEditable="true">
      {parent.damage}
    </div>
  ) : null;
}

function PokemonCard({ card }: { card: Card }) {
  const baseStyle = (evoCount: number): CSSProperties => ({
    zIndex: 0,
    top: `${evoCount * -1 * evoVertOffset}em`,
    left: '0em',
    position: evoCount == 0 ? 'relative' : 'absolute',
  });

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
      <Evolutions parent={card} />
      <Energies parent={card} />
      <Tool parent={card} />
      <Damage parent={card} />
    </div>
  );
}

export default PokemonCard;
