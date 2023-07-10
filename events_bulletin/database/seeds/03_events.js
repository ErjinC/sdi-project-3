/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE events CASCADE')
  await knex('events').del()
  await knex('events').insert([
    {organizer_id: 2, name: 'Drinks @ Purple Orchid', details: 'Get together and drink some pitchers to unwind from a hard days work of aquiring space assets', location: 'El Segundo', date: '2023-07-14', time: '19:00:00', genre_id: 3},
    {organizer_id: 1, name: 'Settlers of Catan @ My Place', details: 'Picture this: a merry bunch of adventurers huddled around a vibrant game board resembling a sprawling Catan island. They took turns cunningly negotiating deals, trading sheep for wood, and exchanging their prized wheat for a favor or two. As the game progressed, alliances were formed, and rivalries sparked, but all in the name of good-natured fun.', location: 'Lompoc', date: '2023-07-08', time: '17:30:00', genre_id: 2},
    {organizer_id: 3, name: 'Basketball @ AFA Fitness Center', details: 'Lorem Ipsum', location: 'Colorado Springs', date: '2023-08-02', time: '06:30:00', genre_id: 1},
    {organizer_id: 4, name: 'Basketball @ LAAFB Fitness Center', details: 'Lorem Ipsum', location: 'El Segundo', date: '2023-08-02', time: '08:30:00', genre_id: 1},
  ]);
};
