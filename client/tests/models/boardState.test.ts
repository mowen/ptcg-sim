import { expect, test } from 'vitest';
import { BoardState } from '../../src/models/boardState';
import { BoardStateDTO, CardDTO } from '../../src/models';
import { InvalidBoardStateError } from '../../src/errors';

const deckList = [
  new CardDTO(0, 'Martin', 'Pokemon', 'https://blah.com/martin.png'),
  new CardDTO(1, 'Brian', 'Pokemon', 'https://blah.com/brian.png'),
  new CardDTO(2, 'Whooopy', 'Trainer', 'https://blah.com/whooopy.png'),
  new CardDTO(3, 'Cafe', 'Energy', 'https://blah.com/cafe.png'),
  new CardDTO(4, 'Blah', 'Pokemon', 'https://blah.com/blah.png'),
  new CardDTO(5, 'Whatever', 'Trainer', 'https://blah.com/what.png'),
];

const boardStateData = new BoardStateDTO();

test('a board state with only 5 cards and a decklist of 6 cards throws an InvalidBoardStateError', () => {
  boardStateData.active = [4];
  boardStateData.hand = [1, 2, 0];
  boardStateData.deck = [5];

  const boardState = new BoardState(boardStateData, deckList);
  expect(() => boardState.validate()).toThrow(InvalidBoardStateError);
});

test('a board state with 6 cards and a decklist of 6 cards does not throw an InvalidBoardStateError', () => {
  boardStateData.active = [4];
  boardStateData.hand = [2, 3, 0];
  boardStateData.deck = [5, 1];

  const boardState = new BoardState(boardStateData, deckList);
  boardState.validate();

  expect(boardState.active.length).toBe(1);
  expect(boardState.hand.length).toBe(3);
  expect(boardState.deck.length).toBe(2);
});
