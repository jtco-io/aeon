import * as React from "react";
import * as History from "history";
import { hydrate } from "react-dom";
import { routes, apolloClient } from "config";
import Root from "shared/components/Root";

const props = {
  apolloClient,
  history,
  routes,
};

hydrate(
  <Root {...props} />,
  document.getElementById("content"),
);
