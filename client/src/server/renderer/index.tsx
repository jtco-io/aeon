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
  const { clientStats, config, rlStats } = serverOptions;
  const context: any = {};

  return async (req: any, res: any, next: any): Promise<any> => {
    const apolloClient = createStore(true);

    const stats = await new WebpackStatsTransformer(config, clientStats);
    // console.log('RENDER', stats)
    let modules: any = [];

    let component = await renderToStringWithData(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <GraphQL client={apolloClient}>
          <Router location={req.url} context={context} isServer>
            <Root />
          </Router>
        </GraphQL>
      </Loadable.Capture>,
    );

    // @ts-ignore
    let bundles = await getBundles(rlStats, modules);
    console.log("getBundles", bundles);

    const html = (
      <Html
        content={component}
        assets={stats.assetsByFileType}
        title={config.env.PROJECT_TITLE}
        apolloClient={apolloClient}
      />
    );
    res.status(200);
    res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
    res.end();
  };
}

export default renderer;
