import { Users } from "../database/models";
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

export const resolvers = {
  Query: {
    helloWorld: () => "Hello World from the GraphQL Server!",
    books: () => books,
    users: async () => {
      const users = await Users.query();
      console.log(users);

      return users;
    },
  },
};
