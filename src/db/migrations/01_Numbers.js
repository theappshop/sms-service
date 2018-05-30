import { TABLES } from '../connection'

export const up = (knex, Promise) => {
  return knex.schema.createTable(TABLES.NUMBERS, (table) => {
    table.increments()
    table.string('number', 16).notNullable().unique()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export const down = (knex, Promise) => {
  return knex.schema.dropTable(TABLES.NUMBERS)
}
