import { useDroppable } from "@dnd-kit/core";
import { Card } from "../../../models";
import CardView from "../cards/cardView";

export function Discard({ user, cards }: { user: string; cards: Array<Card> }) {
  const { setNodeRef } = useDroppable({
    id: "discard",
  });

  return (
    <>
      <div id="discardCover" className="zone" ref={setNodeRef}>
        <div id="discardText" className={`${user}-text`}>
          (<span id="discardCount">{cards.length}</span>)
        </div>
        {cards.length > 0 ? (
          <CardView
            card={cards[cards.length - 1]}
            zoneId="discard"
            zoneIndex={0}
          ></CardView>
        ) : null}
      </div>
    </>
  );
}
