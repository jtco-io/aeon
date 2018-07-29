import * as Knex from "knex";
import { Model } from "objection";
import { log } from "../lib";
import { Config } from "../config";

export default class Database {
  environment: Config["NODE_ENV"];
  isProd: boolean;
  knexConfig: any;
  initialized: boolean;
  knex: Knex;

  constructor(config: Config, knexConfig) {
    this.environment = config.NODE_ENV;
    this.isProd = config.isProd;
    this.knexConfig = this.getConfig(knexConfig);
    this.initialized = false;
  }

  private log(message) {
    log.logTwoTone("Database:", `                   ${message}`);
  }

  private getConfig(knexConfig) {
    if (this.isProd) {
      knexConfig = knexConfig.production;
    } else if (this.environment === "test") {
      this.log("Using in Memory sqlite from test settings");
      knexConfig = {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: { filename: ":memory:" },
      };
    } else {
      this.log("Using Development Settings");
      knexConfig = knexConfig.development;
    }

    return knexConfig;
  }

  public connect() {
    if (!this.initialized) {
      this.log("Initializing...");
      this.knex = Knex(this.knexConfig);
      Model.knex(this.knex);
      this.log("Connection success");
      this.initialized = true;
    }
  }

  public migrate() {
    if (this.initialized) {
      this.log("Running Latest Migrations...");
      this.knex.migrate.latest().then(() => console.log("Migrations Ran!"));
    }
  }
  public seed() {
    this.knex.migrate.latest();
  }

  public async close() {
    if (this.initialized) {
      this.log("Closing");
      await this.knex.destroy();
      this.initialized = false;
    }
  }
}
