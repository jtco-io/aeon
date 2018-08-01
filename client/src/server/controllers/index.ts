import { Router } from "express";
import { serviceWorkerProxyController as ServiceWorkerProxy } from "./swProxy";
import { webpackDevelopment as WebpackDevelopment } from "./webpackDevelopment";
import { Controllers } from "../types";

export const controllers: Controllers = {
  ServiceWorkerProxy,
  WebpackDevelopment,
};

export default controllers;
