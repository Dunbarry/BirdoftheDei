var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function posts() {
  return knex('posts');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bird of the Dei' });
});

/* GET post page. */
router.get('/post', function(req, res, next) {
  res.render('post', { title: 'Bird of the Dei' });
});

/* GET viewPost page. */
router.get('/post/:id', function(req, res, next) {
  posts().first().where('id', req.params.id).then(function(post){
    console.log(post)
    res.render('viewPost', {
      username: post.username,
      title: post.title,
      content: post.content
    })
  });
});

module.exports = router;
