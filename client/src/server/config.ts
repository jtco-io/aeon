import { config as isoConfig } from "../config";
import { directories } from "./directories";
import { Config } from "./types";

const config: Config = {
  ...isoConfig,
  directories,
};

if (isoConfig.production) {
  try {
    config.manifest = import(directories.files.manifest).then(
      manifest => manifest,
    );
    // do stuff
  } catch (ex) {
    console.log(ex);
  }
}
export default config;
