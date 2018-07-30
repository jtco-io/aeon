import * as React from "react";
import createBrowserHistory from "history/createBrowserHistory";
import { ApolloProvider } from "react-apollo";
import { hydrate } from "react-dom";
import config from "config";
import Root from "shared/components/Root";
import GraphQL from "shared/components/GraphQL";
import Router from "shared/components/Router";
import createStore from "shared/util/createStore";

const props = {
  apolloClient: createStore(),
  history: createBrowserHistory(),
};

hydrate(
  <GraphQL client={props.apolloClient}>
    <Router history={props.history as any}>
      <Root />
    </Router>
  </GraphQL>,
  document.getElementById("root"),
);
