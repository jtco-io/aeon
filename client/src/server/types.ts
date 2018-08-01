import { config as dotenv } from "dotenv";
import { Env } from "../config/env";

import { Router } from "express";

export interface Controllers {
  ServiceWorkerProxy: any;
  WebpackDevelopment: any;
}

export interface DirectoryPaths {
  clientServer: string;
  src: string;
  client: string;
  build: string;
  assets: string;
  projRoot: string;
}
export interface DirectoryFiles {
  stats: string;
  serverRenderer: any;
}
export interface Directory {
  paths: DirectoryPaths;
  files: DirectoryFiles;
}

declare const process: {
  ["env"]: {
    ["NODE_ENV"]: "production" | "development" | "testing";
    ["PROJECT_TITLE"]: string;
    ["GRAPHQL_URL"]: string;
    ["FRONTEND_HOST"]: string;
    ["FRONTEND_PORT"]: number;
    ["BACKEND_HOST"]: string;
    ["BACKEND_PORT"]: number;
    ["HTTPS"]: boolean;
    ["PUBLIC_PATH"]: string;
  };
};
export const {
  NODE_ENV,
  PROJECT_TITLE,
  FRONTEND_HOST,
  FRONTEND_PORT,
  BACKEND_HOST,
  BACKEND_PORT,
  HTTPS,
  PUBLIC_PATH,
} = process.env;

export interface FrontEndServerConfig {
  env: Env;
}

export const frontend = {
  host: FRONTEND_HOST || "localhost",
  port: FRONTEND_PORT || 8080,
};

export const backend = {
  graphql: {
    host: BACKEND_HOST || "localhost",
    port: BACKEND_PORT || 8081,
    directory: "graphql",
  },
};

export const isHTTPS = HTTPS ? "https" : "http";

export const env = {
  PROJECT_TITLE,
  frontend,
  backend,
  HTTPS,
  PUBLIC_PATH,
  PRODUCTION: NODE_ENV === "production",
  FRONTEND_URL: `${isHTTPS}://${frontend.host}:${frontend.port}`,
  GRAPHQL_URL: `${isHTTPS}://${backend.graphql.host}:${backend.graphql.port}`,
};

export interface FrontEndServerConfig {
  env: Env;
}
export const config = { env };
