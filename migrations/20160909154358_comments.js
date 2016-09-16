
exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", function(table){
    table.increments('')
    table.text('username')
    table.text('content')
    table.timestamp('created_at')
    table.integer('post_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
