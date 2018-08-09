import createBrowserHistory from "history/createBrowserHistory";
import * as React from "react";
import { hydrate } from "react-dom";
import GraphQL from "shared/components/GraphQL";
import Root from "./Root";
import Router from "shared/components/Router";
import createStore from "shared/util/createStore";
import ServiceWorker from "shared/util/ServiceWorker";

const props = {
  apolloClient: createStore(),
  history: createBrowserHistory(),
  serviceWorker: new ServiceWorker().install(),
};
const app = () => (
  <GraphQL client={props.apolloClient}>
    <Router history={props.history as any}>
      <Root />
    </Router>
  </GraphQL>
);

hydrate(app(), document.getElementById("root"));
