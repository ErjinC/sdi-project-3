/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE interests CASCADE')
  await knex('interests').del()
  await knex('interests').insert([
    {name: 'Basketball'},
    {name: 'Settlers of Catan'},
    {name: 'Drinks'},
    {name: 'Soccer'},
    {name: 'Risk'},
    {name: 'Swimming'},
    {name: 'Hiking'},
    {name: 'Floating'},
    {name: 'Mountain Biking'},
    {name: 'Ice Cream'},
    {name: 'Food'},
    {name: 'Movies'},
    {name: 'Volunteering'},
    {name: 'Running'},
    {name: 'Bird Watching'},
    {name: 'Painting'},
    {name: 'Reading'},
    {name: 'Fishing'},
    {name: 'Dance'},
    {name: 'Monopoly'},
    {name: 'Board Games'},
    {name: 'Video Games'},
    {name: 'Yoga'},
    {name: 'Paintball'},
    {name: 'Foraging'},
    {name: 'Karaoke'},

  ]);
};
