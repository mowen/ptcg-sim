import cardBackImage from '../../../assets/cardback.png';
import { Card } from '../../../models';

function CardView({
  card,
  faceUp = true,
  className,
}: {
  card: Card;
  faceUp?: boolean;
  className?: string;
}) {
  return faceUp ? (
    <img
      src={card.imageUrl}
      alt={card.name}
      className={`${className ?? ''} card`}
    />
  ) : (
    <img
      src={cardBackImage}
      alt="Face down card"
      className={`${className ?? ''} card`}
    />
  );
}

export default CardView;
