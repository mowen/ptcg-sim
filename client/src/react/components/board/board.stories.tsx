import type { Meta, StoryObj } from '@storybook/react-vite';

import { Board } from './board';
import { immerable } from 'immer';
import { CardDTO } from '../../../models';
// import { AppContext } from '../../context/appContext';

// function processAction(action: ActionDTO) {
//   console.log(`Got Action:`, action);
// }

const meta = {
  component: Board,
  // decorators: [
  //   (Story) => (
  //     <AppContext.Provider value={state}>
  //       <AppDispatchContext.Provider value={processAction}>
  //         <Story />
  //       </AppDispatchContext.Provider>
  //     </AppContext.Provider>;
  //   ),
  // ],
} satisfies Meta<typeof Board>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cssUser: 'self',
    boardUser: 'self',
    playerState: {
      deckList: [
        {
          deckListIndex: 0,
          name: 'Gimmighoul',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SSP/SSP_097_R_EN.png',
        },
        {
          deckListIndex: 1,
          name: 'Gimmighoul',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SSP/SSP_097_R_EN.png',
        },
        {
          deckListIndex: 2,
          name: 'Gimmighoul',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SSP/SSP_097_R_EN.png',
        },
        {
          deckListIndex: 3,
          name: 'Gimmighoul',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SSP/SSP_097_R_EN.png',
        },
        {
          deckListIndex: 4,
          name: 'Gholdengo ex',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_139_R_EN.png',
        },
        {
          deckListIndex: 5,
          name: 'Gholdengo ex',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_139_R_EN.png',
        },
        {
          deckListIndex: 6,
          name: 'Gholdengo ex',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_139_R_EN.png',
        },
        {
          deckListIndex: 7,
          name: 'Gholdengo ex',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_139_R_EN.png',
        },
        {
          deckListIndex: 8,
          name: 'Gholdengo',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SSP/SSP_131_R_EN.png',
        },
        {
          deckListIndex: 9,
          name: 'Fezandipiti ex',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SFA/SFA_038_R_EN.png',
        },
        {
          deckListIndex: 10,
          name: 'Radiant Greninja',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/ASR/ASR_046_R_EN.png',
        },
        {
          deckListIndex: 11,
          name: 'Munkidori',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_095_R_EN.png',
        },
        {
          deckListIndex: 12,
          name: 'Spiritomb',
          type: 'Pokémon',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_089_R_EN.png',
        },
        {
          deckListIndex: 13,
          name: 'Arven',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
        },
        {
          deckListIndex: 14,
          name: 'Arven',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
        },
        {
          deckListIndex: 15,
          name: 'Arven',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/OBF/OBF_186_R_EN.png',
        },
        {
          deckListIndex: 16,
          name: "Ciphermaniac's Codebreaking",
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_145_R_EN.png',
        },
        {
          deckListIndex: 17,
          name: "Ciphermaniac's Codebreaking",
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_145_R_EN.png',
        },
        {
          deckListIndex: 18,
          name: "Ciphermaniac's Codebreaking",
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_145_R_EN.png',
        },
        {
          deckListIndex: 19,
          name: "Boss's Orders",
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_172_R_EN.png',
        },
        {
          deckListIndex: 20,
          name: "Boss's Orders",
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_172_R_EN.png',
        },
        {
          deckListIndex: 21,
          name: "Professor Turo's Scenario",
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_171_R_EN.png',
        },
        {
          deckListIndex: 22,
          name: 'Roxanne',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/ASR/ASR_150_R_EN.png',
        },
        {
          deckListIndex: 23,
          name: 'Superior Energy Retrieval',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_189_R_EN.png',
        },
        {
          deckListIndex: 24,
          name: 'Superior Energy Retrieval',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_189_R_EN.png',
        },
        {
          deckListIndex: 25,
          name: 'Superior Energy Retrieval',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_189_R_EN.png',
        },
        {
          deckListIndex: 26,
          name: 'Superior Energy Retrieval',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_189_R_EN.png',
        },
        {
          deckListIndex: 27,
          name: 'Buddy-Buddy Poffin',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
        },
        {
          deckListIndex: 28,
          name: 'Buddy-Buddy Poffin',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
        },
        {
          deckListIndex: 29,
          name: 'Buddy-Buddy Poffin',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
        },
        {
          deckListIndex: 30,
          name: 'Buddy-Buddy Poffin',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TEF/TEF_144_R_EN.png',
        },
        {
          deckListIndex: 31,
          name: 'Nest Ball',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_181_R_EN.png',
        },
        {
          deckListIndex: 32,
          name: 'Nest Ball',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_181_R_EN.png',
        },
        {
          deckListIndex: 33,
          name: 'Ultra Ball',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_196_R_EN.png',
        },
        {
          deckListIndex: 34,
          name: 'Ultra Ball',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_196_R_EN.png',
        },
        {
          deckListIndex: 35,
          name: 'Night Stretcher',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SFA/SFA_061_R_EN.png',
        },
        {
          deckListIndex: 36,
          name: 'Night Stretcher',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SFA/SFA_061_R_EN.png',
        },
        {
          deckListIndex: 37,
          name: 'Pokégear 3.0',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_186_R_EN.png',
        },
        {
          deckListIndex: 38,
          name: 'Pokégear 3.0',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_186_R_EN.png',
        },
        {
          deckListIndex: 39,
          name: 'Energy Search Pro',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SSP/SSP_176_R_EN.png',
        },
        {
          deckListIndex: 40,
          name: 'Earthen Vessel',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_163_R_EN.png',
        },
        {
          deckListIndex: 41,
          name: 'Hisuian Heavy Ball',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/ASR/ASR_146_R_EN.png',
        },
        {
          deckListIndex: 42,
          name: 'Switch',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_194_R_EN.png',
        },
        {
          deckListIndex: 43,
          name: 'Pal Pad',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVI/SVI_182_R_EN.png',
        },
        {
          deckListIndex: 44,
          name: 'Lost Vacuum',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/LOR/LOR_162_R_EN.png',
        },
        {
          deckListIndex: 45,
          name: 'Technical Machine: Evolution',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAR/PAR_178_R_EN.png',
        },
        {
          deckListIndex: 46,
          name: 'PokéStop',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PGO/PGO_068_R_EN.png',
        },
        {
          deckListIndex: 47,
          name: 'PokéStop',
          type: 'Trainer',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PGO/PGO_068_R_EN.png',
        },
        {
          deckListIndex: 48,
          name: 'Metal Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_016_R_EN.png',
        },
        {
          deckListIndex: 49,
          name: 'Metal Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_016_R_EN.png',
        },
        {
          deckListIndex: 50,
          name: 'Metal Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_016_R_EN.png',
        },
        {
          deckListIndex: 51,
          name: 'Darkness Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_015_R_EN.png',
        },
        {
          deckListIndex: 52,
          name: 'Darkness Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_015_R_EN.png',
        },
        {
          deckListIndex: 53,
          name: 'Water Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_011_R_EN.png',
        },
        {
          deckListIndex: 54,
          name: 'Water Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_011_R_EN.png',
        },
        {
          deckListIndex: 55,
          name: 'Grass Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_009_R_EN.png',
        },
        {
          deckListIndex: 56,
          name: 'Fire Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN.png',
        },
        {
          deckListIndex: 57,
          name: 'Lightning Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_012_R_EN.png',
        },
        {
          deckListIndex: 58,
          name: 'Psychic Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png',
        },
        {
          deckListIndex: 59,
          name: 'Fighting Energy',
          type: 'Energy',
          imageUrl:
            'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_014_R_EN.png',
        },
      ] as Array<CardDTO>,
      boardState: {
        [immerable]: true,
        gxUsed: false,
        vstarUsed: false,
        hand: [44, 34, 22, 8, 39, 33, 12],
        prize: [32, 35, 11, 25, 47, 49],
        deck: [
          31, 41, 57, 50, 19, 42, 40, 26, 9, 29, 20, 38, 58, 16, 14, 43, 27, 36,
          37, 13, 17, 53, 46, 59, 5, 18, 10, 23, 24, 51, 21, 7, 52, 30, 48, 56,
          55,
        ],
        bench: [2, 3, 1],
        active: [0],
        discard: [28, 15, 45],
        board: [],
        lostZone: [],
        stadium: [],
        attached: {
          '0': [54],
          '1': [4],
          '2': [6],
        },
        damage: {
          '0': 40,
        },
        abilityUsed: [],
        turn: 5,
      },
      [immerable]: true,
    },
  },
};
