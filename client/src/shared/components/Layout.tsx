import * as React from "react";
import Navbar from "shared/components/Navbar";

interface LayoutProps {}
class Layout extends React.Component<LayoutProps, any> {
  public render(): JSX.Element {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
