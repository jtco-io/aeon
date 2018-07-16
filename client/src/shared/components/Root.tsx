import * as React from "react";
import { ApolloProvider } from "react-apollo";
import App from "screens/App";

class Root extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ApolloProvider client={this.props.apolloClient}>
        <App />
      </ApolloProvider>
    );
  }
}
export default Root;
