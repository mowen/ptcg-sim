import { useRef } from 'react';
import { CardView, useMutationObserver } from '../..';
import { Card } from '../../../models';

// const zoneIds = ['lostZone', 'deck', 'discard', 'attachedCards', 'viewCards'];
// const selfElements = zoneIds.map((zoneId) =>
//   selfContainerDocument.getElementById(zoneId)
// );
// const oppElements = zoneIds.map((zoneId) =>
//   oppContainerDocument.getElementById(zoneId)
// );
// const elements = [...selfElements, ...oppElements];
// const stadiumElement = document.getElementById('stadium');
// const boardButtonContainer = document.getElementById('boardButtonContainer');

// Function to check the display of the elements and update the z-index of stadiumElement
const handleStadiumMutations = (element, mutations) => {
  console.debug(`Stadium mutations`, mutations);
  //   for (let i = 0; i < elements.length; i++) {
  //     if (elements[i].style.display === 'block') {
  //       element.style.zIndex = '-1';
  //       boardButtonContainer.style.zIndex = '-1';
  //       return; // Exit the function if a element is displayed
  //     }
  //   }
  //   // If none of the elements are displayed, set the z-index to 0
  //   element.style.zIndex = '0';
  //   boardButtonContainer.style.zIndex = '0';
};

export function Stadium({ cards }: { cards: Array<Card> }) {
  const stadiumRef = useRef<HTMLDivElement>(null);
  useMutationObserver(stadiumRef, handleStadiumMutations, {
    attributes: true,
    characterData: false,
    childList: false,
    subtree: false,
  });
  return (
    <>
      <div id="stadium" className="zone" ref={stadiumRef}>
        {cards.length > 0 ? <CardView card={cards[0]}></CardView> : null}
      </div>
    </>
  );
}
