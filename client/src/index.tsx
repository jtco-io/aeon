import * as React from "react";
import * as History from "history";
import { AppContainer } from "react-hot-loader";
import { hydrate } from "react-dom";
import { routes, apolloClient } from "config";
import Root from "shared/components/Root";

const props = {
  apolloClient,
  history,
  routes,
};

hydrate(
  <AppContainer>
    <Root {...props} />
  </AppContainer>,
  document.getElementById("content"),
);

if ((module as any).hot) {
  (module as any).hot.accept("shared/components/Root", () => {
    const NEXT_ROOT = require("shared/components/Root").default;
    hydrate(
      <AppContainer>
        <NEXT_ROOT {...props} />
      </AppContainer>,
      document.getElementById("root"),
    );
  });
}
