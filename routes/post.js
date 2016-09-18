var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function posts() {
  return knex('posts');
}

// "Create"
router.post('/', function(req, res){
  console.log("There.")
  posts().insert({
    username: req.body.username,
    title: req.body.title,
    content: req.body.content,
  }, 'id').then(function(results){
    res.redirect('/post/'+results[0]);
  });
});

router.all('/post/:id/update', function(req, res, next){
  console.log("Right here!")
  console.log(postToEdit)
  posts().where('id', postToEdit)
  next().update({
    username: req.body.username,
    title: req.body.title,
    content: req.body.content,
  }, 'id', postToEdit)
  .then(function(results){
    console.log(results)
    res.redirect('/post/'+results[0]);
  });
});

/* GET post page. */
router.get('/post', function(req, res, next) {
  res.render('post', { title: 'Bird of the Dei' });
});

module.exports = router;
