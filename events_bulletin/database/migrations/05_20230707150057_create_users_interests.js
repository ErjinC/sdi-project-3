/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users_interests', table => {
        table.increments('id')
        table.integer('user_id')
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.integer('interest_id')
        table.foreign('interest_id').references('interests.id').onDelete('cascade');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('users_interests', table => {
        table.dropForeign('user_id')
    })
    .then(() => {
        return knex.schema.alterTable('users_interests', table => {
            table.dropForeign('interest_id')
        })
    })
    .then(() => {
        return knex.schema.dropTableIfExists('users_interests')
    })
};
