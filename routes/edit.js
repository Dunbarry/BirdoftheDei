var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
postToEdit=0;

function posts() {
  return knex('posts');
}





// This file is unnecessary

module.exports = router;
