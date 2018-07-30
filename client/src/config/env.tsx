export interface Env {
  NODE_ENV: "production" | "development";
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
  NODE_ENV: "development",
  backend: {
    graphql: {
      host: "localhost",
      port: 8081,
      directory: "graphql",
    },
  },
  frontend: {
    host: "localhost",
    port: 8081,
  },
};

export default env;
