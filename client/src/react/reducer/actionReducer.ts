import { InvalidSourceCardError } from "../../errors";
import {
  ActionDTO,
  BoardStateDTO,
  Card,
  CardDTO,
  CardLocation,
  GameStateDTO,
  UserType,
} from "../../models";
import { getOtherUser } from "../../util/util";

function mapAttached(boardState: BoardStateDTO, zoneId: string): Array<number> {
  return boardState[zoneId]
    .map((c: number) =>
      boardState.attached[c] != undefined
        ? [c, boardState.attached[c].map((at) => at)]
        : c,
    )
    .flat(Infinity);
}

function findAttachedParent(
  boardState: BoardStateDTO,
  cardId: number,
): number | undefined {
  const parentId = Object.keys(boardState.attached).map((pId: string) => {
    const parentId = parseInt(pId);
    if (boardState.attached[parentId].includes(cardId)) return parentId;
  })[0];
  if (parentId === undefined) {
    console.warn(`parent cardId of cardId: ${cardId} was undefined`);
  }
  return parentId;
}

export default function reducer(draft: GameStateDTO, action: ActionDTO): void {
  const deckSize: number = 60;
  const handSize: number = 7;
  const prizeCount: number = 6;

  const user = action.user as UserType;

  switch (action.type) {
    case "VSTARGXFunction": {
      const type: string = (action.parameters[0] as string).toLowerCase();
      const vstarGxUsed = draft[user].boardState[`${type}Used`];
      draft[user].boardState[`${type}Used`] = !vstarGxUsed;
      break;
    }
    case "loadDeckData": {
      const cardList = action.parameters[0] as Array<unknown>;
      let deckListIndex = 0;
      const newCardList = cardList.map((card) => {
        const list = new Array<CardDTO>();
        const [cardCount, name, type, imageUrl] = card as [
          number,
          string,
          string,
          string,
        ];
        for (let i = 0; i < cardCount; i++) {
          list.push(new CardDTO(deckListIndex, name, type, imageUrl));
          deckListIndex++;
        }
        return list;
      });
      draft[user].deckList = newCardList.flat(1);
      break;
    }
    case "setup": {
      const indices = action.parameters[0] as Array<number>;
      draft[user].boardState.hand = indices.slice(0, handSize);
      draft[user].boardState.prize = indices.slice(
        handSize,
        handSize + prizeCount,
      );
      draft[user].boardState.deck = indices.slice(
        handSize + prizeCount,
        deckSize,
      );
      break;
    }
    case "moveCardBundle": {
      const [, oZoneId, dZoneId, sourceIndex, targetIndex] =
        action.parameters as [
          unknown,
          string,
          string,
          number,
          number | boolean | undefined,
        ];

      let sourceDeckListIndex = draft[user].boardState[oZoneId][sourceIndex];
      if (sourceDeckListIndex == undefined) {
        // source is attached
        const zoneWithAttached = mapAttached(draft[user].boardState, oZoneId);
        const source = zoneWithAttached;
        sourceDeckListIndex = source[sourceIndex];
        if (sourceDeckListIndex == undefined) {
          throw new InvalidSourceCardError(
            `souceCardIndex ${sourceIndex} in moveCardBundle is undefined. source length: ${source.length}.`,
          );
        } else {
          // Find the parent and remove the source card from its list of attached cards
          const parentId = findAttachedParent(
            draft[user].boardState,
            sourceDeckListIndex,
          );
          if (parentId !== undefined) {
            draft[user].boardState.attached[parentId] = draft[
              user
            ].boardState.attached[parentId].filter(
              (c) => c !== sourceDeckListIndex,
            );
          }
        }
      }

      const sourceCard = new Card(draft[user], sourceDeckListIndex);

      if (typeof targetIndex === "number") {
        // We are attaching a card
        const targetDeckListIndex =
          draft[user].boardState[dZoneId][targetIndex];

        if (draft[user].boardState.attached[targetDeckListIndex]) {
          draft[user].boardState.attached[targetDeckListIndex].push(
            sourceDeckListIndex,
          );
        } else {
          draft[user].boardState.attached[targetDeckListIndex] = [
            sourceDeckListIndex,
          ];
        }

        draft[user].boardState[oZoneId].splice(sourceIndex, 1);
        break;
      } else {
        const activeIndex = draft[user].boardState.active[0];
        if (
          dZoneId === CardLocation.Active &&
          sourceCard.isPokemon &&
          activeIndex !== undefined // Just checking (activeIndex) won't work as could be 0 which is falsey
        ) {
          // Only one Pokemon can be active, so bump the old active to the bench
          draft[user].boardState.active = [sourceDeckListIndex]; // Move new active to active
          draft[user].boardState.bench.push(
            activeIndex, // Move old active to bench
          );
          draft[user].boardState[oZoneId].splice(sourceIndex, 1); // Could be bench and overwrite bench above
          break;
        } else if (dZoneId === CardLocation.Stadium) {
          // Only one stadium can be active
          const otheruser = getOtherUser(user);
          const existingStadiumIndex = draft[otheruser].boardState.stadium[0];
          draft[user].boardState[oZoneId].splice(sourceIndex, 1);
          draft[user].boardState.stadium = [sourceDeckListIndex];
          if (existingStadiumIndex == undefined) {
            draft[otheruser].boardState.stadium = [];
            break;
          } else {
            draft[otheruser].boardState.stadium = []; // Discard the other user's stadium
            draft[otheruser].boardState.discard.push(existingStadiumIndex);
            break;
          }
        } else {
          draft[user].boardState[oZoneId].splice(sourceIndex, 1);
          draft[user].boardState[dZoneId].push(sourceDeckListIndex);
          break;
        }
      }
    }
    case "takeTurn": {
      const topDeckId = draft[user].boardState.deck.shift();
      if (topDeckId !== undefined) {
        draft[user].boardState.hand.push(topDeckId);
      }
      draft[user].boardState.turn++;
      break;
    }
    case "reset": {
      const boardState = new BoardStateDTO();
      boardState.deck = [...Array(60).keys()];
      draft[user].boardState = boardState;
      break;
    }
    case "shuffleAll": {
      const [, zoneId, newIndices] = action.parameters as [
        unknown,
        string,
        Array<number>,
      ];
      draft[user].boardState[zoneId] = newIndices.map(
        (newIndex) => draft[user].boardState[zoneId][newIndex],
      );
      break;
    }
    case "discardBoard": {
      const board = draft[user].boardState.board;
      board.forEach((c) => draft[user].boardState.discard.push(c));
      draft[user].boardState.board = [];
      break;
    }
    case "pass":
    case "attack": {
      const board = draft[user].boardState.board;
      board.forEach((c) => draft[user].boardState.discard.push(c));
      draft[user].boardState.board = [];
      draft[user].boardState.abilityUsed = [];
      break;
    }
    case "draw": {
      const [, count] = action.parameters as [unknown, number];
      draft[user].boardState.deck.slice(0, count).map((c) => {
        draft[user].boardState.hand.push(c);
        draft[user].boardState.deck.shift();
      });
      break;
    }
    case "addDamageCounter": {
      const [oZoneId, sourceIndex, amount] = action.parameters as [
        string,
        number,
        string,
      ];
      const sourceDeckListIndex = draft[user].boardState[oZoneId][sourceIndex];
      const currentDamage =
        draft[user].boardState.damage[sourceDeckListIndex] ?? 0;
      draft[user].boardState.damage[sourceDeckListIndex] =
        currentDamage + parseInt(amount);
      break;
    }
    case "updateDamageCounter": {
      const [oZoneId, sourceIndex, amount] = action.parameters as [
        string,
        number,
        string,
      ];
      const sourceDeckListIndex = draft[user].boardState[oZoneId][sourceIndex];
      draft[user].boardState.damage[sourceDeckListIndex] = parseInt(amount);
      break;
    }
    case "removeDamageCounter": {
      const [oZoneId, sourceIndex] = action.parameters as [string, number];
      const sourceDeckListIndex = draft[user].boardState[oZoneId][sourceIndex];
      delete draft[user].boardState.damage[sourceDeckListIndex];
      break;
    }
    default:
      console.warn(`Action type ${action.type} was not processed`, action);
      break;
  }
}
