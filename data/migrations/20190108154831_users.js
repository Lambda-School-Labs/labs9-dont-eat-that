exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id');
    tbl
      .string('firebaseid')
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
