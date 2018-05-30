const path = require('path')
const conf = require(path.join(__dirname, '..', 'config', 'env.config'))

const DB_URL = `postgres://${conf.PG_USER}:${conf.PG_PASSWORD}@${conf.PG_HOST}:${conf.PG_PORT}/${conf.PG_DB}`

module.exports = {
  test: {
    client: 'pg',
    connection: `${DB_URL}_test`,
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'seeds', 'test')
    }
  },
  development: {
    client: 'pg',
    connection: `${DB_URL}_dev`,
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection: DB_URL,
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'seeds')
    }
  }
}
