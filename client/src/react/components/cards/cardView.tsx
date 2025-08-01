import { useState } from 'react';
import cardBackImage from '../../../assets/cardback.png';
import { Card, UserType } from '../../../models';
import { AttachedCards } from '../popups/attachedCards';

function CardView({
  card,
  faceUp = true,
  className,
}: {
  card: Card;
  faceUp?: boolean;
  className?: string;
}) {
  const cssUser = UserType.Self;
  const [showAttached, setShowAttached] = useState(false);

  return (
    <>
      {faceUp ? (
        <img
          src={card.imageUrl}
          alt={card.name}
          className={`${className ?? ''} card`}
          onClick={() => setShowAttached(true)}
        />
      ) : (
        <img
          src={cardBackImage}
          alt="Face down card"
          className={`${className ?? ''} card`}
        />
      )}
      {/* {showAttached ? (
        <AttachedCards
          cssUser={cssUser}
          cards={card.attached}
          onClose={() => setShowAttached(false)}
        />
      ) : null} */}
    </>
  );
}

export default CardView;
