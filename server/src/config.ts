declare const process: {
  env: {
    THE_MOVIE_DB_API_KEY: string;
    THE_MOVIE_DB_BASE_URL: string;
  };
};

export const THE_MOVIE_DB_API_KEY = process.env.THE_MOVIE_DB_API_KEY;
export const THE_MOVIE_DB_BASE_URL = process.env.THE_MOVIE_DB_BASE_URL;
