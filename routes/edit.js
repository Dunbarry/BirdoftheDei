var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function posts() {
  return knex('posts');
}

/* GET edit post page. */
router.get('/:id/edit', function(req, res, next) {
  posts().first().where('id', req.params.id)
  .then(function(post){
    res.render('editPost', {
      title: 'Bird of the Dei',
      post:post,
      title:post.title,
      user:post.username,
      content:post.content,
    });
  });
});

router.post('/edit', function(req, res){
  console.log("Right here!")
  comments().insert({
    username: req.body.username,
    content: req.body.content,
    post_id: postImOn
  }, 'post_id', postImOn).then(function(results){
    res.redirect('/post/'+results[0]);
  });
});

module.exports = router;
