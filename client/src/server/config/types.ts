export interface ConfigServer {
  host: string;
  port: number;
  url: string;
}

export interface ConfigBackendServer {
  graphql: ConfigServer & {
    directory: string;
  };
}

export type ConfigFrontendServer = ConfigServer & {};

export interface Env {
  NODE_ENV: string;
  PROJECT_TITLE: string;
  FRONTEND_PORT: number;
  FRONTEND_HOST: string;
  BACKEND_HOST: string;
  BACKEND_PORT: number;
  HTTPS: boolean;
  PUBLIC_PATH: string;
}

export interface Config {
  env: Env;
  production: boolean;
  publicPath: string;
  frontend: ConfigFrontendServer;
  backend: ConfigBackendServer;
}
