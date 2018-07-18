import * as React from "react";
import { hydrate } from "react-dom";
import apolloClient from "config/apolloClient";
import Root from "shared/components/Root";
import { AppContainer } from "react-hot-loader";
import { history, routesList } from "config/routes";

hydrate(
  <AppContainer>
    <Root apolloClient={apolloClient} history={history} routes={routesList} />
  </AppContainer>,
  document.getElementById("content"),
);

if ((module as any).hot) {
  (module as any).hot.accept("shared/components/Root", () => {
    const NEXT_ROOT = require("shared/components/Root").default;
    hydrate(
      <AppContainer>
        <NEXT_ROOT
          apolloClient={apolloClient}
          history={history}
          routes={routesList}
        />
      </AppContainer>,
      document.getElementById("root"),
    );
  });
}
