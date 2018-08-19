import * as React from "react";
import * as ReactDOM from "react-dom/server";
import Router from "shared/components/Router";
import Root from "../../Root";
import Navbar from "../../shared/components/Navbar";
import Html from "./Html";
import { ServerRendererPassedArgs } from "./types";
import WebpackStatsTransformer from "./WebpackStatsTransformer";

export function renderer(serverOptions: ServerRendererPassedArgs): any {
  return async (req: any, res: any, next: any): Promise<any> => {
    const context: any = {};
    const { clientStats, config } = serverOptions;

    const stats = await new WebpackStatsTransformer(config, clientStats);
    await stats.initialize();

    const content = ReactDOM.renderToString(
      <Router location={req.url} context={context} isServer>
        <Root />
      </Router>,
    );

    const htmlComp = (
      <Html
        content={content}
        assets={stats.assetsByFileType}
        title={config.env.PROJECT_TITLE}
        initialState={{}}
      />
    );
    res.status(200);
    res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(htmlComp)}`);
    res.end();
  };
}

export default renderer;
