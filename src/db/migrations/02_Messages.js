import { TABLES } from '../connection'

export const up = (knex, Promise) => {
  return knex.schema.createTable(TABLES.MESSAGES, (table) => {
    table.increments()
    table.integer('to').references(`${TABLES.NUMBERS}.id`).notNullable()
    table.integer('from').references(`${TABLES.NUMBERS}.id`).notNullable()
    table.string('status', 64).notNullable()
    table.string('body', 256).notNullable()
    table.string('sid')
    table.string('price', 64)
    table.string('price_unit', 64)
    table.string('messaging_service_sid', 64)
    table.string('error_code', 64)
    table.string('error_message', 64)
    table.timestamp('sent_at', 64)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export const down = (knex, Promise) => {
  return knex.schema.dropTable(TABLES.MESSAGES)
}
