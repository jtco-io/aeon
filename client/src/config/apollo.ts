import { ApolloClient } from "apollo-client";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import fetch from "cross-fetch";
import { createApolloFetch } from "apollo-fetch";
import { env, Env } from "./env";

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
    ...apolloClientConfig,
  },
  server: {
    ssrMode: true,
    ...apolloClientConfig,
  },
};

export default apollo;
