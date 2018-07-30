declare var __PRODUCTION__: boolean;
declare var __PROJECT_TITLE__: string;
declare var __GRAPHQL_URL__: string;
declare var __FRONTEND_PORT__: number;
declare var __FRONTEND_HOST__: string;
declare var __BACKEND_PORT__: number;
declare var __BACKEND_HOST__: string;

export interface Env {
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
  PRODUCTION: __PRODUCTION__,
  PROJECT_TITLE: __PROJECT_TITLE__,
  GRAPHQL_URL: __GRAPHQL_URL__ || "http://localhost:8081/graphql",
  frontend: {
    host: __FRONTEND_HOST__ || "localhost",
    port: __FRONTEND_PORT__ || 8080,
  },
  backend: {
    graphql: {
      host: __BACKEND_HOST__ || "localhost",
      port: __BACKEND_PORT__ || 8081,
      directory: "graphql",
    },
  },
};

console.log("env", env);
export default env;
