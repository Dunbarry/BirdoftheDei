var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function comments() {
  return knex('comments');
}

module.exports = router;
