import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { timestamps } from './column.helpers';

export const person = sqliteTable('people', {
  id: t.text().primaryKey(),
  name: t.text().notNull(),
  profilePath: t.text(),
  ...timestamps
});
