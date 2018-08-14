import * as ReactRouter from "react-router";
import * as Loadable from "react-loadable";
import Loading from "shared/components/Loading";

// @ts-ignore
const loadableApp = Loadable({
  loader: () =>
    import(/* webpackChunkName: "app" */ "screens/App/screens/Home/screens/Landing"),
  loading: Loading,
});

const app: ReactRouter.RouteProps[] = [
  {
    path: "/",
    component: loadableApp,
  },
];

export default app;
