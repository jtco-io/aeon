import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀 apollo server listening at ${url}`);
  });
};

startServer().catch((error: Error) => {
  console.error(error);
});
