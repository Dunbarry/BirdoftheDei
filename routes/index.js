var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var postImOn=0;

function posts() {
  return knex('posts');
}

function comments() {
  return knex('comments');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bird of the Dei' });
});

/* GET post page. */
router.get('/post', function(req, res, next) {
  res.render('post', { title: 'Bird of the Dei' });
});

// router.get('/comments/:commentId', function(req, res, next) {
//   posts().first().where('commentId', req.params.id).then(function(post){
//     console.log(post)
//     res.render('viewPost', {
//       username: post.username,
//       title: post.title,
//       content: post.content
//     })
//   });
// });

/* GET viewPost page. */
router.get('/post/:id', function(req, res, next) {
  posts().first().where('id', req.params.id).then(function(post){
    postImOn=req.params.id;
    res.render('viewPost', {
      username: post.username,
      title: post.title,
      content: post.content
    })
  });
});

router.post('/comments', function(req, res){
  console.log("Here.")
  comments().insert({
    username: req.body.username,
    content: req.body.content,
    timeStamp: new Date().getTime()/1000,
    postId: postImOn
  }, 'postId', postImOn).then(function(results){
    res.redirect('/post/'+results[0]);
  });
});
module.exports = router;
