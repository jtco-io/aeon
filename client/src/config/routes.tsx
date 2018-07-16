import * as History from "history";
import Landing from "screens/App/screens/Home/screens/Landing";
import * as ReactRouter from "react-router";

export const history = History.createBrowserHistory();
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
