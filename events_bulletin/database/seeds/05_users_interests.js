/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE users_interests CASCADE')
  await knex('users_interests').del()
  await knex('users_interests').insert([
    {user_id: 1, interest_id: 20},
    {user_id: 1, interest_id: 12},
    {user_id: 1, interest_id: 2},
    {user_id: 1, interest_id: 7},
    {user_id: 2, interest_id: 8},
    {user_id: 2, interest_id: 25},
    {user_id: 2, interest_id: 4},
    {user_id: 2, interest_id: 6},
    {user_id: 3, interest_id: 23},
    {user_id: 3, interest_id: 13},
    {user_id: 3, interest_id: 10},
    {user_id: 3, interest_id: 4},
    {user_id: 4, interest_id: 2},
    {user_id: 4, interest_id: 25},
    {user_id: 4, interest_id: 16},
    {user_id: 4, interest_id: 8}
  ]);
};
