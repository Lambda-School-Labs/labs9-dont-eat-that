const knex = require('knex');
const dbEnvironment = 'development';
const config = require('../knexfile.js')[dbEnvironment];

module.exports = knex(config);
