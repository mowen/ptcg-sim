import { useRef } from 'react';
import { CardView, useMutationObserver } from '../..';
import { CardDTO, GameStateDTO } from '../../../models';

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

const getCurrentStadiumCard = (state: GameStateDTO): CardDTO => {
  const selfStadium = state.self.stadium.length;
  if (selfStadium > 0) return state.selfDeckList[selfStadium[0]];
  else {
    const oppStadium = state.opp.stadium.length;
    if (oppStadium > 0) {
      return state.oppDeckList[oppStadium[0]];
    }
  }
  return null; // Neither player has a stadium
};

export function Stadium({ state }: { state: GameStateDTO }) {
  const stadium: CardDTO = getCurrentStadiumCard(state);
  const stadiumRef = useRef<HTMLDivElement>(null);
  useMutationObserver(stadiumRef, handleStadiumMutations, {
    attributes: true,
    characterData: false,
    childList: false,
    subtree: false,
  });
  return (
    <>
      <div id="stadium" className="outline" ref={stadiumRef}>
        {stadium ? <CardView card={stadium}></CardView> : null}
      </div>
    </>
  );
}
