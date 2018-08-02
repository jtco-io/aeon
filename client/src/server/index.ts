import { config as dotenv } from "dotenv";
import { join, resolve } from "path";
import Server from "./Server";

const projRoot = resolve(__dirname, "..", "..", "..");

dotenv({ path: join(projRoot, ".env") });

const server = new Server(
  // Require Types after dotenv above.
  require("./types").config,
  require("./controllers").default,
  require(join(projRoot, "client", "webpack.config.js")),
);

export default server.start();
