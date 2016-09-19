var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
postToEdit=0;

function posts() {
  return knex('posts');
}

/* GET edit post page. */
router.get('/:id/edit', function(req, res, next) {
  posts().first().where('id', req.params.id)
  .then(function(post){
    console.log(post)
    res.render('editPost', {
      title: 'Bird of the Dei',
      post:post,
      title:post.title,
      user:post.username,
      content:post.content,
      id: post.id
    });
  });
});

// router.put('/post/:id/update', function(req, res){
//   console.log("Right here!")
//   console.log(postToEdit)
//   posts().where('id', postToEdit)
//   .update({
//     username: req.body.username,
//     title: req.body.title,
//     content: req.body.content,
//   }, 'id', postToEdit)
//   .then(function(results){
//     console.log(results)
//     res.redirect('/post/'+results[0]);
//   });
// });

module.exports = router;
