import { TABLES } from '../connection'


export const up = (knex, Promise) => {
  return knex.schema.createTable(TABLES.COUNTRIES, (table) => {
    table.increments()
    table.string('name', 64).notNullable().unique()
    table.string('alpha_2', 2).notNullable().unique()
    table.string('alpha_3', 3).notNullable().unique()
    table.string('code', 12).notNullable().unique()
    table.string('region', 32).notNullable()
    table.string('dial', 12).notNullable()
    table.string('emoji', 12).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export const down = (knex, Promise) => {
  return knex.schema.dropTable(TABLES.COUNTRIES)
}
