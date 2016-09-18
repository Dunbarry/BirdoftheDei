var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


function comments() {
  return knex('comments');
}

router.post('/comments', function(req, res){
  console.log("Here.")
  comments().insert({
    username: req.body.username,
    content: req.body.content,
    post_id: postImOn
  }, 'post_id', postImOn).then(function(results){
    res.redirect('/post/'+results[0]);
  });
});

router.get('/comments/:commentId', function(req, res, next) {
  posts().first().where('commentId', req.params.id).then(function(post){
    console.log(post)
    res.render('viewPost', {
      username: post.username,
      title: post.title,
      content: post.content
    })
  });
});

module.exports = router;
