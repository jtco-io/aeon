import * as React from "react";
import * as ReactDOM from "react-dom";
import apolloClient from "config/apolloClient";
import Root from "shared/components/Root";
import { AppContainer } from "react-hot-loader";
import { history, routesList } from "config/routes";

ReactDOM.render(
  <AppContainer>
    <Root
      apolloClient={apolloClient}
      history={history}
      routesList={routesList}
    />
  </AppContainer>,
  document.getElementById("root"),
);

if ((module as any).hot) {
  (module as any).hot.accept("shared/components/Root", () => {
    const NEXT_ROOT = require("shared/components/Root").default;
    ReactDOM.render(
      <AppContainer>
        <NEXT_ROOT
          apolloClient={apolloClient}
          history={history}
          routesList={routesList}
        />
      </AppContainer>,
      document.getElementById("root"),
    );
  });
}
