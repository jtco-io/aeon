import * as React from "react";

import { hot } from "react-hot-loader";
import { routesList } from "./routes";
import Routes from "shared/components/Routes";

interface RootProps {
  history?: any;
}

class Root extends React.Component<RootProps, any> {
  public render(): JSX.Element {
    return <Routes routes={routesList}/>;
  }
}
export default hot(module)(Root);
