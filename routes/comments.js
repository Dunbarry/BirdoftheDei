var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function comments() {
  return knex('comments');
}

router.post('/', function(req, res){
  console.log("Here.")
  posts().insert({
    username: req.body.username,
    title: req.body.title,
    content: req.body.content,
    timeStamp: new Date().getTime()/1000,
  }, 'id').then(function(results){
    res.redirect('/post/'+results[0]);
  });
});

module.exports = router;
