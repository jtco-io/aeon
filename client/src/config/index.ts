import getApolloConfig from "./apollo";
import { env } from "./env";
import { Config } from "./types";

export { Config } from "./types";

const isHTTPS = env.HTTPS === "true" ? "https" : "http";
const frontend = {
  host: env.FRONTEND_HOST || "localhost",
  port: env.FRONTEND_PORT || 8080,
  url: `${isHTTPS}://${env.FRONTEND_HOST}:${env.FRONTEND_PORT}`,
};

const backend = {
  graphql: {
    host: env.BACKEND_HOST || "localhost",
    port: env.BACKEND_PORT || 8081,
    directory: "graphql",
    url: `${isHTTPS}://${env.BACKEND_HOST}:${env.BACKEND_PORT}`,
  },
};

export const config: Config = {
  env,
  frontend,
  backend,
  apollo: getApolloConfig({ backend }),
  production: env.NODE_ENV === "production",
  publicPath: env.PUBLIC_PATH,
};

export default config;

declare module "config";
