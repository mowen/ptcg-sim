import type { Meta, StoryObj } from "@storybook/react-vite";

import PokemonCard from "./pokemonCard";
import { Card, GameStateDTO, UiStateDTO } from "../../../models";
import { withReactContext } from "storybook-react-context";
import { AppContext } from "../../context/appContext";
import { UiContext } from "../../context/uiContext";

const meta = {
  component: PokemonCard,
  decorators: [withReactContext],
  parameters: {
    reactContext: {
      contexts: [
        {
          context: AppContext,
          contextValue: {
            gameState: new GameStateDTO(),
          },
        },
        {
          context: UiContext,
          contextValue: new UiStateDTO(),
        },
      ],
    },
  },
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
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN_SM.png",
      damage: 0,
      energy: [] as Array<Card>,
      evolutions: [
        {
          id: 5,
          name: "Drakloak",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN_SM.png",
        } as Card,
        {
          id: 8,
          name: "Dragapult ex",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN_SM.png",
        } as Card,
      ],
    } as Card,
    boardUser: "self",
    cssUser: "self",
  },
};

export const OneEvolution: Story = {
  args: {
    card: {
      id: 1,
      name: "Dreepy",
      type: "Pokémon",
      imageUrl:
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN_SM.png",
      damage: 0,
      energy: [] as Array<Card>,
      evolutions: [
        {
          id: 5,
          name: "Drakloak",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN_SM.png",
        } as Card,
      ],
    } as Card,
    boardUser: "self",
    cssUser: "self",
  },
};

export const DamageCounters: Story = {
  args: {
    card: {
      id: 1,
      name: "Dreepy",
      type: "Pokémon",
      imageUrl:
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN_SM.png",
      damage: 180,
      energy: [] as Array<Card>,
      evolutions: [
        {
          id: 5,
          name: "Drakloak",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN_SM.png",
        } as Card,
        {
          id: 8,
          name: "Dragapult ex",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN_SM.png",
        } as Card,
      ],
    } as Card,
    boardUser: "self",
    cssUser: "self",
  },
};

export const EnergyNoEvolutions: Story = {
  args: {
    card: {
      id: 1,
      name: "Dreepy",
      type: "Pokémon",
      imageUrl:
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN_SM.png",
      damage: 0,
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
    boardUser: "self",
    cssUser: "self",
  },
};

export const EnergyWithTwoEvolutions: Story = {
  args: {
    card: {
      id: 1,
      name: "Dreepy",
      type: "Pokémon",
      imageUrl:
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN_SM.png",
      damage: 0,
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
      evolutions: [
        {
          id: 5,
          name: "Drakloak",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN_SM.png",
        } as Card,
        {
          id: 8,
          name: "Dragapult ex",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_130_R_EN_SM.png",
        } as Card,
      ],
    } as Card,
    boardUser: "self",
    cssUser: "self",
  },
};

export const AbilityUsed: Story = {
  args: {
    card: {
      id: 1,
      name: "Dreepy",
      type: "Pokémon",
      imageUrl:
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN_SM.png",
      damage: 180,
      abilityUsed: true,
      energy: [] as Array<Card>,
      player: "self",
      evolutions: [
        {
          id: 5,
          name: "Drakloak",
          type: "Pokémon",
          imageUrl:
            "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_129_R_EN_SM.png",
          player: "self",
        } as Card,
      ],
    } as Card,
    boardUser: "self",
    cssUser: "self",
  },
};
