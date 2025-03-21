import { Action, Card, CardLocation, GameState } from '../../models';

export default function reducer(state: GameState, action: Action) {
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
          hand: indices.slice(0, 7),
          prize: indices.slice(7, 13),
          deck: indices.slice(13, 60),
        },
      };
    }
    case 'moveCardBundle': {
      const user = action.user;
      const oZoneId = action.parameters[1] as string;
      const dZoneId = action.parameters[2] as string;
      const sourceIndex = action.parameters[3] as number;
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
    default:
      return state;
  }
}
