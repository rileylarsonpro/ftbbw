type TMDBSearchType = 'movie' | 'tv' | 'person' | 'multi';
type TMDBMediaType = 'movie' | 'tv' | 'person';

interface TMDBSearchResult {
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: TMDBMediaType;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string | null; // Used for movies
  first_air_date: string | null; // Used for TV
  video: boolean;
  vote_average: number;
  vote_count: number;

  // Specific to movies
  runtime?: number;

  // Specific to TV series
  number_of_seasons?: number;
  number_of_episodes?: number;

  // Specific to people
  name?: string;
  profile_path?: string | null;
  known_for?: Array<{
    title: string;
    name: string;
    release_date: string;
  }>;
  birthday?: string | null;
  deathday?: string | null;
  biography?: string;
  place_of_birth?: string;
  gender?: number; // 0 = Not Disclosed, 1 = Female, 2 = Male
}

interface TMDBSearchResponse {
  page: number;
  results: TMDBSearchResult[];
  total_pages: number;
  total_results: number;
}

interface TMDBMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | any;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview: null | string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: null | number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: null | string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TMDBSeriesDetails {
  adult: boolean;
  backdrop_path: string | null;
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    gender: 1 | 2; // 1 for female, 2 for male
    profile_path: string | null;
  }>;
  episode_run_time: number[]; // Array of episode runtime in minutes
  first_air_date: string; // Date format: "YYYY-MM-DD"
  last_air_date?: string; // Date format: "YYYY-MM-DD"
  genres: Array<{
    id: number;
    name: string;
  }>;
  id: number;
  in_production: boolean;
  languages: string[]; // Array of language codes (e.g., "en", "es")
  name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  seasons: Array<{
    air_date: string; // Date format: "YYYY-MM-DD"
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
  }>;
  status: string; // (e.g., "Running", "Ended")
  tagline: string | null;
  vote_average: number;
  vote_count: number;
}

interface TMDBPersonDetails {
  birthday: string | null; // Format: "YYYY-MM-DD"
  deathday: string | null; // If the person is deceased, this will be provided, otherwise null
  id: number;
  name: string;
  also_known_as: string[]; // Other names the person is known by
  gender: 1 | 2 | 0; // 1 for female, 2 for male, 0 for unknown
  biography: string;
  popularity: number; // Popularity score
  place_of_birth: string | null;
  profile_path: string | null; // Path to the person's profile image
  adult: boolean; // Whether the person is involved in adult content (true/false)
  known_for_department: string; // The department the person is most known for (e.g., "Acting", "Directing")
  images: {
    profiles: Array<{
      file_path: string;
      aspect_ratio: number;
      height: number;
      width: number;
    }>;
  };
  social?: {
    facebook_id?: string;
    twitter_id?: string;
    instagram_id?: string;
  };
}
