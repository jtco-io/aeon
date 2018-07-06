import * as History from "history";
import Landing from "screens/App/screens/Home/screens/Landing";

export const history = History.createBrowserHistory();
export const routesList: ReactRouter.RouteProps[] = [
  {
    path: "/",
    component: Landing,
  },
];
