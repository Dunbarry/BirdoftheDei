var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
postToEdit=0;

function posts() {
  return knex('posts');
}

router.delete('/:id/del',function(req,res){
  console.log("deleting!")
  posts().remove({
    id: req.params.id,
  })
  .then(function(){
    res.redirect('/')
  })
})

module.exports = router;
