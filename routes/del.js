var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
postToEdit=0;

function posts() {
  return knex('posts');
}

router.post('post/:id/del',function(req,res, next){
  posts().where('id', req.params.id).del()
  .then(function(){
    console.log("del deleting!")
    res.redirect('/')
  })
})

module.exports = router;
