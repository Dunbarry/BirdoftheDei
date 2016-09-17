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
  posts().then(function(posts){
    res.render('index', {
      title: 'Bird of the Dei',
      posts:posts,
      firstPostTitle:posts[0].title,
      firstPostContent:posts[0].content,
      firstPostId:posts[0].id,
      secondPostTitle:posts[1].title,
      secondPostContent:posts[1].content,
      secondPostId:posts[1].id
    });
  });
});

/* GET post page. */
router.get('/post', function(req, res, next) {
  res.render('post', { title: 'Bird of the Dei' });
});

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
  });
  comments().where('post_id',req.params.id)
  .then(function(commentArray){
    result.commentary=commentArray;
    res.render('viewPost', {
      result:result,
      username:result.username,
      title:result.title,
      content:result.content,
      comments:result.commentary
    });
  });
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
