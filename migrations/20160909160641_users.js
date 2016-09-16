
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table){
    table.increments('')
    table.text('username')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
