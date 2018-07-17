import * as React from "react";

export default class NotFound extends React.Component<any, any> {
  public render(): JSX.Element {
    const { apolloClient, history, routes } = this.props;
    return <div>Not Found!</div>;
  }
}
