const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const resolvers = {
  Query: {
    helloWorld: () => "Hello World!",
    books: () => books,

    getMovie: async (obj, { movieId }, { dataSources: { theMovieDbApi } }) =>
      theMovieDbApi.getMovie(movieId),

    searchMovies: async (obj, { query }, { dataSources: { theMovieDbApi } }) =>
      theMovieDbApi.searchMovies(query),
  },
};

export default resolvers;
