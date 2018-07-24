import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import { typeDefs } from "./typeDefs";
import { initializeDatabase } from "./database";
import config from "./config";
import { Model } from "objection";
import { preflight } from "./lib/preflight";

async function startServer(): Promise<void> {
  // Bind all Models to a knex instance. If you only have one database in
  // your server this is all you have to do. For multi database systems, see
  // the Model.bindKnex method.

  const knex = initializeDatabase(config.isProd);
  Model.knex(knex);

  const server = new ApolloServer({
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
    .then(({ url }: { url: string }) => {
      console.log(`apollo server listening at ${url}`);
    });
}

preflight();
startServer().catch((error: Error) => {
  console.error(error);
});
