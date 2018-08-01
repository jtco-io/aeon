import { Router } from "express";
import { serviceWorkerProxyController as ServiceWorkerProxy } from "./swProxy";
import { webpackDevelopment as WebpackDevelopment } from "./webpackDevelopment";

export interface Controllers {
  ServiceWorkerProxy: Router;
  WebpackDevelopment: Router;
}

export const controllers = {
  ServiceWorkerProxy,
  WebpackDevelopment,
};

export default controllers;
