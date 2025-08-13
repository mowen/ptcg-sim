import type { Meta, StoryObj } from "@storybook/react-vite";

import PokemonCard from "./pokemonCard";
import { Card } from "../../../models";

const meta = {
  component: PokemonCard,
} satisfies Meta<typeof PokemonCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoEvolutions: Story = {
  args: {
    card: {
      id: 1,
      name: "Dreepy",
      type: "Pokémon",
      imageUrl:
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png",
      damage: 0,
      energy: [] as Array<Card>,
      evolutions: [
        {
          id: 5,
          name: "Drakloak",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png",
        } as Card,
        {
          id: 8,
          name: "Dragapult ex",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN.png",
        } as Card,
      ],
    } as Card,
  },
};

export const OneEvolution: Story = {
  args: {
    card: {
      id: 1,
      name: "Dreepy",
      type: "Pokémon",
      imageUrl:
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png",
      damage: 0,
      energy: [] as Array<Card>,
      evolutions: [
        {
          id: 5,
          name: "Drakloak",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png",
        } as Card,
      ],
    } as Card,
  },
};

export const DamageCounters: Story = {
  args: {
    card: {
      id: 1,
      name: "Dreepy",
      type: "Pokémon",
      imageUrl:
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png",
      damage: 180,
      energy: [] as Array<Card>,
      evolutions: [
        {
          id: 5,
          name: "Drakloak",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png",
        } as Card,
        {
          id: 8,
          name: "Dragapult ex",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN.png",
        } as Card,
      ],
    } as Card,
  },
};

export const Energy: Story = {
  args: {
    card: {
      id: 1,
      name: "Dreepy",
      type: "Pokémon",
      imageUrl:
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png",
      damage: 0,
      energy: [
        {
          id: 52,
          name: "Psychic Energy",
          type: "Energy",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png",
        },
        {
          id: 56,
          name: "Fire Energy",
          type: "Energy",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN.png",
        },
        {
          id: 57,
          name: "Fire Energy",
          type: "Energy",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_010_R_EN.png",
        },
        {
          id: 53,
          name: "Psychic Energy",
          type: "Energy",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png",
        },
        {
          id: 54,
          name: "Psychic Energy",
          type: "Energy",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png",
        },
        {
          id: 55,
          name: "Psychic Energy",
          type: "Energy",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SVE/SVE_013_R_EN.png",
        },
      ],
      evolutions: [
        {
          id: 5,
          name: "Drakloak",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN.png",
        } as Card,
        {
          id: 8,
          name: "Dragapult ex",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN.png",
        } as Card,
      ],
    } as Card,
  },
};
