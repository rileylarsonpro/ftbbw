import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { timestamps } from './column.helpers';
import type { AnySQLiteColumn } from 'drizzle-orm/sqlite-core';
import { person } from './person.model';

export const podcastGuest = sqliteTable('podcast_guests', {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  description: t.text(),
  personId: t.text().references((): AnySQLiteColumn => person.id),
  ...timestamps
});
