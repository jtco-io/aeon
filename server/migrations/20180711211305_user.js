exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary().unique();
      table.string('username').notNullable().unique();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps()
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw("DROP TABLE users CASCADE")
  ])
};
