import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { timestamps } from './column.helpers';
import type { AnySQLiteColumn } from 'drizzle-orm/sqlite-core';
import { questionnaire } from './questionnaire.model';
import { question } from './question.model';
import { movie } from './movie.model';
import { series } from './series.model';
import { person } from './person.model';
import { answerType } from './column.helpers';
import { podcastGuest } from './podcastGuest.model';
import { user } from './auth.model';

export const answer = sqliteTable('answers', {
  id: t.int().primaryKey({ autoIncrement: true }),
  movieId: t.text().references((): AnySQLiteColumn => movie.id),
  seriesId: t.text().references((): AnySQLiteColumn => series.id),
  personId: t.text().references((): AnySQLiteColumn => person.id),
  note: t.text(),
  questionId: t
    .int()
    .references((): AnySQLiteColumn => question.id, { onDelete: 'cascade' }),
  questionnaireId: t.int().references((): AnySQLiteColumn => questionnaire.id, {
    onDelete: 'cascade'
  }),
  podcastGuestId: t.int().references((): AnySQLiteColumn => podcastGuest.id),
  userId: t
    .text()
    .references((): AnySQLiteColumn => user.id, { onDelete: 'cascade' }),
  order: t.int().default(1),
  ...answerType,
  ...timestamps
});
