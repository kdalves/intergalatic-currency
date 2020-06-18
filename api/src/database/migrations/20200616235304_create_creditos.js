
exports.up = function(knex) {
  return knex.schema.createTable('creditos', function (table) {
    table.increments().primary();
    table.string('nome').notNullable();
    table.string('valor').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('creditos');
};
