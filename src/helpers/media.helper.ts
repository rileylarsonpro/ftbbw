import { db } from '../utils/db';
import { eq } from 'drizzle-orm';

const findMovieById = async (movieId: string) => {
  return db.query.movie.findFirst({
    where: (movie) => eq(movie.id, movieId)
  });
};

const findSeriesById = async (seriesId: string) => {
  return db.query.series.findFirst({
    where: (series) => eq(series.id, seriesId)
  });
};

const findPersonById = async (personId: string) => {
  return db.query.person.findFirst({
    where: (person) => eq(person.id, personId)
  });
};

export default {
  findMovieById,
  findSeriesById,
  findPersonById
};
