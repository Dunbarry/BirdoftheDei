
exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", function(table){
    table.increments('')
    table.text('author')
    table.text('content')
    table.text('timeStamp')
    table.text('postId')
  })
};

exports.down = function(knex, Promise) {

};
