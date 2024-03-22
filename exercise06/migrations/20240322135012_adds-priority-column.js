
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.alterTable('todos', (table) => {
       table.enum('priority', ['normální', 'nízká', 'vysoká']).notNullable().defaultTo('normální');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.alterTable('todos', (table) => {
        table.dropColumn('priority');
    });
};
