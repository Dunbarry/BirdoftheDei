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
  posts().orderBy('id', 'desc').limit(4)
  .then(function(posts){
    res.render('index', {
      posts:posts,
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
  posts().where('id', req.params.id)
  .then(function(post){
    post=post[0];
    console.log(post);
    result.id=post.id;
    result.username= post.username;
    result.title= post.title;
    result.content= post.content;
  });
  comments().where('post_id',req.params.id)
  .then(function(commentArray){
    result.commentary=commentArray;
    res.render('viewPost', {
      result:result,
      id:result.id,
      username:result.username,
      title:result.title,
      content:result.content,
      comments:result.commentary
    });
  });
});

/* GET edit post page. */
router.get('/post/:id/edit', function(req, res, next) {
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

router.post('/post/:id/update', function(req, res, next){
  console.log("Right here!")
  posts().where('id', req.params.id)
  .update({
    content: req.body.content,
  })
  .then(function(){
    res.redirect('/post/'+req.params.id);
  });
});

router.post('/post/:id/del',function(req,res, next){
  posts().where('id', req.params.id).del()
  .then(function(){
    console.log("Index deleting!")
    res.redirect('/')
  })
})


module.exports = router;
