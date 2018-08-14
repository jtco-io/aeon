import * as ReactRouter from "react-router";
import * as Loadable from "react-loadable";

const app: ReactRouter.RouteProps[] = [
  {
    path: "/",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "app" */ "screens/App/screens/Home/screens/Landing"),
      loading: (): any => null,
    }),
  },
];

export default app;
