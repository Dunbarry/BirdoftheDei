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
// "Read"
// router.get('/', function(req, res){
//   posts().select().then(function(result){
//     res.json(result);
//   });
// });
// "Update"
// router.get('/post/:id', function(req, res){
//   posts().where('id', req.params.id).then(function(result){
//     res.json(result);
//   });
// });
// // "Delete"
// router.delete('/post/:id', function(req, res){
//   posts().where('id', req.params.id).del().then(function(result){
//     res.json(result);
//   });
// });

// router.get('/post/:id', function(req, res, next){
//   postImOn=req.params.id;
//   posts().first().where('id', req.params.id)
//     .then(function(post){
//       username: post.username;
//       title: post.title;
//       content: post.content
//     })
//     .then(comments().where('id', req.params.post_id))
//     .then(function(commments){
//       commentorUsername: comments.username;
//       commentorContent: comments.content;
//       commentorTime: comments.created_at
//     })
//     // postImOn=req.params.id;
//     .then(res.render('viewPost'))
//   });

/* GET post page. */
router.get('/post', function(req, res, next) {
  res.render('post', { title: 'Bird of the Dei' });
});

module.exports = router;
