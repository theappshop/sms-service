import knex from 'knex'
import config from './knexfile.js'
import { NODE_ENV } from '../config/env.config'

export const TABLES = {
  COUNTRIES: 'countries',
  NUMBERS: 'numbers',
  MESSAGES: 'messages'
}

export default knex(config[NODE_ENV])
