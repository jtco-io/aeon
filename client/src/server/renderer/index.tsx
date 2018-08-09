import { join, resolve } from "path";
import * as React from "react";
import { renderToStringWithData } from "react-apollo";
import * as ReactDOM from "react-dom/server";
import GraphQL from "shared/components/GraphQL";
import Root from "../../Root";
import Router from "shared/components/Router";
import createStore from "shared/util/createStore";

import Html from "./Html";
import { ServerRendererPassedArgs } from "./types";
import WebpackStatsTransformer from "./WebpackStatsTransformer";

export function renderer(serverOptions: ServerRendererPassedArgs): any {
  const { clientStats, config } = serverOptions;
  const context: any = {};

  return async (req: any, res: any, next: any): Promise<any> => {
    const apolloClient = createStore(true);

    const stats = await new WebpackStatsTransformer(config, clientStats);

    const component = (
      <GraphQL client={apolloClient}>
        <Router location={req.url} context={context} isServer>
          <Root />
        </Router>
      </GraphQL>
    );
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
