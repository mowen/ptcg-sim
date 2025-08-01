import { useRef } from 'react';
import { Card } from '../../../models';
import CardView from '../cards/cardView';
// import useMutationObserver from '../../hooks/useMutationObserver';

// const handleHandMutations = (element, mutations) => {
//   mutations.forEach((mutation) => {
//     if (mutation.type === 'childList') {
//       adjustAlignment(element);
//     }
//   });
// };

export function Hand({ user, cards }: { user: string; cards: Array<Card> }) {
  const handRef = useRef<HTMLDivElement>(null);
  // useMutationObserver(handRef, handleHandMutations, {
  //   attributes: false,
  //   characterData: false,
  //   childList: true,
  //   subtree: false,
  // });

  return (
    <>
      <div id="hand" ref={handRef} className="zone">
        <div id="handLabel">
          <input
            type="checkbox"
            id="sortHandCheckbox"
            className={`${user}-text`}
          />
          <div id="handText" className={`${user}-text`}>
            (<span id="handCount">{cards.length}</span>)
          </div>
          <label style={{ cursor: 'pointer' }} htmlFor="sortHandCheckbox">
            <div
              id="sortHandText"
              className={`${user}-text`}
              style={{ display: 'inline-block' }}
            >
              Sort
            </div>
          </label>
        </div>
        {cards.map((c: Card, i: number) => (
          <CardView key={i} card={c}></CardView>
        ))}
      </div>
    </>
  );
}
