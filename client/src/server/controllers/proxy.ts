import { Config } from "../types";

const proxyMiddleware = require("http-proxy-middleware");

const serviceWorkerProxy = (config: Config) => proxyMiddleware(
  (pathname: any) => /^\Wsw\.js/.test(pathname),
  {
    target: `${config.frontend.url}${config.publicPath}/bundles`,
    logLevel: "debug",
    // onError: (err: any, req: any, res: any) => console.log(err),
    // onProxyReq: (proxyReq:any, req:any, res:any) => console.log(proxyReq)
  },
);

const proxies = {
  serviceWorkerProxy,
};

export default proxies;
