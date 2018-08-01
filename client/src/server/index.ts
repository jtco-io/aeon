import { config as dotenv } from "dotenv";
import { join, resolve } from "path";
import expressControllers from "./controllers";
import Server from "./Server";

const envPath = join(resolve(__dirname), "..", "..", "..", ".env");
dotenv({ path: envPath });

const server = new Server(
  // Require Types after dotenv above.
  require("./types").config,
  expressControllers,
);

export default server.start();
