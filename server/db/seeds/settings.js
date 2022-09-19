/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('settings').del()
  await knex('settings').insert([
    {
      imperial_temperature: false,
      imperial_units: true,
      ounces: false,
      calories: true,
    },
  ])
}
