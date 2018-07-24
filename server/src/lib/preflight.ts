import config from "../config";

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

export function preflight(): void {
  const { isProd, serverHost, serverPort, serverGraphqlUrl } = config;
  logTwoTone("Server:", "        Preflight check");
  logTwoTone(
    "GraphQL URL:",
    `   ${serverHost}:${serverPort}${serverGraphqlUrl}`,
  );
  logTwoTone("Production:", `    ${isProd}`);
}
