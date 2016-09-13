var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function posts() {
  return knex('posts');
}

// "Create"
router.post('/post', function(req, res){
  posts().insert({
    username: req.body.username,
    title: req.body.title,
    content: req.body.content,
    timeStamp: new Date().getTime()/1000,
  }, 'id').then(function(result){
    res.json(result);
  });
});
// "Read"
router.get('/', function(req, res){
  posts().select().then(function(result){
    res.json(result);
  });
});
// "Update"
router.get('/:id', function(req, res){
  posts().where('id', req.params.id).update({
    content: req.body.content
  }).then(function(result){
    res.json(result);
  });
});
// "Delete"
router.delete('/:id', function(req, res){
  posts().where('id', req.params.id).del().then(function(result){
    res.json(result);
  });
});


/* GET post page. */
router.get('/post', function(req, res, next) {
  res.render('post', { title: 'Bird of the Dei' });
});

module.exports = router;
