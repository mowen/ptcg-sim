import { Card, CardLocation } from '../models/card';
import Action from './action';

export default function reducer(state, action: Action) {
  switch (action.action) {
    case 'VSTARGXFunction': {
      const type: string = (action.parameters[0] as string).toLowerCase();
      const vstarGxUsed = state[`${action.user}BoardState`][`${type}Used`];
      return {
        ...state,
        [`${action.user}BoardState`]: {
          ...state[`${action.user}BoardState`],
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
      const newCards = newCardList.flat(1).reduce((obj, card, i) => {
        obj[i] = card;
        return obj;
      }, {});
      return {
        ...state,
        [`${user}BoardState`]: {
          ...state[`${user}BoardState`],
          cards: newCards,
        },
      };
    }
    case 'setup': {
      const user = action.user;
      const indices = action.parameters[0] as Array<number>;
      const handIndices = indices.slice(0, 7);
      const prizeIndices = indices.slice(7, 13);
      const deckIndices = indices.slice(13, 60);
      return {
        ...state,
        [`${user}BoardState`]: {
          ...state[`${user}BoardState`],
          handIndices,
          prizeIndices,
          deckIndices,
        },
      };
    }
    case 'moveCardBundle': {
      const user = action.user;
      const oZoneId = action.parameters[1] as string;
      const dZoneId = action.parameters[2] as string;
      const index = action.parameters[3] as number;
      const targetIndex = (action.parameters[4] as number) || 0;

      const oZoneIndices = state[`${user}BoardState`][
        `${oZoneId}Indices`
      ].filter((i: number) => i != index);

      const dZoneIndices = state[`${user}BoardState`][`${dZoneId}Indices`];
      const activeIndex = state[`${user}BoardState`][`activeIndices`][0];
      if (dZoneId === CardLocation.Active && activeIndex) {
        // Only one card can be active, so bump the old active to the bench
        return {
          ...state,
          [`${user}BoardState`]: {
            ...state[`${user}BoardState`],
            [`${oZoneId}Indices`]: oZoneIndices,
            [`activeIndices`]: [index], // Move new active to active
            [`benchIndices`]: [
              activeIndex, // Move old active to bench
              ...state[`${user}BoardState`][`benchIndices`],
            ],
          },
        };
      } else {
        const newDZoneIndices = [
          ...dZoneIndices.slice(0, targetIndex),
          index,
          ...dZoneIndices.slice(targetIndex),
        ];
        return {
          ...state,
          [`${user}BoardState`]: {
            ...state[`${user}BoardState`],
            [`${oZoneId}Indices`]: oZoneIndices,
            [`${dZoneId}Indices`]: newDZoneIndices,
          },
        };
      }
    }
    default:
      return state;
  }
}
