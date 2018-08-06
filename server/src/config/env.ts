import { join } from "path";
import { config as dotenv } from "dotenv";

dotenv({ path: join(__dirname, "..", "..", ".env") });

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
const {
  NODE_ENV,
  PROJECT_TITLE,
  FRONTEND_HOST,
  FRONTEND_PORT,
  BACKEND_HOST,
  BACKEND_PORT,
  HTTPS,
  PUBLIC_PATH,
} = process.env;

interface Backend {
  graphql: {
    host: string;
    port: number;
    directory: string;
  };
}
interface Frontend {
  host: string;
  port: number;
}

export interface Env {
  NODE_ENV: string;
  PRODUCTION: boolean;
  PROJECT_TITLE: string;
  FRONTEND_URL: string;
  GRAPHQL_URL: string;
  backend: Backend;
  frontend: Frontend;
  HTTPS: boolean;
  PUBLIC_PATH: string;
}

const frontend = {
  host: FRONTEND_HOST || "localhost",
  port: FRONTEND_PORT || 8080,
};

const backend = {
  graphql: {
    host: BACKEND_HOST || "localhost",
    port: BACKEND_PORT || 8081,
    directory: "graphql",
  },
};

const isHTTPS = HTTPS ? "https" : "http";

export const env: Env = {
  NODE_ENV,
  PROJECT_TITLE,
  frontend,
  backend,
  HTTPS,
  PUBLIC_PATH,
  PRODUCTION: NODE_ENV === "production",
  FRONTEND_URL: `${isHTTPS}://${frontend.host}:${frontend.port}`,
  GRAPHQL_URL: `${isHTTPS}://${backend.graphql.host}:${backend.graphql.port}`,
};
export default env;
