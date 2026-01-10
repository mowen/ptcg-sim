import "dotenv/config";
import { relations } from "./db/schema.js";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!, { relations });

export { db };
