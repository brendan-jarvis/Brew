/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('settings', (table) => {
    table.boolean('imperial_temperature').defaultTo(false)
    table.boolean('imperial_units').defaultTo(false)
    table.boolean('ounces').defaultTo(false)
    table.boolean('calories').defaultTo(false)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('settings')
}
