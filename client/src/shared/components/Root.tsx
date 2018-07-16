import * as React from "react";
import { ApolloProvider } from "react-apollo";
import Routes from "shared/components/Routes";
import { routesList } from "../../config/routes";

class Root extends React.Component<
  { apolloClient: any; history: any; routesList: any },
  any
> {
  public render(): JSX.Element {
    const { apolloClient, history, routesList } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Routes history={history} routesList={routesList} />
      </ApolloProvider>
    );
  }
}
export default Root;
