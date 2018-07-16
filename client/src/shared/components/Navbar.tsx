import * as React from "react";

interface Route {
  name: string;
  href: string;
}

interface PageProps {
  routes?: Route[];
}

class Navbar extends React.Component<PageProps, {}> {
  public static defaultProps: Partial<PageProps> = {
    routes: [
      {
        name: "Home",
        href: "/",
      },
      {
        name: "Contact",
        href: "/contact",
      },
      {
        name: "About",
        href: "/about",
      },
      {
        name: "Admin",
        href: "/admin",
      },
    ],
  };

  renderRoutes = (): any => {
    const { routes } = this.props;

    return routes.map((route: Route, index: number) => (
      <li key={index}>
        <a href={route.href}>{route.name}</a>
      </li>
    ));
  }

  public render(): JSX.Element {
    return <ul>{this.renderRoutes()}</ul>;
  }
}

export default Navbar;
