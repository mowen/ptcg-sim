import {
  Action,
  BoardStateDTO,
  CardDTO,
  CardLocation,
  GameState,
  GameStateDTO,
  UserType,
} from '../../models';

function debugDump(state: GameStateDTO, user: string) {
  const gs = new GameState(state);

  const cardsToString = (cards: Array<CardDTO>): Array<string> =>
    cards.map((c) => `${c.name} - ${c.type}`);

  if (user === UserType.Self) {
    return {
      active: cardsToString(gs.selfActive),
      hand: cardsToString(gs.selfHand),
      bench: cardsToString(gs.selfBench),
      deck: cardsToString(gs.selfDeck),
    };
  } else {
    return {
      active: cardsToString(gs.oppActive),
      hand: cardsToString(gs.oppHand),
      bench: cardsToString(gs.oppBench),
      deck: cardsToString(gs.oppDeck),
    };
  }
}

export default function reducer(
  state: GameStateDTO,
  action: Action
): GameStateDTO {
  const deckSize: number = 60;
  const handSize: number = 7;
  const prizeCount: number = 6;

  switch (action.type) {
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
      const [, oZoneId, dZoneId, sourceIndex, targetIndex] =
        action.parameters as [
          unknown,
          string,
          string,
          number,
          number | boolean | undefined
        ];

      const sourceDeckListIndex = state[user][oZoneId][sourceIndex];

      // If everything is working correctly this should never happen
      if (sourceDeckListIndex === undefined) {
        const source = state[user][oZoneId];
        console.warn(
          `souceCardIndex in moveCardBundle is undefined (${sourceIndex} out of ${source.length})`,
          user,
          oZoneId,
          action,
          debugDump(state, user)
        );
      }

      const sourceCard = state[`${user}DeckList`][sourceDeckListIndex];

      const oZone = state[user][oZoneId];
      const newOZone = [
        ...oZone.slice(0, sourceIndex),
        ...oZone.slice(sourceIndex + 1),
      ];

      const dZone = state[user][dZoneId];
      const activeIndex = state[user].active[0];
      if (
        dZoneId === CardLocation.Active &&
        sourceCard.isPokemon &&
        activeIndex !== undefined && // Just checking (activeIndex) won't work as could be 0 which is falsey
        targetIndex == false // We aren't attaching a card
      ) {
        // Only one Pokemon can be active, so bump the old active to the bench
        return {
          ...state,
          [user]: {
            ...state[user],
            active: [sourceDeckListIndex], // Move new active to active
            bench: [
              ...state[user].bench,
              activeIndex, // Move old active to bench
            ],
            [oZoneId]: newOZone, // Could be bench and overwrite bench above
          },
        };
      } else if (dZoneId === CardLocation.Stadium) {
        // Only one stadium can be active
        const otherUser = user === UserType.Self ? UserType.Opp : UserType.Self;
        const existingStadiumIndex = state[otherUser].stadium[0];
        return {
          ...state,
          [user]: {
            ...state[user],
            [oZoneId]: newOZone,
            stadium: [sourceDeckListIndex],
          },
          [otherUser]: {
            ...state[otherUser],
            stadium: [], // Discard the other user's stadium
            discard: [...state[otherUser].discard, existingStadiumIndex],
          },
        };
      } else {
        // If targetIndex is set we are attaching to a target
        if (targetIndex === 0 || targetIndex != false) {
          // A 0 index is falsey
          const targetDeckListIndex = state[user][dZoneId][targetIndex];
          const newAttached = state[user].attached[targetDeckListIndex]
            ? [
                sourceDeckListIndex,
                ...state[user].attached[targetDeckListIndex],
              ]
            : [sourceDeckListIndex];

          return {
            ...state,
            [user]: {
              ...state[user],
              [oZoneId]: newOZone,
              // [dZoneId]: [...dZone, sourceDeckListIndex],
              attached: {
                ...state[user].attached,
                [targetDeckListIndex]: newAttached,
              },
            },
          };
        } else {
          return {
            ...state,
            [user]: {
              ...state[user],
              [oZoneId]: newOZone,
              [dZoneId]: [...dZone, sourceDeckListIndex],
            },
          };
        }
      }
    }
    case 'takeTurn': {
      const user = action.user;
      const deck = state[user].deck;
      const hand = state[user].hand;
      const topDeckId = deck[0];
      return {
        ...state,
        turn: state.turn + 1,
        [user]: {
          ...state[user],
          hand: [...hand, topDeckId],
          deck: [...deck.slice(1, deck.length)],
        },
      };
    }
    case 'reset': {
      const user = action.user;
      const boardState = new BoardStateDTO();
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
    case 'pass':
    case 'attack': {
      const user = action.user;
      const board = state[user].board;
      const discard = state[user].discard;
      return {
        ...state,
        [user]: {
          ...state[user],
          board: [],
          discard: [board, ...discard].flat(1),
          abilityUsed: {},
        },
      };
    }
    case 'draw': {
      const [user, count] = action.parameters as [string, number];
      const deck = state[user].deck;
      const hand = state[user].hand;
      return {
        ...state,
        [user]: {
          ...state[user],
          hand: [...hand, deck.slice(0, count)].flat(1),
          deck: [...deck.slice(count, deck.length)],
        },
      };
    }
    case 'addDamageCounter': {
      const user = action.user;
      const [oZoneId, sourceIndex, amount] = action.parameters as [
        string,
        number,
        string
      ];
      const sourceDeckListIndex = state[user][oZoneId][sourceIndex];
      const currentDamage = state[user].damage[sourceDeckListIndex] ?? 0;
      return {
        ...state,
        [user]: {
          ...state[user],
          damage: {
            ...state[user].damage,
            [sourceDeckListIndex]: currentDamage + parseInt(amount),
          },
        },
      };
    }
    case 'updateDamageCounter': {
      const user = action.user;
      const [oZoneId, sourceIndex, amount] = action.parameters as [
        string,
        number,
        string
      ];
      const sourceDeckListIndex = state[user][oZoneId][sourceIndex];
      return {
        ...state,
        [user]: {
          ...state[user],
          damage: {
            ...state[user].damage,
            [sourceDeckListIndex]: parseInt(amount),
          },
        },
      };
    }
    case 'removeDamageCounter': {
      const user = action.user;
      const [oZoneId, sourceIndex] = action.parameters as [string, number];
      const sourceDeckListIndex = state[user][oZoneId][sourceIndex];
      const { [sourceDeckListIndex]: _, ...newDamage } = state[user].damage;
      return {
        ...state,
        [user]: {
          ...state[user],
          damage: newDamage,
        },
      };
    }
    default:
      console.warn(`Action type ${action.type} was not processed`, action);
      return state;
  }
}
