const express = require('express');
const cors = require('cors');

const recipeRouter = require('./routes/recipeRouter');
const userRouter = require('./routes/userRouter');

const server = express();

server.use(express.json());
server.use(cors());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  next();
});

server.use('/api/recipes/', recipeRouter);
server.use('/api/users/', userRouter);

server.get('/', (req, res) =>
  res.status(200).json("Welcome to the Don't Eat That app server!")
);

module.exports = server;
