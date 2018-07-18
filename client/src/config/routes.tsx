import * as React from "react";
import * as History from "history";
import * as ReactRouter from "react-router";
import Landing from "screens/App/screens/Home/screens/Landing";

export const history: any = [];
export const routesList: ReactRouter.RouteProps[] = [
  {
    path: "/",
    component: Landing,
  },
  {
    path: "/admin",
    component: Landing,
  },
];
