import { apollo, ApolloConfig } from "./apollo";
import env from "./env";

const projTitle = "Prion";
const isProd = false;

export const config: Config = {
  projTitle,
  isProd,
  env,
  apollo,
};
export default config;

declare module "config" {
  export interface Config {
    projTitle: string;
    isProd: boolean;
    env: any;
    apollo: any;
  }
}
