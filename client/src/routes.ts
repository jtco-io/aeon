import * as ReactRouter from "react-router";
import App from "screens/App";
import Auth from "screens/Auth";

export const routesList: ReactRouter.RouteProps[] = [...App, ...Auth];
