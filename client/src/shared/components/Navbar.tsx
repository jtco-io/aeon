import * as React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

interface Route {
  name: string;
  href: string;
}

interface NavbarProps {
  insertCss?: any;
  routes?: Route[];
}

class Navbar extends React.Component<NavbarProps, {}> {
  constructor(props: NavbarProps) {
    super(props);
  }

  public static defaultProps: Partial<NavbarProps> = {
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
      {
        name: "Login",
        href: "/auth/login",
      },
      {
        name: "Sign Up",
        href: "/auth/register",
      },
    ],
  };

  renderRoutes = (): any => {
    const { routes } = this.props;

    return routes.map((route: Route, index: number) => (
      <Link key={index} to={route.href}>
        {route.name}
      </Link>
    ));
  };

  public render(): JSX.Element {
    return <nav>{this.renderRoutes()}</nav>;
  }
}

export default Navbar;
