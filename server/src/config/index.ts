// export { default as app } from './app';
// export { Db as Db } from './db';
// export { default as engine } from './engine';
// export { default as user } from './user';
// export { default as mailer } from './mailer';
// export { default as analytics } from './analytics';
// export { default as subscription } from './subscription';
import { env, Env } from "./env";

export interface Config {
  env: Env;
}

export const config: Config = {
  env,
};

export default config;
