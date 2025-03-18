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
      const newCards = cardList.map((card) => {
        const list = new Array<Card>();
        const cardCount = card[0] as number;
        for (let i = 0; i < cardCount; i++) {
          list.push(new Card(card[1], card[2], card[3]));
        }
        return list;
      });
      return {
        ...state,
        [`${user}BoardState`]: {
          ...state[`${user}BoardState`],
          cards: newCards.flat(1),
        },
      };
    }
    case 'setup': {
      const user = action.user;
      const indices = action.parameters[0] as Array<number>;
      const newCards = state[`${user}BoardState`].cards.map(
        (card: Card, index: number) => {
          card.index = indices[index];
          if (card.index < 7) {
            card.location = CardLocation.Hand;
          } else if (card.index < 13) {
            card.location = CardLocation.Prize;
          }
          return card;
        }
      );
      return {
        ...state,
        [`${user}BoardState`]: {
          ...state[`${user}BoardState`],
          cards: newCards,
        },
      };
    }
    case 'moveCardBundle': {
      const user = action.user;
      const dZoneId = action.parameters[2] as string;
      const index = action.parameters[3] as number;
      const newCards = state[`${user}BoardState`].cards.map((card: Card) => {
        if (card.index === index) {
          card.location = dZoneId;
        }
        return card;
      });
      return {
        ...state,
        [`${user}BoardState`]: {
          ...state[`${user}BoardState`],
          cards: newCards,
        },
      };
    }
    default:
      return state;
  }
}
