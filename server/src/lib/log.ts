import config from "../config";

const cyan = "\x1b[36m";
const white = "\x1b[1m";

function logTwoTone(firstMessage, secondMessage = null, firstColor = cyan, secondColor = white) {
  if (secondMessage) {
    console.log (firstColor, firstMessage, secondColor, secondMessage);
  } else {
    console.log (firstColor, firstMessage);
  }
}


function serverPreflight():void {
  logTwoTone ("Server:", "        Preflight check");
  logTwoTone ("Production:", `    ${config.isProd}`);
}

function serverOnListen(url) {
  logTwoTone ("GraphQL URL:", `   ${url}${config.serverGraphqlUrl}`);
}


const log = {
  logTwoTone,
  serverPreflight,
  serverOnListen
}

export default log
