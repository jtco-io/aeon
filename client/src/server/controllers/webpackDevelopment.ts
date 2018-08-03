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
      compiler.compilers.find(
        (compiler: { name: string }) => compiler.name === "client",
      ),
    ),
  );

  router.use(require("webpack-hot-server-middleware")(compiler));
  console.log("Client Server: Webpack Controller returned as Express route");
  return router;
}
