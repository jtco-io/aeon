import { resolve } from "path";
import { config as dotenv } from "dotenv";

const srcDir = resolve(__dirname),
  projRoot = resolve(srcDir, "..", ".."),
  envFile = resolve(projRoot, ".env");

console.log(envFile);
dotenv({ path: envFile });

declare const process: {
  env: {
    NODE_ENV: "production" | "development";
    SERVER_HOST: string;
    SERVER_PORT: number;
    GRAPHQL_ENPOINT: string;
  };
};

export const NODE_ENV = process.env.NODE_ENV;
export const SERVER_HOST = process.env.SERVER_HOST;
export const SERVER_PORT = process.env.SERVER_PORT;
export const GRAPHQL_ENPOINT = process.env.GRAPHQL_ENPOINT;

export default process.env;
