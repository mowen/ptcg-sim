import { useDroppable } from "@dnd-kit/core";
import { Card } from "../../../models";
import CardView from "../cards/cardView";

export function PlayBoard({
  user,
  cards,
}: {
  user: string;
  cards: Array<Card>;
}) {
  const { setNodeRef } = useDroppable({
    id: "board",
  });

  return (
    <div id="board" className={`${user}-board zone`} ref={setNodeRef}>
      {cards.map((c: Card, i) => (
        <CardView key={i} card={c}></CardView>
      ))}
    </div>
  );
}
