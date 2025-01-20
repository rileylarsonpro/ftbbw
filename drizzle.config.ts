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
        ? process.env.PRODUCTION_DB
        : './db.sqlite3'
  },
  casing: 'snake_case'
} as Config;
