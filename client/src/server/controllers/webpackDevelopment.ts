import * as webpack from "webpack";
import { Router } from "express";

export function webpackDevelopment(config: any): Router {
  const router: Router = Router();
  const compiler = require("webpack")(config);
  router.use(
    require("webpack-dev-middleware")(compiler, {
      serverSideRender: true,
      publicPath: "/static",
      // stats: 'minimal'
    }),
  );
  router.use(
    require("webpack-hot-middleware")(
      compiler.compilers.find((compiler: any) => compiler.name === "client"),
    ),
  );

  router.use(require("webpack-hot-server-middleware")(compiler));

  return router;
}
