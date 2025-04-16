import {
  ActionDTO,
  BoardStateDTO,
  Card,
  CardDTO,
  CardLocation,
  GameStateDTO,
} from '../../models';
import { debugDump } from '../../util';
import { getOtherPlayer, userToPlayer } from '../../util/util';

export default function reducer(draft: GameStateDTO, action: ActionDTO): void {
  const deckSize: number = 60;
  const handSize: number = 7;
  const prizeCount: number = 6;

  const player = userToPlayer(action.user);

  switch (action.type) {
    case 'VSTARGXFunction': {
      const type: string = (action.parameters[0] as string).toLowerCase();
      const vstarGxUsed = draft[player].boardState[`${type}Used`];
      draft[player].boardState[`${type}Used`] = !vstarGxUsed;
      break;
    }
    case 'loadDeckData': {
      const cardList = action.parameters[0] as Array<unknown>;
      let deckListIndex = 0;
      const newCardList = cardList.map((card) => {
        const list = new Array<CardDTO>();
        const [cardCount, name, type, imageUrl] = card as [
          number,
          string,
          string,
          string
        ];
        for (let i = 0; i < cardCount; i++) {
          list.push(new CardDTO(deckListIndex, name, type, imageUrl));
          deckListIndex++;
        }
        return list;
      });
      draft[player].deckList = newCardList.flat(1);
      break;
    }
    case 'setup': {
      const indices = action.parameters[0] as Array<number>;
      draft[player].boardState.hand = indices.slice(0, handSize);
      draft[player].boardState.prize = indices.slice(
        handSize,
        handSize + prizeCount
      );
      draft[player].boardState.deck = indices.slice(
        handSize + prizeCount,
        deckSize
      );
      break;
    }
    case 'moveCardBundle': {
      const [, oZoneId, dZoneId, sourceIndex, targetIndex] =
        action.parameters as [
          unknown,
          string,
          string,
          number,
          number | boolean | undefined
        ];

      const sourceDeckListIndex =
        draft[player].boardState[oZoneId][sourceIndex];
      const targetDeckListIndex =
        draft[player].boardState[dZoneId][targetIndex];

      // If everything is working correctly this should never happen
      if (sourceDeckListIndex === undefined) {
        const source = draft[player].boardState[oZoneId];
        console.warn(
          `souceCardIndex in moveCardBundle is undefined (${sourceIndex} out of ${source.length})`,
          action.user,
          oZoneId,
          action,
          debugDump(draft, action.user)
        );
      }

      const sourceCard = new Card(
        draft[player].deckList,
        draft[player].boardState,
        sourceDeckListIndex
      );

      const targetCard: Card =
        targetDeckListIndex !== undefined
          ? new Card(
              draft[player].deckList,
              draft[player].boardState,
              targetDeckListIndex
            )
          : null;

      const activeIndex = draft[player].boardState.active[0];
      if (
        dZoneId === CardLocation.Active &&
        sourceCard.isPokemon &&
        activeIndex !== undefined && // Just checking (activeIndex) won't work as could be 0 which is falsey
        !targetCard // We aren't attaching a card
      ) {
        // Only one Pokemon can be active, so bump the old active to the bench
        draft[player].boardState.active = [sourceDeckListIndex]; // Move new active to active
        draft[player].boardState.bench.push(
          activeIndex // Move old active to bench
        );
        draft[player].boardState[oZoneId].splice(sourceIndex, 1); // Could be bench and overwrite bench above
        break;
      } else if (dZoneId === CardLocation.Stadium) {
        // Only one stadium can be active
        const otherPlayer = getOtherPlayer(player);
        const existingStadiumIndex = draft[otherPlayer].boardState.stadium[0];
        draft[player].boardState[oZoneId].splice(sourceIndex, 1);
        draft[player].boardState.stadium = [sourceDeckListIndex];
        if (existingStadiumIndex == undefined) {
          draft[otherPlayer].boardState.stadium = [];
          break;
        } else {
          draft[otherPlayer].boardState.stadium = []; // Discard the other user's stadium
          draft[otherPlayer].boardState.discard.push(existingStadiumIndex);
          break;
        }
      } else {
        // If targetIndex is set we are attaching to a target
        if (targetCard) {
          // A 0 index is falsey
          const newAttached = draft[player].boardState.attached[
            targetDeckListIndex
          ]
            ? [
                sourceDeckListIndex,
                ...draft[player].boardState.attached[targetDeckListIndex],
              ]
            : [sourceDeckListIndex];

          draft[player].boardState[oZoneId].splice(sourceIndex, 1);
          draft[player].boardState.attached[targetDeckListIndex] = newAttached;
          break;
        } else {
          draft[player].boardState[oZoneId].splice(sourceIndex, 1);
          draft[player].boardState[dZoneId].push(sourceDeckListIndex);
          break;
        }
      }
    }
    case 'takeTurn': {
      const topDeckId = draft[player].boardState.deck[0];
      draft[player].boardState.deck.shift();
      draft[player].boardState.hand.push(topDeckId);
      draft.turn++;
      break;
    }
    case 'reset': {
      const boardState = new BoardStateDTO();
      boardState.deck = [...Array(60).keys()];
      draft[player].boardState = boardState;
      break;
    }
    case 'shuffleAll': {
      const [user, zoneId, newIndices] = action.parameters as [
        string,
        string,
        Array<number>
      ];
      draft[player].boardState[zoneId] = newIndices;
      break;
    }
    case 'discardBoard': {
      const board = draft[player].boardState.board;
      board.forEach((c) => draft[player].boardState.discard.push(c));
      draft[player].boardState.board = [];
      break;
    }
    case 'pass':
    case 'attack': {
      const board = draft[player].boardState.board;
      board.forEach((c) => draft[player].boardState.discard.push(c));
      draft[player].boardState.board = [];
      draft[player].boardState.abilityUsed = [];
      break;
    }
    case 'draw': {
      const [user, count] = action.parameters as [string, number];
      draft[player].boardState.deck.slice(0, count).map((c) => {
        draft[player].boardState.hand.push(c);
        draft[player].boardState.deck.shift();
      });
      break;
    }
    case 'addDamageCounter': {
      const [oZoneId, sourceIndex, amount] = action.parameters as [
        string,
        number,
        string
      ];
      const sourceDeckListIndex =
        draft[player].boardState[oZoneId][sourceIndex];
      const currentDamage =
        draft[player].boardState.damage[sourceDeckListIndex] ?? 0;
      draft[player].boardState.damage[sourceDeckListIndex] =
        currentDamage + parseInt(amount);
      break;
    }
    case 'updateDamageCounter': {
      const [oZoneId, sourceIndex, amount] = action.parameters as [
        string,
        number,
        string
      ];
      const sourceDeckListIndex =
        draft[player].boardState[oZoneId][sourceIndex];
      draft[player].boardState.damage[sourceDeckListIndex] = parseInt(amount);
      break;
    }
    case 'removeDamageCounter': {
      const [oZoneId, sourceIndex] = action.parameters as [string, number];
      const sourceDeckListIndex =
        draft[player].boardState[oZoneId][sourceIndex];
      delete draft[player].boardState.damage[sourceDeckListIndex];
      break;
    }
    default:
      console.warn(`Action type ${action.type} was not processed`, action);
      break;
  }
}
