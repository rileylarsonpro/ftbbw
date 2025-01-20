import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import * as answerSchema from '../models/answer.model';
import * as authSchema from '../models/auth.model';
import * as movieSchema from '../models/movie.model';
import * as personSchema from '../models/person.model';
import * as podcastGuestSchema from '../models/podcastGuest.model';
import * as questionSchema from '../models/question.model';
import * as questionnaireSchema from '../models/questionnaire.model';
import * as seriesSchema from '../models/series.model';

export const db = drizzle({
  connection:
    import.meta.env.NODE_ENV === 'production'
      ? process.env.PRODUCTION_DB
      : './db.sqlite3',
  casing: 'snake_case',
  schema: {
    ...answerSchema,
    ...authSchema,
    ...movieSchema,
    ...personSchema,
    ...podcastGuestSchema,
    ...questionSchema,
    ...questionnaireSchema,
    ...seriesSchema
  }
});

migrate(db, { migrationsFolder: './drizzle' });
