import { defineRelations } from "drizzle-orm/relations";
import * as p from "drizzle-orm/pg-core";

export function generateRandomKey(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
  }
  return key;
}

export const games = p.pgTable("games", {
  id: p.uuid().primaryKey().defaultRandom(),
  importKey: p
    .varchar()
    .$default(() => generateRandomKey(16))
    .unique(),
  createdAt: p.timestamp().defaultNow(),
});

export const actions = p.pgTable("actions", {
  id: p.serial("id").primaryKey(),
  gameId: p.uuid("game_id").notNull(),
  user: p.varchar({ length: 10 }).notNull(),
  actionType: p.varchar({ length: 100 }).notNull(),
  emit: p.boolean("emit").notNull().default(true),
  parameters: p.json(),
});

export const relations = defineRelations({ games, actions }, (r) => ({
  actions: {
    game: r.one.games({
      from: r.actions.gameId,
      to: r.games.id,
    }),
  },
  games: {
    actions: r.many.actions(),
  },
}));
