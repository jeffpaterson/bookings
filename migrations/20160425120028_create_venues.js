
exports.up = function(knex, Promise) {
  return knex.schema.createTable('venues', table=>{
    table.increments(),
    table.text('name'),
    table.text('street_address'),
    table.text('city'),
    table.integer('zipcode'),
    table.text('pic1'),
    table.text('pic2'),
    table.text('music'),
    table.text('clientele'),
    table.text('tableMapPic'),
    table.text('description'),
    table.integer('reviews'),
    table.text('stars')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('venues')
};
