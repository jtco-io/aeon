import * as ReactRouter from "react-router";
import Landing from "screens/App/screens/Home/screens/Landing";

const app: ReactRouter.RouteProps[] = [
  {
    path: "/",
    component: Landing,
  },
];

export default app;
