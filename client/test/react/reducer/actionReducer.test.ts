import { assert, describe, expect, test } from 'vitest';
import actionReducer from '../../../src/react/reducer/actionReducer';
import { Action, Card, GameState } from '../../../src/models';

const selfLoadDeckDataAction = new Action('self', true, 'loadDeckData', [
  [
    [
      '4',
      'Dreepy',
      'Pokémon',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png',
    ],
    [
      '4',
      'Drakloak',
      'Pokémon',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png',
    ],
    [
      '2',
      'Dragapult ex',
      'Pokémon',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN.png',
    ],
    [
      '2',
      'Lumineon V',
      'Pokémon',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BRS/BRS_040_R_EN.png',
    ],
    [
      '2',
      'Budew',
      'Pokémon',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PRE/PRE_004_R_EN.png',
    ],
    [
      '1',
      'Radiant Alakazam',
      'Pokémon',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_059_R_EN.png',
    ],
    [
      '1',
      'Bloodmoon Ursaluna ex',
      'Pokémon',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_141_R_EN.png',
    ],
    [
      '1',
      'Klefki',
      'Pokémon',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_096_R_EN.png',
    ],
    [
      '1',
      'Fezandipiti ex',
      'Pokémon',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SFA/SFA_038_R_EN.png',
    ],
    [
      '1',
      'Munkidori',
      'Pokémon',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_095_R_EN.png',
    ],
    [
      '4',
      'Arven',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
    ],
    [
      '3',
      'Lance',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_159_R_EN.png',
    ],
    [
      '2',
      "Professor Turo's Scenario",
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_171_R_EN.png',
    ],
    [
      '2',
      'Iono',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_185_R_EN.png',
    ],
    [
      '1',
      "Boss's Orders",
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_172_R_EN.png',
    ],
    [
      '1',
      'Crispin',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SCR/SCR_133_R_EN.png',
    ],
    [
      '4',
      'Buddy-Buddy Poffin',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
    ],
    [
      '3',
      'Ultra Ball',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_196_R_EN.png',
    ],
    [
      '2',
      'Nest Ball',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_181_R_EN.png',
    ],
    [
      '2',
      'Counter Catcher',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_160_R_EN.png',
    ],
    [
      '1',
      'Super Rod',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_188_R_EN.png',
    ],
    [
      '1',
      'Unfair Stamp',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_165_R_EN.png',
    ],
    [
      '1',
      'Switch',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_194_R_EN.png',
    ],
    [
      '1',
      'Earthen Vessel',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_163_R_EN.png',
    ],
    [
      '1',
      'Defiance Vest',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_162_R_EN.png',
    ],
    [
      '1',
      'Forest Seal Stone',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SIT/SIT_156_R_EN.png',
    ],
    [
      '1',
      'Rescue Board',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_159_R_EN.png',
    ],
    [
      '1',
      'Lost City',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/LOR/LOR_161_R_EN.png',
    ],
    [
      '1',
      'Temple of Sinnoh',
      'Trainer',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/ASR/ASR_155_R_EN.png',
    ],
    [
      '4',
      'Psychic Energy',
      'Energy',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png',
    ],
    [
      '3',
      'Fire Energy',
      'Energy',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN.png',
    ],
    [
      '1',
      'Darkness Energy',
      'Energy',
      'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_015_R_EN.png',
    ],
  ],
]);

declare module 'vitest' {
  export interface TestContext {
    setupState: GameState;
  }
}

let setupState = new GameState();

export const reducerTest = test.extend({
  // eslint-disable-next-line no-empty-pattern
  setupState: async ({}, use) => {
    const selfSetupAction = new Action('self', true, 'setup', [
      [
        3, 56, 31, 41, 32, 0, 47, 48, 9, 14, 21, 35, 1, 16, 52, 36, 57, 15, 53,
        38, 10, 42, 18, 29, 22, 7, 40, 13, 37, 5, 44, 58, 55, 51, 46, 28, 2, 43,
        8, 45, 20, 39, 19, 59, 34, 6, 11, 12, 49, 17, 25, 26, 30, 27, 50, 24,
        54, 23, 33, 4,
      ],
    ]);

    const initialState = new GameState();
    setupState = actionReducer(initialState, selfLoadDeckDataAction);
    setupState = actionReducer(setupState, selfSetupAction);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(setupState);

    // cleanup the fixture after each test function
    setupState = new GameState();
  },
});

