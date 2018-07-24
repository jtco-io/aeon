// export { default as app } from './app';
// export { Db as Db } from './db';
// export { default as engine } from './engine';
// export { default as user } from './user';
// export { default as mailer } from './mailer';
// export { default as analytics } from './analytics';
// export { default as subscription } from './subscription';
import env from "./env";

interface Config {
  isProd: boolean;
  serverHost: string;
  serverPort: number;
  serverGraphqlUrl: string;
}

const config: Config = {
  isProd: env.NODE_ENV === "production",
  serverHost: env.SERVER_HOST || "localhost",
  serverPort: env.SERVER_PORT || 4000,
  serverGraphqlUrl: env.GRAPHQL_ENPOINT || "graphql",
};

export default config;
