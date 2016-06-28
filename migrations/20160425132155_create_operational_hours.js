
exports.up = function(knex, Promise) {
  return knex.schema.createTable('hours', table=>{
    table.increments(),
    table.integer('venue_id').unsigned().index().references('venues.id').notNullable().onDelete('cascade'),
    table.string('dayOfWeek'),
    table.time('opening'),
    table.time('closing')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hours');
};
