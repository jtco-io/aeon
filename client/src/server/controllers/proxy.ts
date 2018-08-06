import { Controllers } from "../types";

const proxyMiddleware = require("http-proxy-middleware");

export const serviceWorkerProxy = proxyMiddleware(
  (pathname: any) => /^\Wsw\.js/.test(pathname),
  {
    target: "http://localhost:6080/static/bundles/",
    logLevel: "debug",
    // onError: (err: any, req: any, res: any) => console.log(err),
    // onProxyReq: (proxyReq:any, req:any, res:any) => console.log(proxyReq)
  },
);

export const isFaviconProxy = proxyMiddleware(
  (pathname: any) => /^\favicon\.ico/.test(pathname),
  {
    target: "http://localhost:6080/static/bundles/",
    logLevel: "debug",
    // onError: (err: any, req: any, res: any) => console.log(err),
    // onProxyReq: (proxyReq:any, req:any, res:any) => console.log(proxyReq)
  },
);

const proxies = {
  serviceWorkerProxy,
  isFaviconProxy,
};

export default proxies;
