import { config as isoConfig } from "../config";
import { directories } from "./directories";
import { Config } from "./types";

const config: Config = {
  ...isoConfig,
  directories,
};

export default config;
