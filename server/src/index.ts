import { ApolloServer } from "apollo-server";
import { resolvers } from "./graphql";
import { typeDefs } from "./typeDefs";
import config from "./config";
import { log } from "./lib";

async function startServer(): Promise<void> {
  await log.serverPreflight(config);
  await require("./database");
  const server = await new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // get the user token from the headers
      // const token = req.headers.authorization || "";
      // try to retrieve a user with the token
      // const user = getUser (token);
      // add the user to the context
      return { user: { username: "Nic" } };
    },
  });

  server
    .listen(config.serverPort, config.serverHost)
    .then(({ url }: { url: string }) => log.serverOnListen(config, url));
}

startServer().catch((error: Error) => {
  console.error(error);
});
