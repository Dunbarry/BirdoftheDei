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

// /* GET viewPost page. */
// router.get('/post/:id', function(req, res, next){
//   postImOn=req.params.id;
//   console.log("Here",postImOn)
//   posts().where('id', req.params.id)
//     .then(function(post){
//       username: post.username
//       title: post.title
//       content: post.content
//     })
//     .then(comments().where('id', req.params.post_id))
//     .then(function(post){
//       commentorUsername: post.username
//       commentorContent: post.content
//       commentorTime: post.created_at
//     })
//     // postImOn=req.params.id;
//     .then(res.render('viewPost'))
//   });

/* GET viewPost page. */
router.get('/post/:id', function(req, res, next){
  postImOn=req.params.id;
  var result={};
  console.log("Here",postImOn)
  posts().where('id', req.params.id)
    .then(function(post){
      post=post[0];
      console.log(post);
      result.username= post.username;
      result.title= post.title;
      result.content= post.content;

      res.render('viewPost', {
        result:result,
        username:result.username,
        title:result.title,
        content:result.content,
        // commentUser:result.commentUser,
        // commentContent:result.commentUser,
        // commentTime:result.commentTime
      })
    })
  // comments().where('post_id', req.params.id)
  //   .then(function(comments){
  //     result.commentUser= comments.username;
  //     result.commentContent= comments.content;
  //     result.commentTime= comments.created_at
  //   })
  // postImOn=req.params.id;
  // res.render('viewPost', {
  //   result:result,
  //   username:result.username,
  //   title:result.title,
  //   content:result.content,
  //   // commentUser:result.commentUser,
  //   // commentContent:result.commentUser,
  //   // commentTime:result.commentTime
  // })
});

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
module.exports = router;
