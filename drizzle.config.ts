import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  dialect: 'sqlite',
  schema: './src/models',
  out: './drizzle',
  driver: 'durable-sqlite',
  dbCredentials: {
    url:
      process.env.NODE_ENV === 'production'
        ? '/app/data/db.sqlite3'
        : './db.sqlite3'
  },
  casing: 'snake_case'
} as Config;
