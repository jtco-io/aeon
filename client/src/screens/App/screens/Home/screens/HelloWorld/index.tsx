import * as React from "react";
import graphqlTag from "graphql-tag";
import { Query } from "react-apollo";

const HELLO_WORLD = graphqlTag`
    {
        helloWorld
    }
`;

class HelloWorld extends React.Component<any, any> {
  queryCb({ loading, error, data }: any) {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return <div>{data.helloWorld}</div>;
  }

  public render(): any {
    return <Query query={HELLO_WORLD}>{this.queryCb()}</Query>;
  }
}

export default HelloWorld;
