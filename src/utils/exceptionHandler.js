import { Exception } from './Exception.class'
import logger from '../config/winston'

export default async (ctx, next) => {
  try {
    return await next()
  } catch (err) {
    logger.error(err.message)
    if (err instanceof Exception) {
      ctx.body = err.toObject()
      ctx.status = err.statusCode
    } else {
      ctx.body = { message: 'Unexpected error' }
      ctx.status = 500
    }
  }
}
