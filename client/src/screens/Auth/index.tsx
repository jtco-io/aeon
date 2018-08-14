import * as ReactRouter from "react-router";
import Register from "screens/App/screens/Home/screens/Landing";
import Login from "screens/App/screens/Home/screens/Landing";
import PasswordReset from "screens/App/screens/Home/screens/Landing";

const auth: ReactRouter.RouteProps[] = [
  {
    path: "/auth/register",
    component: Register,
  },
  {
    path: "/auth/login",
    component: Login,
  },
  {
    path: "/auth/password_reset",
    component: PasswordReset,
  },
];

export default auth;
