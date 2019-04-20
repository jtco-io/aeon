import { config as dotenv } from "dotenv";
import { join, resolve } from "path";
import Selenium from "./selenium";

process.env.USE_PROMISE_MANAGER = false

// eslint-disable-next-line
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60e3


const projRoot = resolve( __dirname, "..", ".." );

dotenv( { path: join( projRoot, ".env" ) } );

const env = process.env;
const frontendURL = `http://${env.FRONTEND_HOST}:${env.FRONTEND_PORT}/`;
process.selenium = new Selenium( frontendURL );

beforeAll( async () => {
  await process.selenium.initialize();
} );

afterAll( async () => {
  await process.selenium.quit();

} );
