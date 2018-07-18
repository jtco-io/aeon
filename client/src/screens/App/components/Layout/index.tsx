import * as React from "react";
import Navbar from "shared/components/Navbar";

class Layout extends React.Component<any, any> {
  public render(): any {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
