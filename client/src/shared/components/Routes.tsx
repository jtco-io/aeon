import * as React from "react";
import { Route, RouteProps, Router, Switch, StaticRouter } from "react-router";

class RouteStatus extends React.Component<any, any> {
  public render():JSX.Element {
    return <p>Static context: {JSON.stringify(this.props.staticContext)}</p>;
  }
}

class PrintContext extends React.Component<any, any> {
  public render():JSX.Element {
    return <p>Static context: {JSON.stringify(this.props.staticContext)}</p>;
  }
}
/**
 * Used to mount routes from the routes.tsx file in config
 * Each route is maped inside of a switch
 * That is mounter inside router component with history object
 */

class routes extends React.Component<any, any> {
  public render():JSX.Element {
    const { location, history, routes, context } = this.props;

    return <Switch>
      {routes.map((route: RouteProps, i: number) => (
      <Route
        key={i}
        exact
        path={route.path}
        component={route.component}
      />
        ))}
      <RouteStatus statusCode={404}>
        <p>Route with statusCode 404</p>
        <PrintContext staticContext={{}}/>
      </RouteStatus>
    </Switch>

  }
}

export default routes;
