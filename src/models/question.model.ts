import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { timestamps } from './column.helpers';
import type { AnySQLiteColumn } from 'drizzle-orm/sqlite-core';
import { questionnaire } from './questionnaire.model';
import { answerType } from './column.helpers';

export const question = sqliteTable('questions', {
  id: t.int().primaryKey({ autoIncrement: true }),
  text: t.text().notNull(),
  description: t.text(),
  ...answerType,
  questionnaireId: t
    .text()
    .references((): AnySQLiteColumn => questionnaire.id, {
      onDelete: 'cascade'
    }),
  order: t.int().default(1),
  ...timestamps
});
