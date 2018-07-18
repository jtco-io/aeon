import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import fetch from "cross-fetch";
import { createApolloFetch } from "apollo-fetch";

const uri = "http://localhost:4000/graphql";

declare const window: {
  __APOLLO_STATE__: any;
};

export const apolloClient = new ApolloClient({
  ssrForceFetchDelay: 100,
  link: createHttpLink({
    uri,
    fetch,
    credentials: "same-origin",
  }),
  connectToDevTools: true,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

export default apolloClient;
