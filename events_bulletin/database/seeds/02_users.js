/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE users CASCADE')
  await knex('users').del()
  await knex('users').insert([
    {name: 'Airman Joe Snuffy', username: 'jSnuffMaster', password: '$2b$10$FfKNMXW5Wg84JpIDuWCS5O8PlS80hNewqNmiUbFnhxdvS5b1589oO', email: 'airmanJ@aol.com'},
    {name: 'Airman Janet Snuffy', username: 'jane_snuffy', password: '$2b$10$FfKNMXW5Wg84JpIDuWCS5O8PlS80hNewqNmiUbFnhxdvS5b1589oO', email: 'janeSnuffy@gmail.com'},
    {name: 'Commander Jane Doe', username: 'janeDoe', password: '$2b$10$FfKNMXW5Wg84JpIDuWCS5O8PlS80hNewqNmiUbFnhxdvS5b1589oO', email: 'janeDoe@yahoo.com'},
    {name: 'Capt. John Doe', username: 'captJ', password: '$2b$10$FfKNMXW5Wg84JpIDuWCS5O8PlS80hNewqNmiUbFnhxdvS5b1589oO', email: 'doe.john.2@spaceforce.mil'}
  ]);
};
