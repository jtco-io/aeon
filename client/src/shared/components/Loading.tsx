import * as React from "react";

export default class Loading extends React.Component<any, any> {
  public render(): JSX.Element {
    const { isLoading, timedOut, pastDelay, error } = this.props;
    if (isLoading) {
      if (timedOut) {
        return <div>Loader timed out!</div>;
      }
      return <div>Loading...</div>;
    }
    return <div>Error! Component failed to load</div>;
  }
}
