declare const __PRODUCTION__:boolean;
declare const __PROJECT_TITLE__:string;
declare const __FRONTEND_PORT__:number;
declare const __FRONTEND_HOST__:string;
declare const __BACKEND_PORT__:number;
declare const __BACKEND_HOST__:string;
declare const __HTTPS__:boolean;

interface Backend {
  graphql: {
    host: string;
    port: number;
    directory: string;
  };
}
interface Frontend {
  host: string;
  port: number;
}
export interface Env {
  PRODUCTION: boolean;
  PROJECT_TITLE: string;
  FRONTEND_URL: string;
  GRAPHQL_URL: string;
  backend: Backend;
  frontend: Frontend;
  HTTPS: boolean
}


const frontend = {
  host: __FRONTEND_HOST__||"localhost",
  port: __FRONTEND_PORT__||8080,
}


const backend = {
  graphql: {
    host: __BACKEND_HOST__||"localhost",
    port: __BACKEND_PORT__||8081,
    directory: "graphql",
  }
}

const isHTTPS = __HTTPS__ ? 'https' : 'http'

export const env:Env = {
  frontend,
  backend,
  HTTPS: __HTTPS__,
  PRODUCTION: __PRODUCTION__,
  PROJECT_TITLE: __PROJECT_TITLE__,
  FRONTEND_URL: `${isHTTPS}://${frontend.host}:${frontend.port}`,
  GRAPHQL_URL: `${isHTTPS}://${backend.graphql.host}:${backend.graphql.port}`,
};

export default env;
