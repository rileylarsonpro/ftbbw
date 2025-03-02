import { text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const timestamps = {
  updatedAt: text()
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`)
};

export const answerType = {
  answerType: text()
    .$type<'MOVIE' | 'PERSON' | 'TV_SERIES' | 'TEXT' | 'MULTI'>()
    .default('MOVIE')
};
