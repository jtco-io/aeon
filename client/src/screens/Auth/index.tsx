import * as ReactRouter from "react-router";
import * as Loadable from "react-loadable";

const auth: ReactRouter.RouteProps[] = [
  {
    path: "/auth/register",
    component: Loadable({
      loader: () => import(/* webpackChunkName: "auth" */ "./screens/Register"),
      loading: (): any => null,
    }),
  },
  {
    path: "/auth/login",
    component: Loadable({
      loader: () => import(/* webpackChunkName: "auth" */ "./screens/Login"),
      loading: (): any => null,
    }),
  },
  {
    path: "/auth/password_reset",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "auth" */ "./screens/PasswordReset"),
      loading: (): any => null,
    }),
  },
];

export default auth;
