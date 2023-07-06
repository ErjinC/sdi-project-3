const express = require('express');
const app = express();
const port = 8081;
const knex = require('knex')(require('./knexfile.js')["development"]);


app.listen(port, () => {
  console.log('Express and Knex running!')
})