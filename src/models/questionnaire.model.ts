import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { timestamps } from './column.helpers';
import type { AnySQLiteColumn } from 'drizzle-orm/sqlite-core';
import { user } from './auth.model';

export const questionnaire = sqliteTable('questionnaires', {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  description: t.text(),
  type: t
    .text()
    .$type<
      | 'CUSTOM'
      | 'FTBBW'
      | 'FTBBW_2018'
      | 'FTBBW_2019'
      | 'FTBBW_DECADE_2010'
      | 'FTBBW_2020'
      | 'FTBBW_2021'
      | 'FTBBW_2022'
      | 'FTBBW_2023'
      | 'FTBBW_2024'
      | 'RESURRECTION'
      | 'JUDGMENT_DAY'
      | 'REINCARNATION'
    >()
    .default('CUSTOM'),
  createdByUserId: t
    .text()
    .references((): AnySQLiteColumn => user.id, { onDelete: 'set null' }),
  ...timestamps
});

export type Questionnaire = typeof questionnaire.$inferSelect;
