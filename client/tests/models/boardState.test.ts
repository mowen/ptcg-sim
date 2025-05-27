import { expect, test } from 'vitest';
import { BoardState } from '../../src/models/boardState';
import { BoardStateDTO, CardDTO, PlayerStateDTO } from '../../src/models';
import { InvalidBoardStateError } from '../../src/errors';

const deckList = [
  new CardDTO(0, 'Martin', 'Pokemon', 'https://blah.com/martin.png'),
  new CardDTO(1, 'Brian', 'Pokemon', 'https://blah.com/brian.png'),
  new CardDTO(2, 'Whooopy', 'Trainer', 'https://blah.com/whooopy.png'),
  new CardDTO(3, 'Cafe', 'Energy', 'https://blah.com/cafe.png'),
  new CardDTO(4, 'Blah', 'Pokemon', 'https://blah.com/blah.png'),
  new CardDTO(5, 'Whatever', 'Trainer', 'https://blah.com/what.png'),
  new CardDTO(6, 'Hello', 'Trainer', 'https://blah.com/hello.png'),
];

const boardStateData = new BoardStateDTO();

test('a board state with only 5 cards and a decklist of 7 cards throws an InvalidBoardStateError', () => {
  boardStateData.active = [4];
  boardStateData.hand = [1, 0];
  boardStateData.deck = [5];
  boardStateData.bench = [6];
  boardStateData.discard = [];

  expect(
    () =>
      new BoardState({ boardState: boardStateData, deckList } as PlayerStateDTO)
  ).toThrow(
    new InvalidBoardStateError(
      'Total number of cards on board is only 5, should be 7. Missing cards: [Whooopy [2] (Trainer),\nCafe [3] (Energy)]'
    )
  );
});

test('a board state with only 2 duplicate cards and a decklist of 7 cards throws an InvalidBoardStateError', () => {
  boardStateData.active = [4];
  boardStateData.hand = [1, 0];
  boardStateData.deck = [1, 5];
  boardStateData.bench = [5, 6];
  boardStateData.discard = [];

  expect(
    () =>
      new BoardState({ boardState: boardStateData, deckList } as PlayerStateDTO)
  ).toThrow(
    new InvalidBoardStateError(
      'Duplicate cards detected. Total cards on board: 7, should be 7. Duplicate cards: [{ Zone: hand, Card: Brian [1] (Pokemon) },\n{ Zone: bench, Card: Whatever [5] (Trainer) },\n{ Zone: deck, Card: Brian [1] (Pokemon) },\n{ Zone: deck, Card: Whatever [5] (Trainer) }]'
    )
  );
});

test('a board state with 7 cards and a decklist of 7 cards does not throw an InvalidBoardStateError', () => {
  boardStateData.active = [4];
  boardStateData.hand = [2, 3, 0];
  boardStateData.deck = [5, 1];
  boardStateData.bench = [6];
  boardStateData.discard = [];

  const boardState = new BoardState({
    boardState: boardStateData,
    deckList,
  } as PlayerStateDTO);

  expect(boardState.active.length).toBe(1);
  expect(boardState.hand.length).toBe(3);
  expect(boardState.deck.length).toBe(2);
  expect(boardState.bench.length).toBe(1);
  expect(boardState.discard.length).toBe(0);
});

test('a board state with 0 cards and a decklist of 7 cards does not throw an InvalidBoardStateError as setup has not been called', () => {
  expect(
    new BoardState({
      boardState: new BoardStateDTO(),
      deckList,
    } as PlayerStateDTO)
  );
});
