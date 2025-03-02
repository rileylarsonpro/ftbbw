import 'dotenv/config';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import mediaHelper from '../../../helpers/media.helper';
import { movie } from '../../../models/movie.model';
import { series } from '../../../models/series.model';
import { person } from '../../../models/person.model';
import { db } from '../../../utils/db';

export const searchMulti = async (input: {
  type: TMDBSearchType;
  query: string;
}): Promise<TMDBSearchResponse> => {
  const response = await fetch(
    `${process.env.TMDB_API_HOST}/search/${input.type}?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${input.query}&page=1&include_adult=false`
  );
  const data = await response.json();
  return data;
};

export const getMovieDetails = async (input: {
  movieId: string;
  append?: string;
}): Promise<TMDBMovieDetails> => {
  const { movieId, append = '' } = input;
  const response = await fetch(
    `${process.env.TMDB_API_HOST}/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US${append}`
  );
  const data = await response.json();
  return data;
};

export const getSeriesDetails = async (input: {
  seriesId: string;
  append?: string;
}): Promise<TMDBSeriesDetails> => {
  const { seriesId, append = '' } = input;
  const response = await fetch(
    `${process.env.TMDB_API_HOST}/tv/${seriesId}?api_key=${process.env.TMDB_API_KEY}&language=en-US${append}`
  );
  const data = await response.json();
  return data;
};

export const getPersonDetails = async (input: {
  personId: string;
  append?: string;
}): Promise<TMDBPersonDetails> => {
  const { personId, append = '' } = input;
  const response = await fetch(
    `${process.env.TMDB_API_HOST}/person/${personId}?api_key=${process.env.TMDB_API_KEY}&language=en-US${append}`
  );
  const data = await response.json();
  return data;
};

export const findMovie = async (movieId: string) => {
  let movieFound = await mediaHelper.findMovieById(movieId);
  if (movieFound) {
    return movieFound;
  }
  let movieDetails = await getMovieDetails({ movieId });
  let newMovie = await db
    .insert(movie)
    .values({
      id: movieId,
      title: movieDetails.title,
      year: movieDetails.release_date.split('-')[0],
      posterPath: movieDetails.poster_path,
      backdropPath: movieDetails.backdrop_path
    })
    .returning();

  return newMovie[0];
};

export const findSeries = async (seriesId: string) => {
  let seriesFound = await mediaHelper.findSeriesById(seriesId);
  if (seriesFound) {
    return seriesFound;
  }
  let seriesDetails = await getSeriesDetails({ seriesId });
  let newSeries = await db
    .insert(series)
    .values({
      id: seriesId,
      title: seriesDetails.name,
      startYear: seriesDetails.first_air_date.split('-')[0],
      endYear: seriesDetails.last_air_date
        ? seriesDetails.last_air_date.split('-')[0]
        : undefined,
      posterPath: seriesDetails.poster_path,
      backdropPath: seriesDetails.backdrop_path
    })
    .returning();
  return newSeries[0];
};

export const findPerson = async (personId: string) => {
  let personFound = await mediaHelper.findPersonById(personId);
  if (personFound) {
    return personFound;
  }
  let personDetails = await getPersonDetails({ personId });
  let newPerson = await db
    .insert(person)
    .values({
      id: personId,
      name: personDetails.name,
      profilePath: personDetails.profile_path
    })
    .returning();

  return newPerson[0];
};

export default {
  searchMulti: defineAction({
    input: z.object({
      type: z.enum(['movie', 'tv', 'person', 'multi']),
      query: z.string()
    }),
    handler: searchMulti
  })
};
