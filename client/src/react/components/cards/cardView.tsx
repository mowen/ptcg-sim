import { CSSProperties, useState } from 'react';
import cardBackImage from '../../../assets/cardback.png';
import { Card, UserType } from '../../../models';
// import { AttachedCards } from '../popups/attachedCards';

function CardView({
  card,
  faceUp = true,
  wrapWithDiv = true,
  style = {},
}: {
  card: Card;
  faceUp?: boolean;
  wrapWithDiv?: boolean;
  style?: CSSProperties;
}) {
  // const cssUser = UserType.Self;
  // const [showAttached, setShowAttached] = useState(false);

  const cardImage = faceUp ? (
    <img
      src={card.imageUrl}
      alt={card.name}
      className={'card'}
      style={style}
      // onClick={() => setShowAttached(true)}
    />
  ) : (
    <img
      src={cardBackImage}
      alt="Face down card"
      className={'card'}
      style={style}
    />
  );

  return !wrapWithDiv ? (
    cardImage
  ) : (
    <div className={'plain'}>
      {cardImage}
      {/* {showAttached ? (
        <AttachedCards
          cssUser={cssUser}
          cards={card.attached}
          onClose={() => setShowAttached(false)}
        />
      ) : null} */}
    </div>
  );
}

export default CardView;
