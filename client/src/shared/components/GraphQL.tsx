import * as React from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { config, Config } from "../../config";
import fetch from "cross-fetch";

class GraphQL extends React.Component<any, any> {
  client: any;
  config: any;

  constructor(props: any) {
    super(props);
    this.config = config.apollo;
    this.initialize();
  }

  initialize(isServer = false) {
    if (isServer) {
      this.client = new ApolloClient(this.config.server);
    } else {
      this.client = new ApolloClient(this.config.client);
    }
  }

  public render(): JSX.Element {
    const { children } = this.props;
    return <ApolloProvider client={this.client}>{children}</ApolloProvider>;
  }
}

export default GraphQL;
