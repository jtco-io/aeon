import * as React from "react";
import { Route, RouteProps, Router, Switch, StaticRouter } from "react-router";
import Layout from "shared/components/Layout";

class App extends React.Component<any, any> {
  public render(): any {
    return <Layout>{this.props.children}</Layout>;
  }
}

export default App;
