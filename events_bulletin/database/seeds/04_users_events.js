/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE users_events CASCADE')
  await knex('users_events').del()
  await knex('users_events').insert([
    {user_id: 1, event_id: 2},
    {user_id: 1, event_id: 3},
    {user_id: 2, event_id: 1},
    {user_id: 2, event_id: 2},
    {user_id: 3, event_id: 1},
    {user_id: 3, event_id: 3},
    {user_id: 4, event_id: 2},
    {user_id: 4, event_id: 3},
    {user_id: 4, event_id: 4},
    {user_id: 1, event_id: 4},
  ]);
};
