import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

import { config, Config } from "../../config";

declare const window: {
  __APOLLO_STATE__: any;
};

export default function createStore(isServer = false): any {
  let apolloConfig = config.apollo.client;
  if (isServer) {
    apolloConfig = config.apollo.server;
    apolloConfig.cache = new InMemoryCache();
  } else if (!isServer) {
    apolloConfig.cache = new InMemoryCache().restore(window.__APOLLO_STATE__);
  }
  return new ApolloClient(apolloConfig);
}
