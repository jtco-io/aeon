import * as React from "react";
import Navbar from "shared/components/Navbar";

interface LayoutProps {}

// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
const THEME_CONTEXT = React.createContext({});

class Layout extends React.Component<LayoutProps, any> {
  public render(): JSX.Element {
    return (
      <THEME_CONTEXT.Provider value="light">
        <Navbar />
        {this.props.children}
      </THEME_CONTEXT.Provider>
    );
  }
}

export default Layout;
