import { Card } from "../../../models";
import CardView from "../cards/cardView";
import { useDroppable } from "@dnd-kit/core";

export function Hand({ user, cards }: { user: string; cards: Array<Card> }) {
  const { setNodeRef } = useDroppable({
    id: "hand",
  });

  return (
    <>
      <div id="hand" ref={setNodeRef} className="zone">
        <div id="handLabel">
          <input
            type="checkbox"
            id="sortHandCheckbox"
            className={`${user}-text`}
          />
          <div id="handText" className={`${user}-text`}>
            (<span id="handCount">{cards.length}</span>)
          </div>
          <label style={{ cursor: "pointer" }} htmlFor="sortHandCheckbox">
            <div
              id="sortHandText"
              className={`${user}-text`}
              style={{ display: "inline-block" }}
            >
              Sort
            </div>
          </label>
        </div>
        {cards.map((c: Card, i: number) => (
          <CardView key={i} card={c} zoneId="hand" zoneIndex={i}></CardView>
        ))}
      </div>
    </>
  );
}
