import * as Knex from "knex";
import { Model } from "objection";
import { log } from "../lib";
import {Config} from "../config";

export async function initializeDatabase(isProd = false):Promise<any> {
  log.logTwoTone ("Begin:", "                      Database Initialization");
  const knexConfig = await require ("../../knexfile");
  // Initialize knex.
  let knex:Knex;
  if (isProd) {
    knex = await Knex (knexConfig.production);
  } else {
    knex = await Knex (knexConfig.development);
    await knex.migrate.latest ();
  }

  // Bind all Models to a knex instance. If you only have one database in
  // your server this is all you have to do. For multi database systems, see
  // the Model.bindKnex method.
  await Model.knex (knex);
  return await knex;
}

//export const knex = initializeDatabase ();

export default class Database {
  environment:Config[
  "NODE_ENV"
]
  isProd:boolean
  knexConfig:any
  initialized:boolean
  knex:Knex
  model:any

  constructor(config:Config, knexConfig) {
    this.environment = config.NODE_ENV
    this.isProd = config.isProd
    this.knexConfig = this.getConfig (knexConfig)
    this.initialized = false
  }

  getConfig(knexConfig) {
    if (this.isProd) {
      knexConfig = knexConfig.production
    } else if (this.environment === 'test') {
      log.logTwoTone ("Database:", "                   Using in Memory sqlite from test settings ");
      knexConfig = {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {filename: ':memory:'}
      }
    } else {
      log.logTwoTone ("Database:", "                   Using Development Settings ");
      knexConfig = knexConfig.development

    }

    return knexConfig
  }

  connect() {
    if (!this.initialized) {
      log.logTwoTone ("Database:", "                   Initializing...");
      this.knex = Knex (this.knexConfig);
      this.model = Model.knex (this.knex);
      log.logTwoTone ("Database:", "                   Connection success!");
      this.initialized = true
    }
  }

  close() {
    if (this.initialized) {
      log.logTwoTone ("Database:", "                      Closing");
      this.model.knex.destroy ()
      //this.knex.destroy ()
      this.initialized = false
    }
  }
}
