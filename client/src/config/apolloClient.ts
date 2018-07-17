import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import fetch from "cross-fetch";
import { createApolloFetch } from "apollo-fetch";

const uri = "http://localhost:4000/graphql";

export const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri,
    fetch,
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
