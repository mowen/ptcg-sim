import type { Meta, StoryObj } from "@storybook/react-vite";

import CardView from "./cardView";
import { Card } from "../../../models";

const meta = {
  component: CardView,
} satisfies Meta<typeof CardView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    card: {
      id: 1,
      name: "Dreepy",
      type: "Pokémon",
      imageUrl:
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png",
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
    faceUp: true,
  },
};

export const FaceDown: Story = {
  args: {
    card: {
      id: 1,
      name: "Dreepy",
      type: "Pokémon",
      imageUrl:
        "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/TWM/TWM_128_R_EN.png",
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
    faceUp: false,
  },
};
