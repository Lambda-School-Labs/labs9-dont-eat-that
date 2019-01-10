exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'McKay',
          password: 'test',
          firebaseid: '1234',
          email: 'dummy@mckaybonham.com'
        },
        {
          username: 'Peter',
          password: 'test',
          firebaseid: '1235',
          email: 'dummy@peterpham.com'
        },
        {
          username: 'Vance',
          password: 'test',
          firebaseid: '1236',
          email: 'dummy@vanceleon.com'
        },
        {
          username: 'Edward',
          password: 'test',
          firebaseid: '1237',
          email: 'dummy@edwardjeong.com'
        }
      ]);
    });
};
