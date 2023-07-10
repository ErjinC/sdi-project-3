/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE users CASCADE')
  await knex('users').del()
  await knex('users').insert([
    {name: 'Airman Joe Snuffy'},
    {name: 'Airman Janet Snuffy'},
    {name: 'Commander Jane Doe'},
    {name: 'Capt. John Doe'}
  ]);
};
