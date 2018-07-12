import { Users } from "./models";
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
    helloWorld: () => "Hello World from the GraphQL Server!",
    books: () => books,
    users: () => Users.fetchAll(),
  },
};

export default resolvers;
