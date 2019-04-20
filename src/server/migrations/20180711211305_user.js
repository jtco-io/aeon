exports.up = function (knex, Promise) {
  return Promise.all( [
    knex.schema
      .createTable( 'users', table => {
        table.increments( 'id' ).primary();
        table
          .integer( 'parentId' )
          .unsigned()
          .references( 'id' )
          .inTable( 'persons' )
          .onDelete( 'SET NULL' );
        table.string( 'email' );
        table.string( 'username' );
        table.string( 'firstName' );
        table.string( 'lastName' );
        table.integer( 'age' );
        table.json( 'address' );
        table.bigInteger( 'createdAt' ).notNullable();
        table.bigInteger( 'updatedAt' ).notNullable();
      } )
  ] )
};

exports.down = function (knex, Promise) {
  return Promise.all( [
    knex.schema.raw( "DROP TABLE users CASCADE" )
  ] )
};
