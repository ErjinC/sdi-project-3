/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('events', table => {
        table.increments('id')
        table.integer('organizer_id')
        table.foreign('organizer_id').references('users.id')
        table.string('name')
        table.text('details')
        table.string('location')
        table.date('date')
        table.time('time')
        table.integer('genre_id')
        table.foreign('genre_id').references('interests.id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('events', table => {
        table.dropForeign('organizer_id')
    })
    .then(() => {
        return knex.schema.alterTable('events', table => {
            table.dropForeign('genre_id')
        })
    })
    .then(() => {
        return knex.schema.dropTableIfExists('events')
    })
};
