import { createHttpLink } from "apollo-link-http";

import fetch from "cross-fetch";
import { ApolloConfig, Config } from "./types";

export default function getApolloConfig(config: Partial<Config>): any {
  const {
    backend: {
      graphql: { host, port, directory },
    },
  } = config;

  const apolloClientConfig = {
    link: createHttpLink({
      fetch,
      uri: `http://${host}:${port}/${directory}\``,
      credentials: "same-origin",
    }),
  };

  return {
    client: {
      ssrForceFetchDelay: 100,
      connectToDevTools: true,
      ...apolloClientConfig,
    },
    server: {
      ssrMode: true,
      ...apolloClientConfig,
    },
  };
}
