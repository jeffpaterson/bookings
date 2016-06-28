
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reservations', t=>{
    t.increments(),
    t.integer('table_id').unsigned().index().references('tables.id').notNullable(),
    t.date('date');
    t.integer('user_id').unsigned().index().references('users.id').notNullable().onDelete('cascade'),
    t.integer('pledge')
    t.integer('seats')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reservations')
};
