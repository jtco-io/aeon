import * as React from "react";
import { ApolloProvider } from "react-apollo";
import Routes from "shared/components/Routes";
import { routesList } from "../../config/routes";

class Root extends React.Component<
  { apolloClient: any; history: any; routes: any },
  any
> {
  public render(): JSX.Element {
    const { apolloClient, history, routes } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Routes history={history} routes={routes} />
      </ApolloProvider>
    );
  }
}
export default Root;
