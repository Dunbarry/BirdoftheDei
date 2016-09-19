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
      // first pane
      firstPostTitle:posts[0].title,
      firstPostContent:posts[0].content,
      firstPostId:posts[0].id,
      // second pane
      secondPostTitle:posts[1].title,
      secondPostContent:posts[1].content,
      secondPostId:posts[1].id,
      // third pane
      thirdPostTitle:posts[2].title,
      thirdPostContent:posts[2].content,
      thirdPostId:posts[2].id,
      // fourth pane
      fourthPostTitle:posts[3].title,
      fourthPostContent:posts[3].content,
      fourthPostId:posts[3].id
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
router.get('/:id/edit', function(req, res, next) {
  console.log("Index");
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

router.put('/post/:id/update', function(req, res){
  console.log("Right here!")
  console.log(postToEdit)
  posts().where('id', postToEdit)
  .update({
    username: req.body.username,
    title: req.body.title,
    content: req.body.content,
  }, 'id', postToEdit)
  .then(function(results){
    console.log(results)
    res.redirect('/post/'+results[0]);
  });
});

router.delete('/:id/del',function(req,res){
  console.log("deleting!")
  posts().remove({
    id: req.params.id,
  })
  .then(function(){
    res.redirect('/')
  })
})

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
