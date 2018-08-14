import { Router } from "express";
import { Config } from "../types";

export function webpackDevelopment(
  webpackConfig: any,
  config: Config,
  rlStats: any,
): Router {
  const router: Router = Router();
  const compiler = require("webpack")(webpackConfig);
  router.use(
    require("webpack-dev-middleware")(compiler, {
      serverSideRender: true,
      publicPath: "/static",
      //stats: "minimal",
    }),
  );
  router.use(
    require("webpack-hot-middleware")(
      compiler.compilers.find(
        (compiler: { name: string }) => compiler.name === "client",
      ),
    ),
  );

  router.use(
    require("webpack-hot-server-middleware")(compiler, {
      serverRendererOptions: {
        config,
        rlStats,
      },
    }),
  );
  console.log("Client Server: Webpack Controller returned as Express route");
  return router;
}
