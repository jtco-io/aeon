import * as Knex from "knex";
import { Model } from "objection";

export function initializeDatabase(isProd): any {
  const knexConfig = require("../../knexfile");
  // Initialize knex.
  let knex: Knex;
  if (isProd) {
    knex = Knex(knexConfig.production);
  } else {
    knex = Knex(knexConfig.development);
    knex.migrate.latest();
  }

  Model.knex(knex);
  return knex;
}
