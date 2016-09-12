
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table){
    table.increments();
    table.integer('userId')
    table.text('')
  })
};

exports.down = function(knex, Promise) {

};
