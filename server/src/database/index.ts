import * as Knex from "knex";

export function initializeDatabase(isProd): any {
  const knexConfig = require("../../knexfile");
  // Initialize knex.
  let knex: Knex;
  if (isProd) {
    knex = Knex(knexConfig.production);
  } else {
    knex = Knex(knexConfig.development);
  }

  knex.migrate.latest();
  return knex;
}
