import { expect, test } from "vitest";
import { BoardState } from "../../src/models/boardState";
import {
  BoardStateDTO,
  Card,
  CardDTO,
  CardLocation,
  PlayerStateDTO,
} from "../../src/models";
import { immerable } from "immer";

const deckList = [
  new CardDTO(0, "Martin", "Pokémon", "https://blah.com/martin.png"),
  new CardDTO(1, "Brian", "Pokémon", "https://blah.com/brian.png"),
  new CardDTO(2, "Whooopy", "Trainer", "https://blah.com/whooopy.png"),
  new CardDTO(3, "Cafe", "Energy", "https://blah.com/cafe.png"),
  new CardDTO(4, "Blah", "Pokémon", "https://blah.com/blah.png"),
  new CardDTO(5, "Whatever", "Trainer", "https://blah.com/what.png"),
  new CardDTO(6, "Hello", "Trainer", "https://blah.com/hello.png"),
];

const boardState = {
  active: [4],
  hand: [2, 3, 0],
  deck: [5, 1],
  bench: [6],
  discard: [] as Array<number>,
  lostZone: [] as Array<number>,
  prize: [] as Array<number>,
  board: [] as Array<number>,
  stadium: [] as Array<number>,
  attached: {} as Record<number, number[]>,
  specialCondition: {},
  abilityUsed: [] as Array<number>,
  damage: {} as Record<number, number>,
  turn: 1,
  gxUsed: false,
  vstarUsed: false,
  [immerable]: true,
} as BoardStateDTO;

const playerState = {
  [immerable]: true,
  boardState,
  deckList,
} as PlayerStateDTO;

test("a Card has a correct zoneId", () => {
  const card = new Card(playerState, 3);
  expect(card.zoneId).toBe(CardLocation.Hand);
});

test("a Card has a correct zoneIndex", () => {
  const card = new Card(playerState, 3);
  expect(card.zoneIndex).toBe(1);
});

test("a Card has a correct name", () => {
  const card = new Card(playerState, 3);
  expect(card.name).toBe("Cafe");
});

test("a Card is a trainer. card isTrainer is true", () => {
  const card = new Card(playerState, 2);
  expect(card.isTrainer).toBeTruthy();
});

test("a Card is a pokemon. card isPokemon is true", () => {
  const card = new Card(playerState, 0);
  expect(card.isPokemon).toBeTruthy();
});

test("a Card is an energy. card isEnergy is true", () => {
  const card = new Card(playerState, 3);
  expect(card.isEnergy).toBeTruthy();
});

test("a Card has special condition 'P'. the card isPoisoned", () => {
  playerState.boardState.specialCondition[4] = "P";
  const card = new Card(playerState, 4);

  expect(card.isPoisoned).toBeTruthy();
  expect(card.isParalyzed).toBeFalsy();
  expect(card.isConfused).toBeFalsy();
  expect(card.isBurned).toBeFalsy();
  expect(card.isAsleep).toBeFalsy();
});

test("a Card has special condition 'A'. the card isAsleep", () => {
  playerState.boardState.specialCondition[4] = "A";
  const card = new Card(playerState, 4);

  expect(card.isPoisoned).toBeFalsy();
  expect(card.isParalyzed).toBeFalsy();
  expect(card.isConfused).toBeFalsy();
  expect(card.isBurned).toBeFalsy();
  expect(card.isAsleep).toBeTruthy();
});

test("a Card has special condition 'C'. the card isConfused", () => {
  playerState.boardState.specialCondition[4] = "C";
  const card = new Card(playerState, 4);

  expect(card.isPoisoned).toBeFalsy();
  expect(card.isParalyzed).toBeFalsy();
  expect(card.isConfused).toBeTruthy();
  expect(card.isBurned).toBeFalsy();
  expect(card.isAsleep).toBeFalsy();
});

test("a Card has special condition 'PA'. the card isParalyzed", () => {
  playerState.boardState.specialCondition[4] = "PA";
  const card = new Card(playerState, 4);

  expect(card.isPoisoned).toBeFalsy();
  expect(card.isParalyzed).toBeTruthy();
  expect(card.isConfused).toBeFalsy();
  expect(card.isBurned).toBeFalsy();
  expect(card.isAsleep).toBeFalsy();
});

test("a Card has special condition 'B'. the card isBurned", () => {
  playerState.boardState.specialCondition[4] = "B";
  const card = new Card(playerState, 4);

  expect(card.isPoisoned).toBeFalsy();
  expect(card.isParalyzed).toBeFalsy();
  expect(card.isConfused).toBeFalsy();
  expect(card.isBurned).toBeTruthy();
  expect(card.isAsleep).toBeFalsy();
});

test("a Card has damage 140. the card damage is 140", () => {
  playerState.boardState.damage[4] = 140;
  const card = new Card(playerState, 4);

  expect(card.damage).toEqual(140);
});

test("a Card has no damage. the card damage is 0", () => {
  playerState.boardState.damage[4] = 140;
  const card = new Card(playerState, 5);

  expect(card.damage).toEqual(0);
});

test("a Card's ability is used. the card abilityUsed is true", () => {
  playerState.boardState.abilityUsed = [4];
  const card = new Card(playerState, 4);

  expect(card.abilityUsed).toBeTruthy();
});

test("a Card's ability is not used. the card abilityUsed is false", () => {
  playerState.boardState.abilityUsed = [4];
  const card = new Card(playerState, 5);

  expect(card.abilityUsed).toBeFalsy();
});
