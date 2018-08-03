export * from "./types";
import { env } from "./env";
import { Config } from "./types";

const isHTTPS = env.HTTPS ? "https" : "http";
const config: Config = {
  env,
  production: env.NODE_ENV === "production",
  publicPath: env.PUBLIC_PATH,
  frontend: {
    host: env.FRONTEND_HOST || "localhost",
    port: env.FRONTEND_PORT || 8080,
    url: `${isHTTPS}://${env.FRONTEND_HOST}:${env.FRONTEND_PORT}`,
  },
  backend: {
    graphql: {
      host: env.BACKEND_HOST || "localhost",
      port: env.BACKEND_PORT || 8081,
      directory: "graphql",
      url: `${isHTTPS}://${env.BACKEND_HOST}:${env.BACKEND_PORT}`,
    },
  },
};

export default config;
