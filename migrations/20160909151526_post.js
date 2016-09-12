
exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", function (table){
    table.increments();
    table.text('title')    table.text('content')
    table.text('timeStamp')
    table.text('userId')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("posts")
};
