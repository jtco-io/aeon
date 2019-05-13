import * as React from "react";
import { Route, RouteProps, Switch } from "react-router";

class RouteStatus extends React.Component<any, any> {
  public render(): JSX.Element {
    return <p>Static context: {JSON.stringify(this.props.staticContext)}</p>;
  }
}

class PrintContext extends React.Component<any, any> {
  public render(): JSX.Element {
    return <p>Static context: {JSON.stringify(this.props.staticContext)}</p>;
  }
}
/**
 * Used to mount routes from the routes.tsx file in config
 * Each route is maped inside of a switch
 * That is mounter inside router component with history object
 */

interface RoutesProps {
  children?: any;
  routes: any;
  context?: any;
}
class Routes extends React.Component<RoutesProps, any> {
  renderRoutes() {
    const { children, routes } = this.props;
    if (routes) {
      return this.props.routes.map((route: RouteProps, i: number) => (
        <Route key={i} exact path={route.path} component={route.component} />
      ));
    }
    return children;
  }

  public render(): JSX.Element {
    const { context } = this.props;
    return (
      <Switch>
        {this.renderRoutes()}
        <RouteStatus statusCode={404}>
          <p>Route with statusCode 404</p>
          <PrintContext staticContext={context} />
        </RouteStatus>
      </Switch>
    );
  }
}

export default Routes;
