import * as React from "react";
import HelloWorld from "../HelloWorld";
import Layout from "../../../../components/Layout/index";

class Landing extends React.Component<any, any> {
  public render(): any {
    return (
      <Layout>
        <HelloWorld />
      </Layout>
    );
  }
}

export default Landing;
