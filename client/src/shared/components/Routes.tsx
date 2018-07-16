import { history, routesList } from "config/routes";
import createBrowserHistory from "history/createBrowserHistory";
import * as React from "react";
import { Route, RouteProps, Router, Switch } from "react-router";

/**
 * Used to mount routes from the routes.tsx file in config
 * Each route is maped inside of a switch
 * That is mounter inside router component with history object
 */
class Routes extends React.Component<RouteProps, {}> {
  public render(): JSX.Element {
    return (
      <Router history={history}>
        <Switch>
          {routesList.map((route: RouteProps, i: number) => (
            <Route
              key={i}
              exact
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </Router>
    );
  }
}

export default Routes;
