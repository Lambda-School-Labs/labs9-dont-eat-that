
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'McKay', password: 'test', email: 'dummy@mckaybonham.com'},
        {username: 'Peter', password: 'test', email: 'dummy@peterpham.com'},
        {username: 'Vance', password: 'test', email: 'dummy@vanceleon.com'},
        {username: 'Edward', password: 'test', email: 'dummy@edwardjeong.com'}
      ]);
    });
};
