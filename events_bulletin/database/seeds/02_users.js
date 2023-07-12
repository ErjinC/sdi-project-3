/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE users CASCADE')
  await knex('users').del()
  await knex('users').insert([
    {name: 'Airman Joe Snuffy', username: 'jSnuffMaster', password: 'password1234', email: 'airmanJ@aol.com'},
    {name: 'Airman Janet Snuffy', username: 'jane_snuffy', password: 'gkhldkdaks', email: 'janeSnuffy@gmail.com'},
    {name: 'Commander Jane Doe', username: 'janeDoe', password: 'aklynkjhlkjjg', email: 'janeDoe@yahoo.com'},
    {name: 'Capt. John Doe', username: 'captJ', password: 'jakhdaoi184', email: 'doe.john.2@spaceforce.mil'}
  ]);
};
