const express = require('express');
const cors = require('cors');

const recipeRouter = require('./routes/recipeRouter');
const userRouter = require('./routes/userRouter');
const paymentRouter = require('./routes/paymentRouter');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api/recipes/', recipeRouter);
server.use('/api/users/', userRouter);
server.use('/api/payments/', paymentRouter);

server.get('/', (req, res) =>
  res.status(200).json("Welcome to the Don't Eat That app server!")
);

module.exports = server;
