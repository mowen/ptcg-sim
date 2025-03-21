import {
  Action,
  BoardState,
  Card,
  CardLocation,
  GameState,
} from '../../models';

export default function reducer(state: GameState, action: Action) {
  const deckSize: number = 60;
  const handSize: number = 7;
  const prizeCount: number = 6;

  switch (action.action) {
    case 'VSTARGXFunction': {
      const type: string = (action.parameters[0] as string).toLowerCase();
      const vstarGxUsed = state[action.user][`${type}Used`];
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          [`${type}Used`]: !vstarGxUsed,
        },
      };
    }
    case 'loadDeckData': {
      const user = action.user;
      const cardList = action.parameters[0] as Array<unknown>;
      const newCardList = cardList.map((card) => {
        const list = new Array<Card>();
        const cardCount = card[0] as number;
        for (let i = 0; i < cardCount; i++) {
          list.push(new Card(card[1], card[2], card[3]));
        }
        return list;
      });
      return {
        ...state,
        [`${user}DeckList`]: newCardList.flat(1),
      };
    }
    case 'setup': {
      const user = action.user;
      const indices = action.parameters[0] as Array<number>;
      return {
        ...state,
        [user]: {
          ...state[user],
          hand: indices.slice(0, handSize),
          prize: indices.slice(handSize, handSize + prizeCount),
          deck: indices.slice(handSize + prizeCount, deckSize),
        },
      };
    }
    case 'moveCardBundle': {
      const user = action.user;
      const [, oZoneId, dZoneId, sourceIndex] = action.parameters as [
        unknown,
        string,
        string,
        number
      ];
      const targetIndex = (action.parameters[4] as number) || 0;

      const sourceCardIndex = state[user][oZoneId][sourceIndex];

      const oZone = state[user][oZoneId];
      const newOZone = [
        ...oZone.slice(0, sourceIndex),
        ...oZone.slice(sourceIndex + 1),
      ];

      const dZone = state[user][dZoneId];
      const activeIndex = state[user].active[0];
      if (dZoneId === CardLocation.Active && activeIndex !== undefined) {
        // Only one card can be active, so bump the old active to the bench
        return {
          ...state,
          [user]: {
            ...state[user],
            active: [sourceCardIndex], // Move new active to active
            bench: [
              activeIndex, // Move old active to bench
              ...state[user].bench,
            ],
            [oZoneId]: newOZone, // Could be bench and overwrite bench above
          },
        };
      } else {
        const newDZone = [
          ...dZone.slice(0, targetIndex),
          sourceCardIndex,
          ...dZone.slice(targetIndex),
        ];
        return {
          ...state,
          [user]: {
            ...state[user],
            [oZoneId]: newOZone,
            [dZoneId]: newDZone,
          },
        };
      }
    }
    case 'takeTurn': {
      const user = action.user;
      const deck = state[user].deck;
      const hand = state[user].hand;
      const topDeckId = deck[0];
      return {
        ...state,
        [user]: {
          ...state[user],
          hand: [...hand, topDeckId],
          deck: [...deck.slice(1, deck.length)],
        },
      };
    }
    case 'reset': {
      const user = action.user;
      const boardState = new BoardState();
      boardState.deck = [...Array(60).keys()];
      return {
        ...state,
        [user]: boardState,
      };
    }
    case 'shuffleAll': {
      const [user, zoneId, newIndices] = action.parameters as [
        string,
        string,
        Array<number>
      ];
      return {
        ...state,
        [user]: {
          ...state[user],
          [zoneId]: newIndices,
        },
      };
    }
    case 'discardBoard': {
      const user = action.user;
      const board = state[user].board;
      const discard = state[user].discard;
      return {
        ...state,
        [user]: {
          ...state[user],
          board: [],
          discard: [board, ...discard].flat(1),
        },
      };
    }
    default:
      return state;
  }
}
