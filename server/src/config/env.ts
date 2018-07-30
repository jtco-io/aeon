import { resolve } from "path";
import { config as dotenv } from "dotenv";

const srcDir = resolve(__dirname),
  projRoot = resolve(srcDir, "..", ".."),
  envFile = resolve(projRoot, ".env");

dotenv({ path: envFile });

declare const process: {
  ["env"]: {
    ["NODE_ENV"]: "production" | "development" | "testing";
    ["PROJECT_TITLE"]: string;
    ["GRAPHQL_URL"]: string;
    ["FRONTEND_HOST"]: string;
    ["FRONTEND_PORT"]: number;
    ["BACKEND_HOST"]: string;
    ["BACKEND_PORT"]: number;
  };
};
const {
  NODE_ENV,
  PROJECT_TITLE,
  GRAPHQL_URL,
  FRONTEND_HOST,
  FRONTEND_PORT,
  BACKEND_HOST,
  BACKEND_PORT,
} = process.env;

export interface Env {
  NODE_ENV: string;
  PRODUCTION: boolean;
  PROJECT_TITLE: string;
  GRAPHQL_URL: string;
  backend: {
    graphql: {
      host: string;
      port: number;
      directory: string;
    };
  };
  frontend: {
    host: string;
    port: number;
  };
}

export const env: Env = {
  NODE_ENV,
  PROJECT_TITLE,
  PRODUCTION: NODE_ENV === "production",
  GRAPHQL_URL: GRAPHQL_URL || "http://localhost:8081/graphql",
  frontend: {
    host: FRONTEND_HOST || "localhost",
    port: FRONTEND_PORT || 8080,
  },
  backend: {
    graphql: {
      host: BACKEND_HOST || "localhost",
      port: BACKEND_PORT || 8081,
      directory: "graphql",
    },
  },
};
export default env;
