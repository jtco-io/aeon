import { Controllers } from "../types";
import proxies from "./proxy";
import { webpackDevelopment as WebpackDevelopment } from "./webpackDevelopment";

export const controllers: Controllers = {
  WebpackDevelopment,
  ...proxies,
};

export default controllers;
