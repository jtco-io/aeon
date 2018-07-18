import { ApolloServer } from "apollo-server";
import { resolve, join } from "path";
import dotenv from "dotenv";
import resolvers from "./resolvers";
import { typeDefs } from "./typeDefs";

const srcDir = resolve(__dirname),
  projRoot = resolve(srcDir, "..", ".."),
  envFile = resolve(projRoot, ".env");

dotenv.config({ path: envFile });

const GRAPHQL_SERVER_HOST = process.env.SERVER_HOST || "localhost",
  GRAPHQL_SERVER_PORT = process.env.SERVER_PORT || 4000;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || "";

      // try to retrieve a user with the token
      // const user = getUser (token);

      // add the user to the context
      return { user: { username: "Nic" } };
    },
  });

  server
    .listen(GRAPHQL_SERVER_PORT, GRAPHQL_SERVER_HOST)
    .then(({ url }: { url: string }) => {
      console.log(`apollo server listening at ${url}`);
    });
};

startServer().catch((error: Error) => {
  console.error(error);
});
