//require('@babel/register')({
//  presets: [
//    ["@babel/preset-env", {
//      "targets": {
//        "node": "current",
//        "esmodules": true
//      }
//    }]
//  ]
//});
////require('babel-polyfill');
//const settings = require('./src/config/db.ts')
//
//const base = {
//  client: settings.db.client,
//  seeds: {
//    directory: '../database/seeds'
//  },
//  migrations: {
//    directory: '../database/migrations'
//  },
//  useNullAsDefault: true
//}
//
//const development = {
//  ...base,
//  connection: settings.db.connection.development,
//  pool: settings.db.pool,
//
//};
//
//const production = {
//  ...base,
//  client: settings.db.client,
//  connection: settings.db.connection.production,
//  pool: settings.db.pool
//};
//
//const test = {
//  client: 'sqlite3',
//  connection: {
//    filename: ':memory:'
//  }
//};


module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/seeds'
    }
  }
};
