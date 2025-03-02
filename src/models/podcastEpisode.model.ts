import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { timestamps } from './column.helpers';
import type { AnySQLiteColumn } from 'drizzle-orm/sqlite-core';
import { podcastGuest } from './podcastGuest.model';
import { questionnaire } from './questionnaire.model';

export const podcastEpisode = sqliteTable('podcast_episodes', {
  id: t.int().primaryKey({ autoIncrement: true }),
  title: t.text().notNull(),
  number: t.int().notNull(),
  airDate: t.text().notNull(),
  podcastGuestId: t.int().references((): AnySQLiteColumn => podcastGuest.id, {
    onDelete: 'cascade'
  }),
  questionnaireId: t.int().references((): AnySQLiteColumn => questionnaire.id, {
    onDelete: 'cascade'
  }),
  ...timestamps
});
