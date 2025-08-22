import type { Meta, StoryObj } from "@storybook/react-vite";

import { Bench } from "./bench";
import { Card } from "../../../models";

const meta = {
  component: Bench,
} satisfies Meta<typeof Bench>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cards: [
      {
        id: 1,
        name: "Dreepy",
        type: "Pokémon",
        imageUrl:
          "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN_SM.png",
        damage: 40,
        energy: [] as Array<Card>,
        isPokemon: true,
        evolutions: [
          {
            id: 5,
            name: "Drakloak",
            type: "Pokémon",
            isPokemon: true,
            imageUrl:
              "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN_SM.png",
          } as Card,
          {
            id: 8,
            name: "Dragapult ex",
            type: "Pokémon",
            isPokemon: true,
            imageUrl:
              "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN_SM.png",
          } as Card,
        ],
      } as Card,
      {
        id: 2,
        name: "Dreepy",
        type: "Pokémon",
        isPokemon: true,
        imageUrl:
          "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN_SM.png",
        damage: 450,
        energy: [
          {
            id: 52,
            name: "Psychic Energy",
            type: "Energy",
            imageUrl:
              "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN_SM.png",
          },
          {
            id: 56,
            name: "Fire Energy",
            type: "Energy",
            imageUrl:
              "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN_SM.png",
          },
          {
            id: 57,
            name: "Fire Energy",
            type: "Energy",
            imageUrl:
              "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN_SM.png",
          },
          {
            id: 53,
            name: "Psychic Energy",
            type: "Energy",
            imageUrl:
              "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN_SM.png",
          },
          {
            id: 54,
            name: "Psychic Energy",
            type: "Energy",
            imageUrl:
              "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN_SM.png",
          },
          {
            id: 55,
            name: "Psychic Energy",
            type: "Energy",
            imageUrl:
              "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN_SM.png",
          },
        ],
        evolutions: [] as Array<Card>,
      } as Card,
      {
        id: 3,
        name: "Dreepy",
        type: "Pokémon",
        isPokemon: true,
        imageUrl:
          "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN_SM.png",
        damage: 170,
        abilityUsed: true,
        energy: [] as Array<Card>,
        evolutions: [
          {
            id: 6,
            name: "Drakloak",
            type: "Pokémon",
            imageUrl:
              "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN_SM.png",
          } as Card,
        ],
      } as Card,
    ] as Array<Card>,
    boardUser: "self",
    cssUser: "self",
    onCardClick: (card: Card) => {},
  },
};
