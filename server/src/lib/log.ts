import { Config } from "../config";

const cyan = "\x1b[36m";
const white = "\x1b[1m";

function logTwoTone(
  firstMessage,
  secondMessage = null,
  firstColor = cyan,
  secondColor = white,
) {
  if (secondMessage) {
    console.log(firstColor, firstMessage, secondColor, secondMessage);
  } else {
    console.log(firstColor, firstMessage);
  }
}

function serverPreflight(config: Config): void {
  logTwoTone("Server:", "                     Preflight check");
  logTwoTone("NODE_ENV:", `                   ${config.env.NODE_ENV}`);
}

function serverOnListen(config: Config, url: string) {
  logTwoTone("GraphQL Server:", `             Now Accepting Connections`);
  logTwoTone("URL is:", `                     ${config.env.GRAPHQL_URL}`);
}

const log = {
  logTwoTone,
  serverPreflight,
  serverOnListen,
};

export default log;
