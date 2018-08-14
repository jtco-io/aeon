import * as React from "react";

import { hot } from "react-hot-loader";
import Layout from "shared/components/Layout";
import Routes from "shared/components/Routes";
import { routesList } from "./routes";

interface RootProps {
  history?: any;
}

class Root extends React.Component<RootProps, any> {
  public render(): JSX.Element {
    return (
      <Layout>
        <Routes routes={routesList} />
      </Layout>
    );
  }
}
export default hot(module)(Root);
