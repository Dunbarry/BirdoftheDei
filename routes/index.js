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
  posts().where('id', req.params.id).then(function(result){
    res.render('viewPost', {
      username: req.body.username,
      title: req.body.title,
      content: req.body.content
    })
  });
});

module.exports = router;
