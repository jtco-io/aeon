function isSW(pathname: string) {
  return /^\Wsw\.js/.test(pathname);
}
export const serviceWorkerProxyController = require("http-proxy-middleware")(
  isSW,
  {
    target: "http://localhost:6080/static/bundles/",
    logLevel: "debug",
    // onError: (err: any, req: any, res: any) => console.log(err),
    // onProxyReq: (proxyReq:any, req:any, res:any) => console.log(proxyReq)
  },
);
