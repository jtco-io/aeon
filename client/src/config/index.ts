import { apollo, ApolloConfig } from "./apollo";
import { env, Env } from "./env";

export const config: Config = {
  env,
  apollo,
};
export default config;

declare module "config" {
  export interface Config {
    env: Env;
    apollo: ApolloConfig;
  }
}
