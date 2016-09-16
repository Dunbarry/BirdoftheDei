
exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", function (table){
    table.increments('')
    table.text('username')
    table.text('title')
    table.text('content')
    table.timestamp('created_at')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("posts")
};
