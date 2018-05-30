import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Redis from 'ioredis'
import Twilio from 'twilio'
import router from './services/api/routes'
import exceptionHandler from './utils/exceptionHandler'
import {
  PORT,
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  TW_TOKEN,
  TW_SID
} from './config/env.config'

const app = new Koa()
const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  family: 4,
  password: REDIS_PASSWORD,
  db: 0
})

const twilio = new Twilio(TW_SID, TW_TOKEN)

app
  .use((ctx, next) => {
    ctx['redis'] = redis
    ctx['twilio'] = twilio
    return next()
  })
  .use(bodyParser())
  .use(exceptionHandler)
  .use(router.routes())

export default app.listen(PORT, () => {
  console.log(`HTTP Server listening on port: ${PORT}`)
  console.log(`Environment: ${NODE_ENV}`)
})
