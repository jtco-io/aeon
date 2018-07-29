import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import fetch from "cross-fetch";
import { createApolloFetch } from "apollo-fetch";
import { env, Env } from "./env";

declare const window: {
  __APOLLO_STATE__: any;
};

function getUri({
  backend: {
    graphql: { host, port, directory },
  },
}: Env) {
  return `http://${host}:${port}/${directory}`;
}

const apolloClientConfig = {
  link: createHttpLink({
    fetch,
    uri: getUri(env),
    credentials: "same-origin",
  }),
};

export interface ApolloConfig {
  client: any;
  server: any;
}

export const apollo: ApolloConfig = {
  client: {
    ssrForceFetchDelay: 100,
    connectToDevTools: true,
    cache: new InMemoryCache(), // .restore (window.__APOLLO_STATE__),
    ...apolloClientConfig,
  },
  server: {
    ssrMode: true,
    cache: new InMemoryCache(),
    ...apolloClientConfig,
  },
};

export default apollo;
