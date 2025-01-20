import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { timestamps } from './column.helpers';

export const movie = sqliteTable('movies', {
  id: t.text().primaryKey(),
  title: t.text().notNull(),
  year: t.text().notNull(),
  posterUrl: t.text().notNull(),
  ...timestamps
});