describe('loadDeckData', () => {
  reducerTest('selfDeckList has 60 cards', () => {
    const oppLoadDeckDataAction = new Action('opp', true, 'loadDeckData', [[]]);

    const initialState = new GameState();
    let state = actionReducer(initialState, selfLoadDeckDataAction);
    state = actionReducer(state, oppLoadDeckDataAction);
    expect(state.selfDeckList.length).toBe(60);
  });

  reducerTest('oppDeckList has 0 cards', () => {
    const oppLoadDeckDataAction = new Action('opp', true, 'loadDeckData', [[]]);

    const initialState = new GameState();
    let state = actionReducer(initialState, selfLoadDeckDataAction);
    state = actionReducer(state, oppLoadDeckDataAction);
    expect(state.oppDeckList.length).toBe(0);
  });
});

describe('setup', () => {
  reducerTest('first card in hand is Dreepy', ({ setupState }) => {
    const firstCardId = setupState.self.hand[0];
    const firstCard = setupState.selfDeckList[firstCardId] as Card;

    expect(firstCard.name).toBe('Dreepy');
    expect(firstCardId).toBe(3);
    expect(firstCard.type).toBe('Pokémon');
  });

  reducerTest('last card in deck is Drakloak', ({ setupState }) => {
    const lastCardId = setupState.self.deck[setupState.self.deck.length - 1];
    const lastCard = setupState.selfDeckList[lastCardId] as Card;
    expect(lastCard.name).toBe('Drakloak');
    expect(lastCardId).toBe(4);
    expect(lastCard.type).toBe('Pokémon');
  });
});

describe('moveCardBundle', () => {
  reducerTest('move from hand to active', ({ setupState }) => {
    assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 0, 47]);

    const moveToActiveAction = new Action('self', true, 'moveCardBundle', [
      'self',
      'hand',
      'active',
      5,
      false,
      'move',
    ]);

    setupState = actionReducer(setupState, moveToActiveAction);

    expect(setupState.self.active[0]).toBe(0);
    assert.sameOrderedMembers(setupState.self.hand, [3, 56, 31, 41, 32, 47]);

    let activeCards = setupState.self.active.map(
      (i) => setupState.selfDeckList[i]
    );
    expect(activeCards).toBeDefined();
    expect(activeCards.length).toBe(1);
    expect(activeCards[0].name).toBe('Dreepy');

    const moveToBenchAction = new Action('self', true, 'moveCardBundle', [
      'self',
      'hand',
      'bench',
      0,
      false,
      'move',
    ]);

    setupState = actionReducer(setupState, moveToBenchAction);

    expect(setupState.self.active[0]).toBe(0);
    assert.sameOrderedMembers(setupState.self.hand, [56, 31, 41, 32, 47]);
    assert.sameOrderedMembers(setupState.self.bench, [3]);

    const firstCardInHand = setupState.selfDeckList[setupState.self.hand[0]];
    const moveHandToActiveAction = new Action('self', true, 'moveCardBundle', [
      'self',
      'hand',
      'active',
      0,
      0,
      'move',
    ]);
    setupState = actionReducer(setupState, moveHandToActiveAction);

    assert.sameOrderedMembers(setupState.self.active, [56]);
    assert.sameOrderedMembers(setupState.self.bench, [0, 3]);

    const benchedCards = setupState.self.bench.map(
      (i) => setupState.selfDeckList[i]
    );
    expect(setupState.self.bench.length).toBe(2); // Active moved to bench
    expect(benchedCards[0].name).toBe('Dreepy'); // Active moved to bench

    activeCards = setupState.self.active.map((i) => setupState.selfDeckList[i]);
    expect(activeCards.length).toBe(1);
    expect(activeCards[0].name).toBe(firstCardInHand.name);
  });
});
