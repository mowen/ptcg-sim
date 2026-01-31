import { db } from "../index.js";
import { Action } from "../models/action.js";
import { actions } from "../db/schema.js";

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

  async addAction(gameId: string, action: Action): Promise<void> {
    const game = await db.query.games.findFirst({ where: { id: gameId } });
    if (!game) {
      throw new Error(`Game with ID '${gameId}' not found`);
    }
    await db.insert(actions).values({
      gameId: gameId,
      user: action.user,
      actionType: action.action,
      parameters: action.parameters,
      emit: action.emit,
    });
  }
}

export const gameStateController = new GameStateController();
