import { RESTDataSource } from "apollo-datasource-rest";
import { THE_MOVIE_DB_API_KEY, THE_MOVIE_DB_BASE_URL } from "../config";

export class TheMovieDbDataSource extends RESTDataSource {
  baseURL: string = THE_MOVIE_DB_BASE_URL;
  apiKey: string = THE_MOVIE_DB_API_KEY;

  async searchMovies(query: string): Promise<any> {
    return this.get("/3/search/movie", {
      query,
      api_key: this.apiKey,
    });
  }

  async getMovie(movieId: number): Promise<any> {
    return this.get(`/3/movie/${movieId}`, {
      api_key: this.apiKey,
    });
  }
}
