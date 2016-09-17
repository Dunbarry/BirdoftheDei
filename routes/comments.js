var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


function comments() {
  return knex('comments');
}

// function postFinder(){
//   var url1=postImOn.length-3;
//   var url2=postImOn.length-2;
//   console.log(url1+url2);
//   return url1+url2;
// }

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
