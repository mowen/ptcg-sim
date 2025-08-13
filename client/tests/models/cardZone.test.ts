import { expect, test } from "vitest";
import { CardZone } from "../../src/models/boardState";
import {
  BoardStateDTO,
  CardDTO,
  CardLocation,
  PlayerStateDTO,
} from "../../src/models";
import { InvalidZoneError } from "../../src/errors";

const playerState = {
  boardState: new BoardStateDTO(),
  deckList: [
    new CardDTO(0, "Martin", "Pokemon", "https://blah.com/martin.png"),
    new CardDTO(1, "Brian", "Pokemon", "https://blah.com/brian.png"),
    new CardDTO(2, "Whooopy", "Trainer", "https://blah.com/whooopy.png"),
    new CardDTO(3, "Cafe", "Energy", "https://blah.com/cafe.png"),
  ],
} as PlayerStateDTO;

test("a zone with 2 duplicate cards throws an InvalidZoneError", () => {
  playerState.boardState.hand = [1, 2, 3, 3, 0];

  expect(() => new CardZone(playerState, CardLocation.Hand)).toThrow(
    new InvalidZoneError(
      "Duplicate cards detected in Zone 'hand': [Cafe [3] (Energy), Cafe [3] (Energy)]",
    ),
  );
});

test("a zone with 0 duplicate cards does not throw an InvalidZoneError", () => {
  playerState.boardState.hand = [1, 2, 3, 0];

  const hand = new CardZone(playerState, CardLocation.Hand);

  expect(hand.size).toBe(4);
});
