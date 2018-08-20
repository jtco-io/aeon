import * as ReactRouter from "react-router";
import Register from "screens/Auth/screens/Register";
import Login from "screens/Auth/screens/Login";
import PasswordReset from "screens/Auth/screens/PasswordReset";

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
