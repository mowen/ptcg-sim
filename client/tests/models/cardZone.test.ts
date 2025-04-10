import { expect, test } from 'vitest';
import { CardZone } from '../../src/models/boardState';
import { BoardStateDTO, CardDTO, CardLocation } from '../../src/models';
import { InvalidZoneError } from '../../src/errors';

const deckList = [
  new CardDTO(0, 'Martin', 'Pokemon', 'https://blah.com/martin.png'),
  new CardDTO(1, 'Brian', 'Pokemon', 'https://blah.com/brian.png'),
  new CardDTO(2, 'Whooopy', 'Trainer', 'https://blah.com/whooopy.png'),
  new CardDTO(3, 'Cafe', 'Energy', 'https://blah.com/cafe.png'),
];

const boardState = new BoardStateDTO();

test('a zone with 2 duplicate cards throws an InvalidZoneError', () => {
  boardState.hand = [1, 2, 3, 3, 0];

  expect(() => new CardZone(CardLocation.Hand, boardState, deckList)).toThrow(
    InvalidZoneError
  );
});

test('a zone with 0 duplicate cards does not throw an InvalidZoneError', () => {
  boardState.hand = [1, 2, 3, 0];

  const hand = new CardZone(CardLocation.Hand, boardState, deckList);

  expect(hand.size).toBe(4);
});
