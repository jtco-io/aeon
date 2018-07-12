import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type User {
    username: String
    email: String
    name: String
  }

  type Query {
    helloWorld: String!
    books: [Book]
    users: [User]
  }
`;
