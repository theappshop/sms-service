import items from './countries'
import { TABLES } from '../connection'

export const seed = async function (knex) {
  if ((await knex(TABLES.COUNTRIES).select('*')).length) {
    return
  }
  await knex(TABLES.COUNTRIES).del()
  for (let i = 0, max = items.length; i < max; i++) {
    await knex(TABLES.COUNTRIES).insert(items[i])
  }
}
