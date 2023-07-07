/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE users CASCADE')
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'Airman Joe Snuffy'},
    {id: 2, name: 'Airman Janet Snuffy'},
    {id: 3, name: 'Commander Jane Doe'},
    {id: 4, name: 'Capt. John Doe'}
  ]);
};
