import { useRef } from 'react';
import { CardDTO } from '../../../models';
import CardView from '../cards/cardView';
import useMutationObserver from '../../hooks/useMutationObserver';

export function PlayBoard({
  user,
  cards,
}: {
  user: string;
  cards: Array<CardDTO>;
}) {
  const scrollToBottom = (element) => {
    element.scrollTop = element.scrollHeight;
  };

  const handleBoardMutations = (element, mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        scrollToBottom(element);
      }
    });
  };

  const boardRef = useRef<HTMLDivElement>(null);
  useMutationObserver(boardRef, handleBoardMutations, {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: false,
  });

  return (
    <div id="board" className={`${user}-board`} ref={boardRef}>
      {cards.map((c: CardDTO, i) => (
        <CardView key={i} card={c}></CardView>
      ))}
    </div>
  );
}
