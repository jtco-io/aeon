import * as React from "react";
import * as ReactRouterDom from "react-router-dom";
import { Router } from "react-router";
import * as History from "history";
import createBrowserHistory from "history/createBrowserHistory";
import { ApolloProvider } from "react-apollo";
import { hydrate } from "react-dom";
import { apolloClient } from "config";
import Root from "shared/components/Root";

const props = {
  apolloClient,
  history: createBrowserHistory(),
};

hydrate(
  <ApolloProvider client={props.apolloClient}>
    <ReactRouterDom.Router history={props.history as any}>
      <Root />
    </ReactRouterDom.Router>
  </ApolloProvider>,
  document.getElementById("content"),
);
