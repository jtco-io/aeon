import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";

import { Config } from "../../config";

declare const window: {
  __APOLLO_STATE__: any;
};

export default function createStore(config: Config, isServer = false): any {
  let apolloConfig;
  if (isServer) {
    apolloConfig = {
      ...config.apollo.server,
      cache: new InMemoryCache(),
    };
  } else if (!isServer) {
    apolloConfig = {
      ...config.apollo.client,
      cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
    };
  }
  return new ApolloClient(apolloConfig);
}
