import { Env } from "./types";

declare const process: {
  ["env"]: Env;
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

export const env: Env = {
  NODE_ENV,
  PROJECT_TITLE,
  FRONTEND_HOST,
  FRONTEND_PORT,
  BACKEND_HOST,
  BACKEND_PORT,
  HTTPS,
  PUBLIC_PATH,
};
