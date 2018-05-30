import knex, { TABLES as T } from '../connection'

async function getIdByNumber (number) {
  let res = await knex(T.NUMBERS)
    .select('*')
    .where({ number })
  if (!res || !res[0] || !res[0].id) {
    res = await add(number)
  }
  return res[0].id
}

async function add (number) {
  return knex(T.NUMBERS)
    .insert({ number })
    .returning('*')
}

export default {
  getIdByNumber,
  add
}
