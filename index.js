const express = require('express');
const knex = require('knex');
const cors = require('cors');

const server = express();

server.use(cors());

server.get('/', (req,res) => res.send('Welcome to the Don\'t Eat That app server!'))

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`=====Server running on ${port}=====`))