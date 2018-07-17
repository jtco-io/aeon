import * as React from "react";
import * as ReactRouterDom from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import Routes from "shared/components/Routes";
import { routesList } from "../../config/routes";
import { hot } from 'react-hot-loader';

interface RootProps {
  apolloClient: any;
  history: any;
  routes: any;
}
class Root extends React.Component<RootProps, any> {
  public render(): JSX.Element {
    const { apolloClient, history, routes } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <ReactRouterDom.BrowserRouter>
          <Routes history={history} routes={routes} />
        </ReactRouterDom.BrowserRouter>
      </ApolloProvider>
    );
  }
}
export default hot(module)(Root);
