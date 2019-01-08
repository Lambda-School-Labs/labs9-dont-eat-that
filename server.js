const express = require('express');
const knex = require('knex');
const cors = require('cors');

const server = express();

server.use(cors());

server.get('/', (req,res) => res.send('Welcome to the Don\'t Eat That app server!'));

module.exports = server;