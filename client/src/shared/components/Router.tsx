import * as React from "react";
import * as ReactRouterDom from "react-router-dom";
import { Route, RouteProps, Switch, StaticRouter } from "react-router";

interface RouterProps {
  isServer: boolean;
  children: any;
  history?: any;
  location?: any;
  context?: any;
}

interface RouterHistory {
}
class Router extends React.Component<RouterProps, RouterHistory> {
  constructor(props:any) {
    super (props);
  }

  public render():JSX.Element {
    const { context, history, children, location, isServer } = this.props;
    if (isServer) {
      return (
        <StaticRouter context={context} location={location}>
          {children}
        </StaticRouter>
      );
    }
    return (
      <ReactRouterDom.Router history={history as any}>
        {children}
      </ReactRouterDom.Router>
    );
  }
}

export default Router;
