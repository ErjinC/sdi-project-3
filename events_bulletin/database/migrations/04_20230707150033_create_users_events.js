/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users_events', table => {
        table.increments('id')
        table.integer('user_id')
        table.foreign('user_id').references('users.id')
        table.integer('event_id')
        table.foreign('event_id').references('events.id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('users_events', table => {
        table.dropForeign('user_id')
    })
    .then(() => {
        return knex.schema.alterTable('users_events', table => {
            table.dropForeign('event_id')
        })
    })
    .then(() => {
        return knex.schema.dropTableIfExists('users_events')
    })
};
