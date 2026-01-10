import { db } from "../index.js";
import { Action } from "../models/action.js";

class GameStateController {
  async getGameState(importKey: string): Promise<Array<Action> | null> {
    const game = await db.query.games.findFirst({
      where: { importKey: importKey },
      with: { actions: true },
    });
    if (!game) {
      return null;
    }
    return game.actions.map(
      (a: any) => new Action(a.user, a.actionType, a.parameters, a.emit),
    );
  }
}

export const gameStateController = new GameStateController();
