import * as Knex from "knex";
import { Model } from "objection";
import { log } from "../lib";

export async function initializeDatabase(isProd = false): Promise<any> {
  log.logTwoTone("Begin:", "                      Database Initialization");
  const knexConfig = await require("../../knexfile");
  // Initialize knex.
  let knex: Knex;
  if (isProd) {
    knex = await Knex(knexConfig.production);
  } else {
    knex = await Knex(knexConfig.development);
    await knex.migrate.latest();
  }

  // Bind all Models to a knex instance. If you only have one database in
  // your server this is all you have to do. For multi database systems, see
  // the Model.bindKnex method.
  await Model.knex(knex);
  return await knex;
}

export const knex = initializeDatabase();
