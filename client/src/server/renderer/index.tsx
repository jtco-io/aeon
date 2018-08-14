import { join, resolve } from "path";
import * as React from "react";
import { renderToStringWithData } from "react-apollo";
import * as ReactDOM from "react-dom/server";
import * as Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import GraphQL from "shared/components/GraphQL";
import Router from "shared/components/Router";
import createStore from "shared/util/createStore";
import Root from "../../Root";

import Html from "./Html";
import { ServerRendererPassedArgs } from "./types";
import WebpackStatsTransformer from "./WebpackStatsTransformer";

declare const modules: any;

export function renderer(serverOptions: ServerRendererPassedArgs): any {
  const { clientStats, config } = serverOptions;

  const context: any = {};

  return async (req: any, res: any, next: any): Promise<any> => {
    const apolloClient = createStore(true);

    const stats = await new WebpackStatsTransformer(config, clientStats);

    let modules: any = [];

    const component = (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <GraphQL client={apolloClient}>
          <Router location={req.url} context={context} isServer>
            <Root />
          </Router>
        </GraphQL>
      </Loadable.Capture>
    );

    // @ts-ignore
    console.log("getBundles", getBundles(clientStats, modules));
    renderToStringWithData(component)
      .then(content => {
        const html = (
          <Html
            content={content}
            assets={stats.assetsByFileType}
            title={config.env.PROJECT_TITLE}
            apolloClient={apolloClient}
          />
        );
        res.status(200);
        res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
        res.end();
      })
      .catch(e => {
        console.error("RENDERING ERROR:", e); // eslint-disable-line no-console
        res.status(500);
        res.end(`An error occurred.:\n\n${e.stack}`);
      });
  };
}

export default renderer;
