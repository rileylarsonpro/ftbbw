import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { timestamps } from './column.helpers';

export const series = sqliteTable('series', {
  id: t.text().primaryKey(),
  title: t.text().notNull(),
  startYear: t.text().notNull(),
  endYear: t.text(),
  posterPath: t.text(),
  backdropPath: t.text(),
  ...timestamps
});
