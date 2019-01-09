const express = require('express');
const knex = require('knex');
const cors = require('cors');

const recipeRouter = require('./routes/recipeRouter');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/recipes/', recipeRouter);

server.get('/', (req, res) =>
  res.send("Welcome to the Don't Eat That app server!")
);

module.exports = server;
