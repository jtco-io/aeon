import * as React from "react";
import * as ReactRouter from "react-router";

import { hot } from "react-hot-loader";
import Routes from "./routes";
import App from "screens/App";
import Layout from "./Layout";
import { routesList } from "../../routes";

interface RootProps {
  history?: any;
}

class Root extends React.Component<RootProps, any> {
  public render(): JSX.Element {
    return (
      <App>
        <Routes routes={routesList} />
      </App>
    );
  }
}
export default hot(module)(Root);
